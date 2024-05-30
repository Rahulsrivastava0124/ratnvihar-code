const config = require("@config/auth.config");
const { errorCodes, formatErrorResponse, formatResponse } = require("@utils/response.config");
const db = require("@models");
const moment = require('moment');
const { isEmpty, getDateFromToWhere, priceFormat, formatDateTime, weightFormat, addLog, convertUnitToGram } = require("@helpers/helper");
const { updateOrCreate, removeMaterialFromStock, getWalletBalance, getWorkingUserID, isSuperAdmin, isAdmin, getSuperAdminId, isDistributor, updateWalletRemainingBalance, sendNotification, updateStockRawMaterialOutStanding, isManager, updateAdvanceAmount, getPurchaseProducts } = require("@library/common");
const { getPaginationOptions } = require('@helpers/paginator')
const { PurchaseListCollection } = require("@resources/superadmin/PurchaseListCollection");
const { PurchaseEditCollection } = require("@resources/superadmin/PurchaseEditCollection");
const { PurchaseViewCollection } = require("@resources/superadmin/PurchaseViewCollection");
const { Op } = require("sequelize");
const { isSalesExecutive } = require("../../library/common");
const sequelize = db.sequelize;
const ProductModel = db.products;
const UserModel = db.users;
const ProductSizeModel = db.product_sizes;
const PurityModel = db.purities;
const UnitModel = db.units;
const CategoryModel = db.categories;
const SubCategoryModel = db.sub_categories;
const CertificateModel = db.certificates;
const MaterialModel = db.materials;
const SizeModel = db.sizes;
const StockModel = db.stocks;
const StockMaterialModel = db.stock_materials;
const PurchaseModel = db.purchases;
const PurchaseProductModel = db.purchase_products;
const PurchaseProductMaterialModel = db.purchase_product_materials;
const stockHistoryModel = db.stock_raw_material_histories;
const paymentModel = db.payments;
const ReturnModel = db.returns;
const ReturnProductModel = db.return_products;
const ReturnProductMaterialModel = db.return_product_materials;
const SaleModel = db.sales;
const SaleProductModel = db.sale_products;
const SaleProductMaterialModel = db.sale_product_materials;
const NoticationModel = db.notifiactions;
const cartsModel = db.carts;
const cartMaterialsModel = db.cart_materials;
const _ = require("lodash");

/**
 * Retrieve all purchase
 * 
 * @param req
 * @param res
 */
exports.index = async (req, res) => {
  let { page, limit, supplier_id, load_payments, search, date_from, date_to, status, is_assigned, is_approval, all_purchase } = req.query;
  is_assigned = is_assigned === undefined ? false : true;
  is_approval = is_approval === undefined ? false : true;
  let userID = isManager(req) ? req.userId : await getWorkingUserID(req);
  let conditions = { type: { [Op.ne]: 'order_purchase' } };
  if (all_purchase == 1) {
    conditions = { is_approved: { [Op.ne]: 2 }, is_assigned: false, is_approval: false, sale_id: { [Op.is]: null } }
  } else {
    conditions = { user_id: userID, is_assigned: is_assigned, is_approval: is_approval };
  }

  if (status !== undefined && status != "") {
    conditions.is_approved = status;
  }
  if (!isEmpty(supplier_id)) {
    conditions.supplier_id = supplier_id;
  }
  if (!isEmpty(search)) {
    conditions.invoice_number = { [Op.like]: `%${search}%` };
  }
  conditions = { ...conditions, ...getDateFromToWhere(date_from, date_to, 'invoice_date') }

  const paginatorOptions = getPaginationOptions(page, limit);
  PurchaseModel.findAndCountAll({
    order: [['id', 'DESC']],
    offset: paginatorOptions.offset,
    limit: paginatorOptions.limit,
    where: conditions,
    include: [
      {
        model: UserModel,
        as: 'supplier',
      }
    ],
    distinct: true
  }).then(async (data) => {
    let result = {
      items: await PurchaseListCollection(data.rows, load_payments),
      total: data.count,
    }
    res.send(formatResponse(result, 'Purchase List'));
  })
    .catch(err => {
      res.status(errorCodes.default).send(formatErrorResponse(err));
    });
};



/**
 * Store purchase
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.store = async (req, res) => {
  let data = req.body;

  if (!isEmpty(data.invoice_number)) {
    let purchaseData = await PurchaseModel.findOne({ where: { invoice_number: data.invoice_number } });
    if (purchaseData) {
      return res.status(errorCodes.default).send(formatErrorResponse('Invoice number is exists.'));
    }
  }

  let userID = isManager(req) ? req.userId : await getWorkingUserID(req);
  if (priceFormat(data.paid_amount) > 0) {
    let wallet_balance = await getWalletBalance(userID, data.payment_mode);
    if (priceFormat(data.paid_amount) > wallet_balance) {
      return res.status(errorCodes.default).send(formatErrorResponse('Insufficient wallet balance.'));
    }
  }

  try {
    //const trans = await sequelize.transaction(async (t) => {

    //insert into purchase table
    let invoice_number = data.invoice_number || null;
    let req_data = data; //JSON.stringify(data);
    //req_data = new Buffer.from(req_data).toString("base64");
    let status = "due", paid_amount = 0, due_amount = 0;
    if (data.payment_mode != "cheque") {
      status = (priceFormat(data.paid_amount) >= priceFormat(data.total_payable)) ? 'paid' : 'due';
      paid_amount = data.paid_amount ? priceFormat(data.paid_amount) : 0;
      due_amount = priceFormat(data.due_amount);
    } else {
      due_amount = priceFormat(data.total_payable);
    }

    if (data.pay_from_advance) {
      if (parseFloat(data.total_payable) >= parseFloat(data.advance_amount)) {
        paid_amount = priceFormat(paid_amount + parseFloat(data.advance_amount));
      } else {
        paid_amount = parseFloat(data.total_payable);
      }
    }

    let purchaseObj = {
      supplier_id: data.supplier_id,
      user_id: userID,
      invoice_number: invoice_number,
      invoice_date: moment(data.invoice_date, "MM/DD/YYYY").format('YYYY-MM-DD'),
      notes: data.notes,
      payment_mode: data.payment_mode,
      transaction_no: data.transaction_no,
      total_amount: priceFormat(data.total_amount),
      tax: priceFormat(data.tax),
      discount: priceFormat(data.discount),
      paid_amount: paid_amount,
      taxable_amount: priceFormat(data.taxable_amount),
      bill_amount: priceFormat(data.total_payable),
      total_payable: priceFormat(data.total_payable),
      due_amount: due_amount,
      due_date: moment(data.due_date).format('YYYY-MM-DD'),
      status: status,
      is_approved: data.on_approval ? 3 : 0,
      is_approval: data.on_approval,
      type: data.type,
      return_id: !isEmpty(data.return_sale_id) ? data.return_sale_id : null
      //req_data: req_data
    };
    let purchase = await PurchaseModel.create(purchaseObj);

    //insert into purchase product table
    for (let i = 0; i < data.products.length; i++) {
      let thisItem = data.products[i];
      let worker_id = thisItem.worker_id || null;
      let thisObj = {
        purchase_id: purchase.id,
        product_id: thisItem.product_id || null,
        worker_id: worker_id,
        size_id: thisItem.size_id || null,
        certificate_no: thisItem.certificate_no,
        total_weight: weightFormat(thisItem.total_weight),
        sub_price: priceFormat(thisItem.sub_price),
        making_charge: priceFormat(thisItem.making_charge),
        rep: priceFormat(thisItem.rep),
        tax: priceFormat(thisItem.tax),
        total: priceFormat(thisItem.total),
      }
      let purchaseProduct = await PurchaseProductModel.create(thisObj);
      req_data.products[i].id = purchaseProduct.id;

      /**
       * START - add to super admin stock
       */
      /*let product = await ProductModel.findByPk(thisItem.product_id);
      let stock = null;
      if(product.type == "material"){
        let quantity = 0;
        for(let x = 0; x < thisItem.materials.length; x++){
          quantity += thisItem.materials[x].quantity ? parseInt(thisItem.materials[x].quantity) : 0;
        }
        let result = await updateOrCreate(StockModel, {
          product_id: thisItem.product_id, 
          user_id: {[Op.is]: null}
        }, {
          product_id: thisItem.product_id, 
          quantity: quantity,
          total_weight: thisItem.total_weight
        }, t, ['quantity', 'total_weight']);
        stock = result.item;
      }else{
        stock = await StockModel.create({
          purchase_id: purchase.id,
          product_id: thisItem.product_id,
          size_id: thisItem.size_id || null,
          certificate_no: thisItem.certificate_no,
          quantity: 1,
          total_weight: thisItem.total_weight
        }, { transaction: t });
      }*/

      //insert into purchase product materials
      let batch_id = null;
      for (let x = 0; x < thisItem.materials.length; x++) {
        let thisMObj = {
          purchase_id: purchase.id,
          purchase_product_id: purchaseProduct.id,
          material_id: thisItem.materials[x].material_id,
          weight: weightFormat(thisItem.materials[x].weight),
          quantity: thisItem.materials[x].quantity || 0,
          purity_id: thisItem.materials[x].purity_id,
          unit_id: thisItem.materials[x].unit_id,
          rate: thisItem.materials[x].rate,
          amount: thisItem.materials[x].amount
        }
        await PurchaseProductMaterialModel.create(thisMObj);

        if (!isEmpty(worker_id)) {
          let stockH = await stockHistoryModel.create({
            from_user_id: worker_id,
            to_user_id: req.userId,
            material_id: thisItem.materials[x].material_id,
            weight: weightFormat(thisItem.materials[x].weight),
            unit_id: thisItem.materials[x].unit_id,
            quantity: thisItem.materials[x].quantity,
            date: moment().format('YYYY-MM-DD'),
            type: 'debit',
            batch_id: batch_id,
            purchase_id: purchase.id
          });
          if (batch_id == null) {
            batch_id = stockH.id;
            await stockHistoryModel.update({
              batch_id: batch_id
            }, { where: { id: stockH.id } });
          }

          await updateStockRawMaterialOutStanding(stockH.id, {
            user_id: worker_id,
            material_id: thisItem.materials[x].material_id,
            weight: thisItem.materials[x].weight,
            unit_id: thisItem.materials[x].unit_id,
            quantity: thisItem.materials[x].quantity
          }, "debit");
        }

        /**
         * add to stock materials
         */
        /*if(product.type == "material"){
          let stockMaterial = await StockMaterialModel.findOne({where: {stock_id: stock.id, material_id: thisItem.materials[x].material_id}});
          if(stockMaterial){
            await StockMaterialModel.update({
              weight: weightFormat(stockMaterial.weight + weightFormat(thisItem.materials[x].weight)),
              weight_in_gram: weightFormat(stockMaterial.weight_in_gram + weightFormat(thisItem.materials[x].weight_in_gram)),
              quantity: (stockMaterial.quantity + thisItem.materials[x].quantity),
              purity_id: thisItem.materials[x].purity_id,
              unit_id: thisItem.materials[x].unit_id,
              category_id: product.category_id
            },{where: {id: stockMaterial.id}, transaction: t});
          }else{
            await StockMaterialModel.create({
              stock_id: stock.id, 
              material_id: thisItem.materials[x].material_id,
              weight: weightFormat(thisItem.materials[x].weight),
              weight_in_gram: weightFormat(thisItem.materials[x].weight_in_gram),
              quantity: thisItem.materials[x].quantity,
              purity_id: thisItem.materials[x].purity_id,
              unit_id: thisItem.materials[x].unit_id,
              category_id: product.category_id
            }, { transaction: t });
          }
        }else{
          await StockMaterialModel.create({
            stock_id: stock.id, 
            material_id: thisItem.materials[x].material_id,
            weight: weightFormat(thisItem.materials[x].weight),
            weight_in_gram: weightFormat(thisItem.materials[x].weight_in_gram),
            quantity: thisItem.materials[x].quantity,
            purity_id: thisItem.materials[x].purity_id,
            unit_id: thisItem.materials[x].unit_id,
            category_id: product.category_id
          }, { transaction: t });
        }*/

      }

      /**
       * END - add to super admin stock
       */
    }

    //update invoice no if not sent
    if (isEmpty(invoice_number)) {
      invoice_number = 'RV-P-' + purchase.id;
    }

    req_data = JSON.stringify(req_data);
    req_data = new Buffer.from(req_data).toString("base64");
    await PurchaseModel.update({
      invoice_number: invoice_number,
      req_data: req_data
    }, { where: { id: purchase.id } });


    //insert into payment table
    if (priceFormat(data.paid_amount) > 0) {
      let amount = priceFormat(data.paid_amount);
      if (!isEmpty(data.on_approval_id) && parseInt(data.on_approval_id) > 0) {
        let approvalPurchase = await PurchaseModel.findByPk(data.on_approval_id);
        if (approvalPurchase && !isEmpty(approvalPurchase.paid_amount)) {
          amount = amount >= parseFloat(approvalPurchase.paid_amount) ? amount - parseFloat(approvalPurchase.paid_amount) : amount;
        }
      }
      if (amount > 0 && isEmpty(data.return_sale_id)) {
        //debit from current user
        let payment = await paymentModel.create({
          payment_mode: data.payment_mode,
          amount: amount,
          user_id: data.supplier_id,
          payment_by: req.userId,
          payment_date: moment().format('YYYY-MM-DD'),
          txn_id: data.transaction_no,
          cheque_no: data.cheque_no,
          status: data.payment_mode == 'cheque' ? 'pending' : 'success',
          type: 'debit',
          table_type: 'purchase',
          table_id: purchase.id,
          payment_belongs: userID,
          purpose: purchase.is_approval ? 'purchase on approval' : 'purchase',
          can_accept: true
        });

        await updateWalletRemainingBalance(userID, payment.id);

        //credit to supplier
        // let payment2 = await paymentModel.create({
        //   parent_id: payment.id,
        //   payment_mode: data.payment_mode,
        //   amount: amount,
        //   user_id: userID,
        //   payment_by: req.userId,
        //   payment_date: moment().format('YYYY-MM-DD'),
        //   txn_id: data.transaction_no,
        //   cheque_no: data.cheque_no,
        //   status: data.payment_mode == 'cheque' ? 'pending' : 'success',
        //   type: 'credit',
        //   table_type: 'purchase',
        //   table_id: purchase.id,
        //   payment_belongs: data.supplier_id,
        //   purpose: 'purchase',
        //   can_accept: false
        // });

        // await updateWalletRemainingBalance(data.supplier_id, payment2.id);
      }
    }

    if (!isEmpty(data.on_approval_id) && parseInt(data.on_approval_id) > 0) {
      await PurchaseModel.update({
        is_approved: 4,
        accept_declined_at: moment().format('YYYY-MM-DD HH:mm:ss')
      }, { where: { id: data.on_approval_id } });
    }

    //if paid from advance amount
    if (parseFloat(data.advance_amount) > 0 && data.pay_from_advance) {
      let thisAmnt = (parseFloat(data.total_payable) >= parseFloat(data.advance_amount)) ? data.advance_amount : priceFormat(parseFloat(data.advance_amount) - parseFloat(data.total_payable));

      await updateAdvanceAmount(userID, data.supplier_id, thisAmnt, false)
    }

    res.send(formatResponse([], "Purchase successfully!"));
    //});
  } catch (error) {
    addLog('err: ' + error.toString());
    return res.status(errorCodes.default).send(formatErrorResponse('Purchase does not success due to some error'));
  }

};

/**
 * Purchase on Approval List
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.onapprove_index = async (req, res) => {
  let { page, limit, supplier_id, load_payments, search, date_from, date_to } = req.query;
  let conditions = {};
  if (!isEmpty(supplier_id)) {
    conditions.supplier_id = supplier_id;
  }
  if (!isEmpty(search)) {
    conditions.invoice_number = { [Op.like]: `%${search}%` };
  }
  conditions.is_approved = { [Op.eq]: 0 };

  conditions = { ...conditions, ...getDateFromToWhere(date_from, date_to, 'invoice_date') }

  const paginatorOptions = getPaginationOptions(page, limit);
  PurchaseModel.findAndCountAll({
    order: [['id', 'DESC']],
    offset: paginatorOptions.offset,
    limit: paginatorOptions.limit,
    where: conditions,
    include: [
      {
        model: PurchaseProductModel,
        as: 'purchaseProducts',
        include: [
          {
            model: ProductModel,
            as: 'product',
          },
          {
            model: PurchaseProductMaterialModel,
            as: 'purchaseMaterials',
          }
        ]
      },
      {
        model: UserModel,
        as: 'supplier',
      }
    ]
  }).then(async (data) => {
    let result = {
      items: await PurchaseListCollection(data.rows, load_payments),
      total: data.count,
    }
    res.send(formatResponse(result, 'Purchase List'));
  })
    .catch(err => {
      res.status(errorCodes.default).send(formatErrorResponse(err));
    });
};

/**
 * View Purchase on Approval
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.onapprove_view = async (req, res) => {
  let purchase = await PurchaseModel.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: PurchaseProductModel,
        as: 'purchaseProducts',
        include: [
          {
            model: ProductModel,
            as: 'product',
            include: [
              {
                model: CategoryModel,
                as: 'category'
              }
            ]
          },
          {
            model: SizeModel,
            as: 'size',
          },
          {
            model: PurchaseProductMaterialModel,
            as: 'purchaseMaterials',
            include: [
              {
                model: MaterialModel,
                as: 'material',
              },
              {
                model: PurityModel,
                as: 'purity'
              },
              {
                model: UnitModel,
                as: 'unit'
              }
            ]
          }
        ]
      },
      {
        model: UserModel,
        as: 'supplier',
      }
    ]
  });
  if (!purchase) {
    return res.status(errorCodes.default).send(formatErrorResponse('Purchase not found'));
  }
  res.send(formatResponse(PurchaseViewCollection(purchase), "Purchase details"));
};

/**
 * Status Change
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.statuschange = async (req, res) => {
  let data = req.body;
  let userID = isManager(req) ? req.userId : await getWorkingUserID(req);
  let purchase = await PurchaseModel.findOne({
    where: { id: req.params.id, user_id: userID },
    include: [
      {
        model: PurchaseProductModel,
        as: 'purchaseProducts',
        separate: true,
        include: [
          {
            model: ProductModel,
            as: 'product',
            include: [
              {
                model: CategoryModel,
                as: 'category'
              }
            ]
          },
          {
            model: SizeModel,
            as: 'size',
          },
          {
            model: PurchaseProductMaterialModel,
            as: 'purchaseMaterials',
            separate: true,
            include: [
              {
                model: MaterialModel,
                as: 'material',
              },
              {
                model: PurityModel,
                as: 'purity'
              },
              {
                model: UnitModel,
                as: 'unit'
              }
            ]
          }
        ]
      },
      {
        model: UserModel,
        as: 'supplier',
      }
    ]
  });
  if (!purchase) {
    return res.status(errorCodes.default).send(formatErrorResponse('Purchase not found'));
  }

  try {

    let sale_id = null;

    const trans = await sequelize.transaction(async (t) => {

      if (data.approve_status != 4) {
        let purchaseObj = {
          is_approved: data.approve_status,
          accept_declined_at: moment().format('YYYY-MM-DD HH:mm:ss')
        };
        await PurchaseModel.update(purchaseObj, { where: { id: purchase.id }, transaction: t });
      }

      //let userID = await getWorkingUserID(req);
      /**
       * START - add to user stock
       */
      if (data.approve_status == 1) {

        let req_data = purchase.req_data;
        let stock_con = userID; //isSuperAdmin(req) ? {[Op.is]: null} : userID;
        if (!isEmpty(req_data)) {
          if (req_data) {
            req_data = new Buffer.from(req_data, "base64").toString('ascii');
            req_data = JSON.parse(req_data);
          } else {
            req_data = {
              products: []
            }
          }
          for (let i = 0; i < req_data.products.length; i++) {
            let thisItem = req_data.products[i];
            let worker_id = thisItem.worker_id || null;

            let product_type = '', product = null, category_id = null, stock_type = '';
            if (purchase.type == "product" || purchase.type == "return_product") {
              product = await ProductModel.findByPk(thisItem.product_id);
              product_type = product.type;
              category_id = product.category_id;
              stock_type = purchase.type == "return_product" ? 'return' : 'product';
            } else {
              product_type = "material";
              let thisM = await MaterialModel.findByPk(thisItem.material_id);
              category_id = thisM.id;
              stock_type = 'material';
            }
            let stock = null;
            if (product_type == "material") {
              let quantity = 0;
              for (let x = 0; x < thisItem.materials.length; x++) {
                quantity += thisItem.materials[x].quantity ? parseInt(thisItem.materials[x].quantity) : 0;
              }
              let _wC = { user_id: stock_con, type: stock_type }, _iu_data = {
                quantity: quantity,
                total_weight: thisItem.total_weight,
                user_id: userID, //isSuperAdmin(req) ? null : req.userId,
                type: stock_type
              };
              if (purchase.type == "material") {
                _wC.material_id = thisItem.material_id;
                _wC.purity_id = thisItem.materials[0].purity_id;
                _iu_data.material_id = thisItem.material_id;
                _iu_data.purity_id = thisItem.materials[0].purity_id;
              } else {
                _wC.product_id = thisItem.product_id;
                _iu_data.product_id = thisItem.product_id;
                _wC.purity_id = thisItem.materials[0].purity_id;
                _iu_data.purity_id = thisItem.materials[0].purity_id;
              }
              let result = await updateOrCreate(StockModel, _wC, _iu_data, t, ['quantity', 'total_weight']);
              stock = result.item;
            } else {
              stock = await StockModel.create({
                purchase_id: purchase.id,
                purchase_product_id: thisItem.id,
                product_id: thisItem.product_id || null,
                size_id: thisItem.size_id || null,
                certificate_no: thisItem.certificate_no,
                quantity: 1,
                total_weight: thisItem.total_weight,
                user_id: userID, //isSuperAdmin(req) ? null : req.userId,
                type: stock_type
              }, { transaction: t });
            }

            let batch_id = null;
            for (let x = 0; x < thisItem.materials.length; x++) {
              if (!isEmpty(worker_id)) {
                let stockH = await stockHistoryModel.create({
                  from_user_id: worker_id,
                  to_user_id: userID,
                  material_id: thisItem.materials[x].material_id,
                  weight: weightFormat(thisItem.materials[x].weight),
                  unit_id: thisItem.materials[x].unit_id,
                  quantity: thisItem.materials[x].quantity || 1,
                  date: moment().format('YYYY-MM-DD'),
                  type: 'debit',
                  batch_id: batch_id,
                  purchase_id: purchase.id
                }, { transaction: t });
                if (batch_id == null) {
                  batch_id = stockH.id;
                  await stockHistoryModel.update({
                    batch_id: batch_id
                  }, { where: { id: stockH.id }, transaction: t });
                }
              }

              /**
               * add to stock materials
               */
              if (product_type == "material") {
                let stockMaterial = await StockMaterialModel.findOne({ where: { stock_id: stock.id, material_id: thisItem.materials[x].material_id } });
                if (stockMaterial) {
                  let thisquantity = thisItem.materials[x].quantity ? (parseInt(stockMaterial.quantity) + parseInt(thisItem.materials[x].quantity)) : stockMaterial.quantity;
                  await StockMaterialModel.update({
                    weight: weightFormat(parseFloat(stockMaterial.weight) + weightFormat(thisItem.materials[x].weight)),
                    weight_in_gram: weightFormat(parseFloat(stockMaterial.weight_in_gram) + weightFormat(thisItem.materials[x].weight_in_gram)),
                    quantity: thisquantity,
                    purity_id: thisItem.materials[x].purity_id,
                    unit_id: thisItem.materials[x].unit_id,
                    category_id: category_id
                  }, { where: { id: stockMaterial.id }, transaction: t });
                } else {
                  await StockMaterialModel.create({
                    stock_id: stock.id,
                    material_id: thisItem.materials[x].material_id,
                    weight: weightFormat(thisItem.materials[x].weight),
                    weight_in_gram: weightFormat(thisItem.materials[x].weight_in_gram),
                    quantity: thisItem.materials[x].quantity || 0,
                    purity_id: thisItem.materials[x].purity_id,
                    unit_id: thisItem.materials[x].unit_id,
                    category_id: category_id
                  }, { transaction: t });
                }
              } else {
                await StockMaterialModel.create({
                  stock_id: stock.id,
                  material_id: thisItem.materials[x].material_id,
                  weight: weightFormat(thisItem.materials[x].weight),
                  weight_in_gram: weightFormat(thisItem.materials[x].weight_in_gram),
                  quantity: thisItem.materials[x].quantity || 0,
                  purity_id: thisItem.materials[x].purity_id,
                  unit_id: thisItem.materials[x].unit_id,
                  category_id: category_id
                }, { transaction: t });
              }
            }
          }

          //delete all payment
          /*await paymentModel.destroy({ where: {
            table_type: 'purchase',
            table_id: purchase.id
          }, transaction: t});*/

          /*if(!isEmpty(purchase.paid_amount)){
            await PurchaseModel.update({
              paid_amount: 0,
              due_amount: purchase.total_payable,
              status: 'due'
            },{where: {id: purchase.id}, transaction: t});
          }*/

        }

        //send notification
        sendNotification('purchase_accept', req, { purchase: purchase });


      } else if (data.approve_status == 4) {
        //don't need to do anything
      } else {
        if (isEmpty(purchase.return_id) && !purchase.is_assigned && purchase.paid_amount > 0 /*&& isEmpty(purchase.sale_id)*/) {
          if (data.decline_type == "advance") {
            // let user = await UserModel.findByPk(purchase.user_id);
            // if(user){
            //   let advance_amount = user.advance_amount ? priceFormat(parseFloat(user.advance_amount) + purchase.paid_amount) : purchase.paid_amount;
            //   await UserModel.update({advance_amount: advance_amount}, {where: {id: purchase.user_id}});
            // }
            let paidAmnt = parseFloat(purchase.paid_amount);
            let payment = await paymentModel.findOne({ where: { table_type: "purchase", table_id: purchase.id, type: "debit" } });
            if (payment) {
              if (payment.status == "pending") {
                paidAmnt = priceFormat(paidAmnt - parseFloat(payment.amount));
              }
            }
            await updateAdvanceAmount(purchase.user_id, purchase.supplier_id, paidAmnt, true);

          } else if (data.decline_type == "return") {
            let paidAmnt = parseFloat(purchase.paid_amount);
            let payment = await paymentModel.findOne({ where: { table_type: "purchase", table_id: purchase.id, type: "debit" } });
            if (payment) {
              if (payment.payment_mode == "cheque" && payment.status == "pending") {
                await paymentModel.destroy({ where: { table_type: "purchase", table_id: purchase.id } });
                if (!isEmpty(purchase.sale_id)) {
                  await paymentModel.destroy({ where: { table_type: "sale", table_id: purchase.sale_id } });
                }
                paidAmnt = priceFormat(paidAmnt - parseFloat(payment.amount));
              }
            }
            if (paidAmnt > 0) {
              let payment2 = await paymentModel.create({
                payment_mode: payment ? payment.payment_mode : "cash",
                amount: paidAmnt,
                user_id: isEmpty(purchase.sale_id) ? purchase.user_id : purchase.supplier_id,
                payment_by: userID,
                payment_date: moment().format('YYYY-MM-DD'),
                //txn_id: payment.txn_id,
                //cheque_no: payment.cheque_no,
                status: 'success',
                type: 'credit',
                table_type: 'purchase',
                table_id: purchase.id,
                payment_belongs: isEmpty(purchase.sale_id) ? purchase.supplier_id : purchase.user_id,
                purpose: purchase.is_approval ? 'purchase approval declined' : 'purchase declined'
              });
              let remaining_balance = await getWalletBalance(payment2.payment_belongs);
              await paymentModel.update({
                remaining_balance: remaining_balance
              }, { where: { id: payment2.id } });

              //if(!isEmpty(purchase.sale_id)){
              let payment3 = await paymentModel.create({
                payment_mode: payment ? payment.payment_mode : "cash",
                amount: paidAmnt,
                user_id: isEmpty(purchase.sale_id) ? purchase.supplier_id : purchase.user_id,
                payment_by: userID,
                payment_date: moment().format('YYYY-MM-DD'),
                //txn_id: payment.txn_id,
                //cheque_no: payment.cheque_no,
                status: 'success',
                type: 'debit',
                table_type: isEmpty(purchase.sale_id) ? 'purchase' : 'sale',
                table_id: isEmpty(purchase.sale_id) ? purchase.id : purchase.sale_id,
                payment_belongs: isEmpty(purchase.sale_id) ? purchase.user_id : purchase.supplier_id,
                purpose: isEmpty(purchase.sale_id) ? (purchase.is_approval ? 'purchase approval declined' : 'purchase declined') : (purchase.is_approval ? 'sale approval declined' : 'sale declined')
              });
              let remaining_balance2 = await getWalletBalance(payment3.payment_belongs);
              await paymentModel.update({
                remaining_balance: remaining_balance2
              }, { where: { id: payment3.id } });
              // }
            }

          }
        }

        //return to upper user stock
        if (isEmpty(purchase.return_id)) {
          if (!isEmpty(purchase.sale_id)) {
            if (isAdmin(req) || isDistributor(req) || isSalesExecutive(req) || isSuperAdmin(req)) {
              let parentUserID = purchase.supplier_id; //isAdmin(req) ? await getSuperAdminId() : purchase.supplier_id;
              let req_data = purchase.req_data;
              if (req_data) {
                req_data = new Buffer.from(req_data, "base64").toString('ascii');
                req_data = JSON.parse(req_data);
              } else {
                req_data = {
                  products: []
                }
              }
              for (let i = 0; i < req_data.products.length; i++) {
                let thisItem = req_data.products[i];
                let worker_id = thisItem.worker_id || null;

                let product = await ProductModel.findByPk(thisItem.product_id);
                let stock = null;
                if (product.type == "material") {
                  let quantity = 0;
                  for (let x = 0; x < thisItem.materials.length; x++) {
                    quantity += thisItem.materials[x].quantity ? parseInt(thisItem.materials[x].quantity) : 0;
                  }
                  let result = await updateOrCreate(StockModel, {
                    product_id: thisItem.product_id,
                    user_id: parentUserID,
                    purity_id: thisItem.materials[0].purity_id,
                  }, {
                    product_id: thisItem.product_id,
                    quantity: quantity,
                    total_weight: thisItem.total_weight,
                    user_id: parentUserID,
                    purity_id: thisItem.materials[0].purity_id,
                  }, t, ['quantity', 'total_weight']);
                  stock = result.item;
                } else {
                  stock = await StockModel.create({
                    purchase_id: purchase.id,
                    purchase_product_id: thisItem.id,
                    product_id: thisItem.product_id,
                    size_id: thisItem.size_id || null,
                    certificate_no: thisItem.certificate_no,
                    quantity: 1,
                    total_weight: thisItem.total_weight,
                    user_id: parentUserID
                  }, { transaction: t });
                }

                let batch_id = null;
                for (let x = 0; x < thisItem.materials.length; x++) {
                  /*if(!isEmpty(worker_id)){
                    let stockH = await stockHistoryModel.create({
                      from_user_id: worker_id,
                      to_user_id: userID,
                      material_id: thisItem.materials[x].material_id,
                      weight: weightFormat(thisItem.materials[x].weight),
                      unit_id: thisItem.materials[x].unit_id,
                      quantity: thisItem.materials[x].quantity || 1,
                      date: moment().format('YYYY-MM-DD'),
                      type: 'debit',
                      batch_id: batch_id,
                      purchase_id: purchase.id
                    }, { transaction: t });
                    if(batch_id == null){
                      batch_id = stockH.id;
                      await stockHistoryModel.update({
                        batch_id: batch_id
                      },{where: {id: stockH.id}, transaction: t});
                    }
                  }*/

                  /**
                   * add to stock materials
                   */
                  if (product.type == "material") {
                    let stockMaterial = await StockMaterialModel.findOne({ where: { stock_id: stock.id, material_id: thisItem.materials[x].material_id } });
                    if (stockMaterial) {
                      let thisquantity = thisItem.materials[x].quantity ? (parseInt(stockMaterial.quantity) + parseInt(thisItem.materials[x].quantity)) : stockMaterial.quantity;
                      await StockMaterialModel.update({
                        weight: weightFormat(parseFloat(stockMaterial.weight) + weightFormat(thisItem.materials[x].weight)),
                        weight_in_gram: weightFormat(parseFloat(stockMaterial.weight_in_gram) + weightFormat(thisItem.materials[x].weight_in_gram)),
                        quantity: thisquantity,
                        purity_id: thisItem.materials[x].purity_id,
                        unit_id: thisItem.materials[x].unit_id,
                        category_id: product.category_id
                      }, { where: { id: stockMaterial.id }, transaction: t });
                    } else {
                      await StockMaterialModel.create({
                        stock_id: stock.id,
                        material_id: thisItem.materials[x].material_id,
                        weight: weightFormat(thisItem.materials[x].weight),
                        weight_in_gram: weightFormat(thisItem.materials[x].weight_in_gram),
                        quantity: thisItem.materials[x].quantity || 0,
                        purity_id: thisItem.materials[x].purity_id,
                        unit_id: thisItem.materials[x].unit_id,
                        category_id: product.category_id
                      }, { transaction: t });
                    }
                  } else {
                    await StockMaterialModel.create({
                      stock_id: stock.id,
                      material_id: thisItem.materials[x].material_id,
                      weight: weightFormat(thisItem.materials[x].weight),
                      weight_in_gram: weightFormat(thisItem.materials[x].weight_in_gram),
                      quantity: thisItem.materials[x].quantity || 0,
                      purity_id: thisItem.materials[x].purity_id,
                      unit_id: thisItem.materials[x].unit_id,
                      category_id: product.category_id
                    }, { transaction: t });
                  }
                }
              }
            }
          }
        }

        //send notification
        sendNotification('purchase_declined', req, { purchase: purchase });
      }

      if (!isEmpty(purchase.sale_id)) {
        await SaleModel.update({ is_approved: data.approve_status, accept_declined_at: moment().format('YYYY-MM-DD HH:mm:ss') }, { where: { id: purchase.sale_id }, transaction: t });
      }

    });


    if (data.approve_status == 1) {
      /**
       * Manage return sale
       */
      if (!isEmpty(purchase.return_id)) {
        let saleReturn = await ReturnModel.findOne({ where: { id: purchase.return_id } });
        let sale = await SaleModel.findOne({ where: { id: saleReturn.table_id } });
        sale_id = sale.id;

        await ReturnModel.update({
          status: 'completed'
        }, { where: { id: purchase.return_id } });
        await StockModel.destroy({ where: { return_id: purchase.return_id } });
        let return_amount_from_wallet = saleReturn.return_amount_from_wallet ? parseFloat(saleReturn.return_amount_from_wallet) : 0;
        if (return_amount_from_wallet > 0) {
          let payment4 = await paymentModel.create({
            payment_mode: purchase.payment_mode,
            amount: return_amount_from_wallet,
            user_id: saleReturn.user_id,
            payment_by: req.userId,
            payment_date: moment().format('YYYY-MM-DD'),
            txn_id: purchase.transaction_no,
            cheque_no: purchase.cheque_no,
            status: purchase.payment_mode == 'cheque' ? 'pending' : 'success',
            type: 'debit',
            table_type: 'purchase',
            table_id: purchase.id,
            payment_belongs: userID,
            purpose: 'Sale Refund',
            can_accept: true
          });

          await updateWalletRemainingBalance(userID, payment4.id);
        }

        let return_req_data = new Buffer.from(saleReturn.req_data, "base64").toString('ascii');
        return_req_data = JSON.parse(return_req_data);
        let return_products = return_req_data.return_products;
        let return_data = return_req_data.return_data;

        for (let i = 0; i < return_products.length; i++) {
          if (!return_products[i].is_return) {
            continue;
          }

          //fetch purchase product by id
          let saleProduct = await SaleProductModel.findOne({
            where: { id: return_products[i].id },
            include: [
              {
                model: SaleProductMaterialModel,
                as: 'saleMaterials',
                separate: true
              }
            ]
          });

          //update sale product is return and return weight & qty into sale product material table
          if (return_data.products[i].product_type == 'material') {
            let total_return_weight = parseFloat(saleProduct.saleMaterials[0].return_weight) + parseFloat(return_data.products[i].materials[0].return_weight);
            let total_return_qty = parseInt(saleProduct.saleMaterials[0].return_qty) + parseInt(return_data.products[i].materials[0].return_qty);
            let is_return = (total_return_qty >= parseInt(saleProduct.saleMaterials[0].quantity) || total_return_weight >= parseFloat(saleProduct.saleMaterials[0].weight)) ? true : false;

            await SaleProductModel.update({ is_return: is_return }, { where: { id: saleProduct.id } });
            await SaleProductMaterialModel.update({
              return_qty: total_return_qty,
              return_weight: total_return_weight
            }, { where: { id: saleProduct.saleMaterials[0].id } });

          } else {
            await SaleProductModel.update({ is_return: true }, { where: { id: saleProduct.id } });
          }
        }


        //update sale total payable price
        let total_payable = parseFloat(sale.total_payable);
        let return_amount = parseFloat(saleReturn.product_amount);
        total_payable = priceFormat(total_payable - return_amount);
        let paid_amount = parseFloat(sale.paid_amount);
        let due_amount = priceFormat(total_payable - paid_amount, true);
        due_amount = due_amount < 0 ? 0 : due_amount;
        if (paid_amount > total_payable) {
          paid_amount = 0;
        }

        let total_return_amt = priceFormat(priceFormat(sale.return_amount) + return_amount);
        await SaleModel.update({
          return_amount: total_return_amt,
          total_payable: total_payable,
          due_amount: due_amount,
          paid_amount: paid_amount,
          status: due_amount > 0 ? 'due' : 'paid'
        }, { where: { id: sale.id } });

        if (due_amount <= 0) {
          await NoticationModel.update({
            is_read: true
          }, { where: { type_id: sale.id, [Op.or]: [{ type: "sale_due" }, { type: "sale_settlement" }] } });
        }

      }

      if (!isEmpty(sale_id)) {
        let total_sale_products = await SaleProductModel.count({ where: { sale_id: sale_id } });
        total_sale_products = total_sale_products ?? 0;
        let allReturn = await SaleProductModel.count({ where: { sale_id: sale_id, is_return: true } });
        allReturn = allReturn ?? 0;
        if (allReturn == total_sale_products) {
          await SaleModel.update({
            status: "returned"
          }, { where: { id: sale_id } });
        }
      }
    }

    res.send(formatResponse([], "Purchase Status Changed successfully!"));

  } catch (error) {
    addLog('err: ' + error.toString())
    console.log(error)
    return res.status(errorCodes.default).send(formatErrorResponse('Purchase does not update due to some error'));
  }
};

/**
 * View Purchase
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.view = async (req, res) => {
  try {


    let userID = isManager(req) ? req.userId : await getWorkingUserID(req);
    let purchase = await PurchaseModel.findOne({
      where: { id: req.params.id /*, user_id: userID*/ },
      include: [
        {
          model: PurchaseProductModel,
          as: 'purchaseProducts',
          separate: true,
          include: [
            {
              model: ProductModel,
              as: 'product',
              include: [
                {
                  model: CategoryModel,
                  as: 'category'
                }
              ]
            },
            {
              model: SizeModel,
              as: 'size',
            },
            {
              model: PurchaseProductMaterialModel,
              as: 'purchaseMaterials',
              separate: true,
              include: [
                {
                  model: MaterialModel,
                  as: 'material',
                },
                {
                  model: PurityModel,
                  as: 'purity'
                },
                {
                  model: UnitModel,
                  as: 'unit'
                }
              ]
            }
          ]
        },
        {
          model: UserModel,
          as: 'supplier',
        }
      ]
    });
    if (!purchase) {
      return res.status(errorCodes.default).send(formatErrorResponse('Purchase not found'));
    }

    let req_data = new Buffer.from(purchase.req_data, "base64").toString('ascii');
    req_data = JSON.parse(req_data);

    res.send(formatResponse(PurchaseViewCollection(purchase), "Purchase details"));

  } catch (error) {
    return res.status(errorCodes.default).send(formatErrorResponse(error));
  }
};


/**
 * edit data for Purchase
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.edit = async (req, res) => {
  let purchase = await PurchaseModel.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: PurchaseProductModel,
        as: 'purchaseProducts',
        separate: true,
        include: [
          {
            model: ProductModel,
            as: 'product',
          },
          {
            model: SizeModel,
            as: 'size',
          },
          {
            model: PurchaseProductMaterialModel,
            as: 'purchaseMaterials',
            separate: true,
            include: [
              {
                model: MaterialModel,
                as: 'material',
                include: [
                  {
                    model: PurityModel,
                    as: 'purities'
                  }
                ]
              },
              {
                model: UnitModel,
                as: 'unit'
              },
              {
                model: PurityModel,
                as: 'purity'
              }
            ]
          }
        ]
      },
      {
        model: UserModel,
        as: 'supplier',
      }
    ]
  });
  if (!purchase) {
    return res.status(errorCodes.default).send(formatErrorResponse('Purchase not found'));
  }
  res.send(formatResponse(await PurchaseEditCollection(purchase, req), "Purchase edit details"));
};




/**
 * Update Product
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.update = async (req, res) => {
  let userID = isManager(req) ? req.userId : await getWorkingUserID(req);
  let purchase = await PurchaseModel.findOne({
    where: { id: req.params.id, user_id: userID, is_approved: 0 }
  });

  if (!purchase) {
    return res.status(errorCodes.default).send(formatErrorResponse('Purchase is not found.'));
  }

  let data = req.body;

  try {
    const trans = await sequelize.transaction(async (t) => {
      //insert into purchase table
      let invoice_number = data.invoice_number || null;
      let req_data = data;
      let status = "due", paid_amount = 0, due_amount = 0;
      if (data.payment_mode != "cheque") {
        status = (priceFormat(data.paid_amount) >= priceFormat(data.total_payable)) ? 'paid' : 'due';
        paid_amount = data.paid_amount ? priceFormat(data.paid_amount) : 0;
        due_amount = priceFormat(data.due_amount);
      } else {
        due_amount = priceFormat(data.total_payable);
      }
      let purchaseObj = {
        //supplier_id: data.supplier_id,
        //user_id: userID,
        //invoice_number: invoice_number,
        //invoice_date: moment(data.invoice_date, "MM/DD/YYYY").format('YYYY-MM-DD'),
        notes: data.notes,
        payment_mode: data.payment_mode,
        transaction_no: data.transaction_no,
        total_amount: priceFormat(data.total_amount),
        tax: priceFormat(data.tax),
        discount: priceFormat(data.discount),
        paid_amount: paid_amount,
        taxable_amount: priceFormat(data.taxable_amount),
        bill_amount: priceFormat(data.total_payable),
        total_payable: priceFormat(data.total_payable),
        due_amount: due_amount,
        //due_date: moment(data.due_date).format('YYYY-MM-DD'),
        status: status,
        //is_approved: 0,
        //req_data: req_data
      };
      await PurchaseModel.update(purchaseObj, { where: { id: purchase.id }, transaction: t });

      /**
       * delete old stock history
       */
      let stockstockHistorys = await stockHistoryModel.findAll({ where: { purchase_id: purchase.id } });
      for (let i = 0; i < stockstockHistorys.length; i++) {
        await updateStockRawMaterialOutStanding(stockstockHistorys[i].id, {
          user_id: stockstockHistorys[i].belongs_to,
          material_id: stockstockHistorys[i].material_id,
          weight: stockstockHistorys[i].weight,
          unit_id: stockstockHistorys[i].unit_id,
          quantity: stockstockHistorys[i].quantity,
        }, "debit");
      }
      await stockHistoryModel.destroy({ where: { purchase_id: purchase.id }, transaction: t });

      //insert into purchase product table
      let ppIds = [];
      for (let i = 0; i < data.products.length; i++) {
        let thisItem = data.products[i];
        if (thisItem.id == 0) {
          let worker_id = thisItem.worker_id || null;
          let thisObj = {
            purchase_id: purchase.id,
            product_id: thisItem.product_id,
            worker_id: worker_id,
            size_id: thisItem.size_id || null,
            certificate_no: thisItem.certificate_no,
            total_weight: weightFormat(thisItem.total_weight),
            sub_price: priceFormat(thisItem.sub_price),
            making_charge: priceFormat(thisItem.making_charge),
            rep: priceFormat(thisItem.rep),
            tax: priceFormat(thisItem.tax),
            total: priceFormat(thisItem.total),
          }

          let purchaseProduct = await PurchaseProductModel.create(thisObj, { transaction: t });
          req_data.products[i].id = purchaseProduct.id;
          ppIds.push(purchaseProduct.id);

          //insert into purchase product materials
          for (let x = 0; x < thisItem.materials.length; x++) {
            let thisMObj = {
              purchase_id: purchase.id,
              purchase_product_id: purchaseProduct.id,
              material_id: thisItem.materials[x].material_id,
              weight: weightFormat(thisItem.materials[x].weight),
              quantity: thisItem.materials[x].quantity || 0,
              purity_id: thisItem.materials[x].purity_id,
              unit_id: thisItem.materials[x].unit_id,
              rate: thisItem.materials[x].rate,
              amount: thisItem.materials[x].amount
            }
            await PurchaseProductMaterialModel.create(thisMObj, { transaction: t });

          }
        } else {
          ppIds.push(thisItem.id);
        }

        // if (!isEmpty(worker_id)) {
        //   let batch_id = null;
        //   for (let x = 0; x < thisItem.materials.length; x++) {
        //     let stockH = await stockHistoryModel.create({
        //       from_user_id: worker_id,
        //       to_user_id: req.userId,
        //       material_id: thisItem.materials[x].material_id,
        //       weight: weightFormat(thisItem.materials[x].weight),
        //       unit_id: thisItem.materials[x].unit_id,
        //       quantity: thisItem.materials[x].quantity || 0,
        //       date: moment().format('YYYY-MM-DD'),
        //       type: 'debit',
        //       batch_id: batch_id,
        //       purchase_id: purchase.id
        //     }, { transaction: t });
        //     if (batch_id == null) {
        //       batch_id = stockH.id;
        //       await stockHistoryModel.update({
        //         batch_id: batch_id
        //       }, { where: { id: stockH.id }, transaction: t });
        //     }

        //     await updateStockRawMaterialOutStanding(stockH.id, {
        //       user_id: worker_id,
        //       material_id: thisItem.materials[x].material_id,
        //       weight: thisItem.materials[x].weight,
        //       unit_id: thisItem.materials[x].unit_id,
        //       quantity: !isEmpty(thisItem.materials[x].quantity) ? thisItem.materials[x].quantity : 0,
        //     }, "debit");
        //   }
        // }
      }

      //delete which are deleted
      await PurchaseProductModel.destroy({ where: { purchase_id: purchase.id, id: { [Op.notIn]: ppIds } }, transaction: t });
      await PurchaseProductMaterialModel.destroy({ where: { purchase_id: purchase.id, purchase_product_id: { [Op.notIn]: ppIds } }, transaction: t });

      req_data = JSON.stringify(req_data);
      req_data = new Buffer.from(req_data).toString("base64");
      await PurchaseModel.update({
        req_data: req_data
      }, { where: { id: purchase.id }, transaction: t });
      res.send(formatResponse([], "Purchase updated successfully!"));
    });
  } catch (error) {
    addLog('err: ' + error.toString());
    return res.status(errorCodes.default).send(formatErrorResponse('Purchase does not success due to some error'));
  }
};


/**
 * delete Purchase
 * 
 * @param {*} req
 * @param {*} res 
 */
exports.delete = async (req, res) => {
  let purchase = await PurchaseModel.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: PurchaseProductModel,
        as: 'purchaseProducts',
        include: [
          {
            model: ProductModel,
            as: 'product',
          },
          {
            model: PurchaseProductMaterialModel,
            as: 'purchaseMaterials',
          }
        ]
      }
    ]
  });
  if (!purchase) {
    return res.status(errorCodes.default).send(formatErrorResponse('Data not found'));
  }


  try {
    let purchase_id = req.params.id;
    const trans = await sequelize.transaction(async (t) => {
      //remove old product & materials from stock
      let userID = isManager(req) ? req.userId : await getWorkingUserID(req);
      await removeMaterialFromStock(purchase, t, userID);

      await PurchaseProductModel.destroy({ where: { purchase_id: purchase_id }, transaction: t });
      await PurchaseProductMaterialModel.destroy({ where: { purchase_id: purchase_id }, transaction: t });
      await PurchaseModel.destroy({ where: { id: purchase_id }, transaction: t });

      res.send(formatResponse([], "Purchase deleted successfully!"));
    });
  } catch (error) {
    return res.status(errorCodes.default).send(formatErrorResponse('Purchase does not delete due to some error'));
  }
};


/**
 * get new purchase invoice number
 * 
 * @param {*} req
 * @param {*} res 
 */
exports.newInvoiceNumber = async (req, res) => {
  let purchase = await PurchaseModel.findOne({attributes: ['id'], order: [['id', 'DESC']] });
  let next_invoice = 'RV-P-' + (purchase ? (purchase.id + 1) : 1);

  res.send(formatResponse({ next_invoice: next_invoice }));
}

/**
 * Return Products
 * 
 * @param {*} req
 * @param {*} res 
 */
exports.returnProducts = async (req, res) => {
  let data = req.body;
  let return_data = data.return_data;
  let return_products = data.return_products;
  let userID = isManager(req) ? req.userId : await getWorkingUserID(req);
  let purchase = await PurchaseModel.findOne({ where: { id: req.params.id, user_id: userID } });
  if (!purchase) {
    return res.status(errorCodes.default).send(formatErrorResponse('Purchase not found'));
  }

  if (isEmpty(purchase.sale_id) && data.payment_type == "return") {
    // let return_amount_from_wallet = data.return_amount_from_wallet ? parseFloat(data.return_amount_from_wallet) : 0;
    // let walletBalance = await getWalletBalance(userID, data.payment_mode);
    // if (walletBalance < priceFormat(return_amount_from_wallet)) {
    //   return res.status(errorCodes.default).send(formatErrorResponse("Insufficient wallet balance."));
    // }
  }

  let stock_con = userID; //isSuperAdmin(req) ? {[Op.is]: null} : userID;

  //check is stock have that product
  if (purchase.is_approved == 1) {
    for (let i = 0; i < return_products.length; i++) {
      if (!return_products[i].is_return) {
        continue;
      }
      //fetch purchase product by id
      let purchaseProduct = await PurchaseProductModel.findOne({
        where: { id: return_products[i].id },
        include: [
          {
            model: PurchaseProductMaterialModel,
            as: 'purchaseMaterials'
          }
        ]
      });

      let stock = null;
      if (return_data.products[i].product_type == "material") {
        if (!isEmpty(return_data.products[i].product_id)) {
          stock = await StockModel.findOne({ where: { product_id: return_data.products[i].product_id, user_id: stock_con } });
        } else {
          stock = await StockModel.findOne({ where: { material_id: return_data.products[i].materials[0].material_id, user_id: stock_con } });
        }
        if (!stock) {
          return res.status(errorCodes.default).send(formatErrorResponse("You doesn't have enough stock."));
        }
        for (let mItem of return_data.products[i].materials) {
          let stockM = await StockMaterialModel.findOne({ where: { stock_id: stock.id, material_id: mItem.material_id } });
          if (!stockM) {
            return res.status(errorCodes.default).send(formatErrorResponse("You doesn't have enough stock."));
          }

          // let weight = weightFormat(parseFloat(stockM.weight) - parseFloat(mItem.return_weight));
          // let quantity = (parseFloat(stockM.quantity) - parseInt(mItem.return_qty));
          // if (weight <= 0 && quantity <= 0) {
          //   return res.status(errorCodes.default).send(formatErrorResponse("You doesn't have enough stock."));
          // }
        }

      } else {
        let stock = await StockModel.findOne({
          where: { product_id: return_data.products[i].product_id, user_id: stock_con, certificate_no: return_data.products[i].certificate_no, size_id: return_data.products[i].size_id },
          include: [
            {
              model: StockMaterialModel,
              as: 'stockMaterials',
              required: true,
              separate: true
            }
          ]
        });
        if (!stock) {
          console.log('not found: ' + return_data.products[i].id)
          return res.status(errorCodes.default).send(formatErrorResponse("You doesn't have enough stock."));
        } else {
          let numMatched = 0;
          let stockMaterials = formatStockMaterials(stock.stockMaterials);
          for (let x = 0; x < return_data.products[i].materials.length; x++) {
            let item = return_data.products[i].materials[x];
            let thisM = _.filter(stockMaterials, { material_id: item.material_id });
            if (thisM.length && thisM[0].material_id == item.material_id && thisM[0].purity_id == item.purity_id && thisM[0].unit_id == item.unit_id) {
              numMatched++;
            }
          }
          if (numMatched != return_data.products[i].materials.length) {
            return res.status(errorCodes.default).send(formatErrorResponse("You doesn't have enough stock."));
          }
        }
      }
    }
  }

  try {
    const trans = await sequelize.transaction(async (t) => {

      //insert into return table
      let req_data = JSON.stringify(data);
      req_data = new Buffer.from(req_data).toString("base64");
      const returnObj = await ReturnModel.create({
        user_id: userID,
        seller_id: !isEmpty(purchase.sale_id) ? userID : null,
        table_id: purchase.id,
        table_type: 'purchases',
        notes: data.notes,
        payment_mode: data.payment_mode,
        txn_id: data.transaction_no,
        cheque_no: data.cheque_no,
        status: !isEmpty(purchase.sale_id) ? "pending" : "success",
        product_amount: data.product_amount,
        charge: data.return_charge,
        total_amount: data.return_amount,
        accepted_at: moment().format('YYYY-MM-DD'),
        return_date: data.return_date ? moment(data.return_date, "MM/DD/YYYY").format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
        req_data: req_data
      }, { transaction: t });

      let saleReturnObj = null, sale_products = [];
      if ((!isSuperAdmin(req) || isManager(req)) && !isEmpty(purchase.sale_id)) {
        let sale = await SaleModel.findOne({
          where: { id: purchase.sale_id },
          include: [
            {
              model: SaleProductModel,
              as: 'saleProducts'
            }
          ]
        });
        if (sale) {
          sale_products = sale.saleProducts;
          saleReturnObj = await ReturnModel.create({
            user_id: purchase.supplier_id,
            seller_id: !isEmpty(purchase.sale_id) ? userID : null,
            parent_id: returnObj.id,
            table_id: sale.id,
            table_type: 'sales',
            notes: data.notes,
            payment_mode: data.payment_mode,
            txn_id: data.transaction_no,
            cheque_no: data.cheque_no,
            status: "pending",
            product_amount: data.product_amount,
            charge: data.return_charge,
            total_amount: data.return_amount,
            accepted_at: moment().format('YYYY-MM-DD'),
            return_date: data.return_date ? moment(data.return_date, "MM/DD/YYYY").format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
            req_data: req_data
          }, { transaction: t });
        }
      }

      for (let i = 0; i < return_products.length; i++) {
        if (!return_products[i].is_return) {
          continue;
        }

        //fetch purchase product by id
        let purchaseProduct = await PurchaseProductModel.findOne({
          where: { id: return_products[i].id },
          include: [
            {
              model: PurchaseProductMaterialModel,
              as: 'purchaseMaterials'
            }
          ]
        });

        //insert into return product table
        let returnProduct = await ReturnProductModel.create({
          return_id: returnObj.id,
          table_id: purchaseProduct.id,
          table_type: 'purchase_products',
          sub_total: return_data.products[i].return_amount
        }, { transaction: t });

        let returnSaleProduct = null;
        if (saleReturnObj) {
          returnSaleProduct = await ReturnProductModel.create({
            return_id: saleReturnObj.id,
            table_id: sale_products[i].id,
            table_type: 'sale_products',
            sub_total: return_data.products[i].return_amount
          }, { transaction: t });
        }

        //insert into return product materials table
        for (let x = 0; x < return_data.products[i].materials.length; x++) {
          let thisQty = (return_data.products[i].product_type == 'material') ? parseFloat(return_data.products[i].materials[x].return_qty) : return_data.products[i].materials[x].quantity;
          let thisWeight = (return_data.products[i].product_type == 'material') ? parseFloat(return_data.products[i].materials[x].return_weight) : return_data.products[i].materials[x].weight;
          await ReturnProductMaterialModel.create({
            return_id: returnObj.id,
            return_product_id: returnProduct.id,
            material_id: return_data.products[i].materials[x].material_id,
            weight: thisWeight,
            quantity: thisQty,
            purity_id: return_data.products[i].materials[x].purity_id,
            unit_id: return_data.products[i].materials[x].unit_id,
          }, { transaction: t });

          if (returnSaleProduct) {
            await ReturnProductMaterialModel.create({
              return_id: saleReturnObj.id,
              return_product_id: returnSaleProduct.id,
              material_id: return_data.products[i].materials[x].material_id,
              weight: thisWeight,
              quantity: thisQty,
              purity_id: return_data.products[i].materials[x].purity_id,
              unit_id: return_data.products[i].materials[x].unit_id,
            }, { transaction: t });
          }
        }

        //update purchase product is return and return weight & qty into purchase product material table
        if (return_data.products[i].product_type == 'material') {
          let total_return_weight = parseFloat(purchaseProduct.purchaseMaterials[0].return_weight) + parseFloat(return_data.products[i].materials[0].return_weight);
          let total_return_qty = parseInt(purchaseProduct.purchaseMaterials[0].return_qty) + parseInt(return_data.products[i].materials[0].return_qty);
          let is_return = (total_return_qty >= parseInt(purchaseProduct.purchaseMaterials[0].quantity) || total_return_weight >= parseFloat(purchaseProduct.purchaseMaterials[0].weight)) ? true : false;

          await PurchaseProductModel.update({ is_return: is_return }, { where: { id: purchaseProduct.id }, transaction: t });
          await PurchaseProductMaterialModel.update({
            return_qty: total_return_qty,
            return_weight: total_return_weight
          }, { where: { id: purchaseProduct.purchaseMaterials[0].id }, transaction: t });

        } else {
          await PurchaseProductModel.update({ is_return: true }, { where: { id: purchaseProduct.id }, transaction: t });
        }

        /**
         * START - Remove from stock table
         */
        if (purchase.is_approved == 1) {
          let stock = null;
          if (return_data.products[i].product_type == "material") {
            if (!isEmpty(return_data.products[i].product_id)) {
              stock = await StockModel.findOne({ where: { product_id: return_data.products[i].product_id, user_id: stock_con } });
            } else {
              stock = await StockModel.findOne({ where: { material_id: return_data.products[i].materials[0].material_id, user_id: stock_con } });
            }
            let quantity = 0, weight = 0, unit_name = '';
            for (let mItem of return_data.products[i].materials) {
              let stockM = await StockMaterialModel.findOne({ where: { stock_id: stock.id, material_id: mItem.material_id } });
              if (stockM) {
                await StockMaterialModel.update({
                  weight: weightFormat(parseFloat(stockM.weight) - parseFloat(mItem.return_weight)),
                  quantity: (parseFloat(stockM.quantity) - parseInt(mItem.return_qty))
                }, { where: { id: stockM.id } });
                weight += mItem.return_weight ? parseInt(mItem.return_weight) : 0;
              }
              unit_name = mItem.unit_name;
              weight = convertUnitToGram(unit_name, weight);
              quantity += parseInt(mItem.return_qty);
            }
            if (parseFloat(stock.total_weight) <= weight) {
              await StockModel.destroy({ where: { id: stock.id } });
            } else {
              let return_weight_in_gram = convertUnitToGram(unit_name, return_data.products[i].materials[0].return_weight);
              await StockModel.update({
                quantity: (parseFloat(stock.quantity) - parseFloat(quantity)),
                total_weight: (parseFloat(stock.total_weight) - parseFloat(return_weight_in_gram))
              }, { where: { id: stock.id } });
            }

          } else {

            let stock = await StockModel.findOne({
              where: { product_id: return_data.products[i].product_id, user_id: stock_con, certificate_no: return_data.products[i].certificate_no, size_id: return_data.products[i].size_id },
              include: [
                {
                  model: StockMaterialModel,
                  as: 'stockMaterials',
                  required: true,
                  separate: true
                }
              ]
            });
            if (stock) {
              let numMatched = 0;
              let stockMaterials = formatStockMaterials(stock.stockMaterials);
              for (let x = 0; x < return_data.products[i].materials.length; x++) {
                let item = return_data.products[i].materials[x];
                let thisM = _.filter(stockMaterials, { material_id: item.material_id });
                if (thisM.length && thisM[0].material_id == item.material_id && thisM[0].purity_id == item.purity_id && thisM[0].unit_id == item.unit_id) {
                  numMatched++;
                }
              }
              if (numMatched == return_data.products[i].materials.length) {
                await StockModel.destroy({ where: { id: stock.id } });
                await StockMaterialModel.destroy({ where: { stock_id: stock.id } });
                let cart = await cartsModel.findOne({where: {type: 'sale', stock_id: stock.id}});
                if(cart){
                  await cartsModel.destroy({ where: { id: cart.id } });
                  await cartMaterialsModel.destroy({ where: { cart_id: cart.id } });
                }
              }
            }


          }
        }

        /**
         * END - Remove from stock table
         */

        //update purchase total payable price
        let total_payable = parseFloat(purchase.total_payable);
        let return_amount = parseFloat(data.return_amount);
        total_payable = priceFormat(total_payable - return_amount);
        let paid_amount = parseFloat(purchase.paid_amount);
        let due_amount = priceFormat(total_payable - paid_amount, true);
        let advance_amount = due_amount < 0 ? priceFormat(0 - due_amount) : 0;
        due_amount = due_amount < 0 ? 0 : due_amount;
        if (paid_amount > total_payable) {
          paid_amount = total_payable;
        }
        let total_return_amt = priceFormat(priceFormat(purchase.return_amount) + return_amount);
        // if (!purchase.is_assigned && advance_amount > 0 && isEmpty(purchase.sale_id)) {
        //   let supplier = await UserModel.findByPk(purchase.supplier_id);
        //   if (supplier) {
        //     advance_amount = priceFormat(advance_amount + supplier.advance_amount);
        //     await UserModel.update({ advance_amount: advance_amount }, { where: { id: purchase.supplier_id }, transaction: t });
        //   }
        // }

        await PurchaseModel.update({
          return_amount: total_return_amt,
          total_payable: total_payable,
          due_amount: due_amount
        }, { where: { id: req.params.id }, transaction: t });

      }

      if (returnObj.status == "success" && priceFormat(data.return_amount_from_wallet) > 0) {
        if (data.payment_type == "return") {
          let payment2 = await paymentModel.create({
            user_id: purchase.supplier_id,
            payment_by: userID,
            table_type: "purchase",
            table_id: purchase.id,
            amount: data.return_amount_from_wallet,
            payment_mode: data.return_payment_mode,
            remaining_balance: 0,
            status: "success",
            payment_date: data.return_date ? moment(data.return_date, "MM/DD/YYYY").format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
            payment_belongs: userID,
            type: 'credit',
            purpose: 'return purchase',
            can_accept: false,
            is_advance: false
          });
          await updateWalletRemainingBalance(userID, payment2.id);
        } else {
          await updateAdvanceAmount(userID, purchase.supplier_id, data.return_amount_from_wallet, true);
        }
      }

      res.send(formatResponse([], "Returned successfully!"));
    });

  } catch (error) {
    addLog('err: ' + error.toString())
    console.log(error)
    return res.status(errorCodes.default).send(formatErrorResponse(errorCodes.defaultErrorMsg));
  }

}


/**
 * Purchase Product List
 * 
 * @param {*} req
 * @param {*} res 
 */
exports.purchaseProducts = async (req, res) => {
  let purchaseProductsRes = await getPurchaseProducts(req.query);
  res.send(formatResponse(purchaseProductsRes));
}

const formatStockMaterials = (stockMaterials) => {
  let materialItem = [];
  for (let item of stockMaterials) {
    materialItem.push({
      material_id: item.material_id,
      weight: item.weight,
      quantity: item.quantity,
      unit_id: item.unit_id,
      purity_id: item.purity_id
    });
  }
  return materialItem;
}