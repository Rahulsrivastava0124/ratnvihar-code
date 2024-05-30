const config = require("@config/auth.config");
const { errorCodes, formatErrorResponse, formatResponse } = require("@utils/response.config");
const db = require("@models");
const moment = require('moment');
const { base64FileUpload, removeFile } = require('@helpers/upload');
const { isEmpty, getDateFromToWhere, priceFormat, getFileAbsulatePath, addLog, displayAmount, weightFormat, convertUnitToGram, arrayColumn, removeBlankZero } = require("@helpers/helper");
const { updateOrCreate, removeMaterialFromStock, getWorkingUserID, isSuperAdmin, getSuperAdminId, updateWalletRemainingBalance, isDistributor, isSalesExecutive, sendNotification, isRetailer, getRoleId, insertVisit, isManager, getDistributorAdmin, isAdmin, getWalletBalance, getOwnUserSaleProducts } = require("@library/common");
const { getPaginationOptions } = require('@helpers/paginator')
const { SaleCollection } = require("@resources/superadmin/SaleCollection");
const { SaleListCollection } = require("@resources/superadmin/SaleListCollection");
const { SaleEditCollection } = require("@resources/superadmin/SaleEditCollection");
const { PaymentCollection } = require("@resources/superadmin/PaymentCollection");
const { Op } = require("sequelize");
const sequelize = db.sequelize;
const ProductModel = db.products;
const UserModel = db.users;
const CategoryModel = db.categories;
const PurityModel = db.purities;
const UnitModel = db.units;
const MaterialModel = db.materials;
const SizeModel = db.sizes;
const StockModel = db.stocks;
const StockMaterialModel = db.stock_materials;
const SaleModel = db.sales;
const SaleProductModel = db.sale_products;
const SaleProductMaterialModel = db.sale_product_materials;
const stockHistoryModel = db.stock_raw_material_histories;
const paymentModel = db.payments;
const orderModel = db.orders;
const cartModel = db.carts;
const RoleModel = db.roles;
const cartMaterialsModel = db.cart_materials;
const PaymentModel = db.payments;
const PurchaseModel = db.purchases;
const PurchaseProductModel = db.purchase_products;
const PurchaseProductMaterialModel = db.purchase_product_materials;
const UserToUserModel = db.user_to_users;
const ReturnModel = db.returns;
const ReturnProductModel = db.return_products;
const ReturnProductMaterialModel = db.return_product_materials;
const NoticationModel = db.notifiactions;
const fs = require('fs');
const puppeteer = require('puppeteer');
const { updateAdvanceAmount } = require("../../library/common");
const orderProductModel = db.order_products;

/**
 * Retrieve all sales
 * 
 * @param req
 * @param res
 */
exports.index = async (req, res) => {
  let { page, limit, user_id, search, date_from, date_to, status, is_assigned, is_approval, own_sale } = req.query;
  is_assigned = is_assigned === undefined ? false : true;
  is_approval = is_approval === undefined ? false : true;
  let userID = isManager(req) ? req.userId : await getWorkingUserID(req);
  let conditions = { is_assigned: is_assigned, is_approval: is_approval }
  if (status !== undefined && status != "") {
    conditions.is_approved = status;
  }
  if (!isEmpty(user_id)) {
    conditions.user_id = user_id;
    if (isSuperAdmin(req) && isAdmin(req) && isDistributor(req)) {
      conditions.sale_by = userID
    }
  } else {
    if (isSalesExecutive(req) && !isEmpty(search)) {

    } else {
      conditions.sale_by = userID;
    }

  }
  if (!isEmpty(search)) {
    conditions.invoice_number = { [Op.like]: `%${search}%` };
  }

  if (own_sale == 1) {
    let ownUsers = await UserModel.findAll({ attributes: ['id'], where: { own: true } });
    let ownUserIds = arrayColumn(ownUsers, 'id');
    ownUserIds.push(userID);
    conditions.sale_by = { [Op.in]: ownUserIds };
  }

  conditions = { ...conditions, ...getDateFromToWhere(date_from, date_to, 'invoice_date') }

  const paginatorOptions = getPaginationOptions(page, limit);
  SaleModel.findAndCountAll({
    order: [['id', 'DESC']],
    where: conditions,
    offset: paginatorOptions.offset,
    limit: paginatorOptions.limit,
    include: [
      {
        model: UserModel,
        as: 'user',
      },
      {
        model: UserModel,
        as: 'saleBy'
      }
    ],
    distinct: true
  }).then(async (data) => {
    let result = {
      items: await SaleListCollection(data.rows, userID),
      total: data.count,
    }
    res.send(formatResponse(result, 'Sales List'));
  })
    .catch(err => {
      res.status(errorCodes.default).send(formatErrorResponse(err));
    });
};


/**
 * Store sale
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.store = async (req, res) => {
  let data = req.body;

  if (!isEmpty(data.invoice_number)) {
    let sdata = await SaleModel.findOne({ where: { invoice_number: data.invoice_number } });
    if (sdata) {
      return res.status(errorCodes.default).send(formatErrorResponse('Invoice number is exists.'));
    }
  }

  if (!data.is_assigned && data.settlement_date && (isDistributor(req) || isSalesExecutive(req))) {
    let invObj = moment(data.invoice_date, "MM/DD/YYYY");
    let sttlObj = moment(data.settlement_date);
    if (sttlObj.diff(invObj, 'days') > 30) {
      return res.status(errorCodes.default).send(formatErrorResponse('Settlement date should be maximum 30 days.'));
    }
  }

  let userID = isManager(req) ? req.userId : await getWorkingUserID(req);
  // if (data.advance_amount > 0 && data.due_amount == 0) {
  //   let walletBalance = await getWalletBalance(userID, data.payment_mode);
  //   if (walletBalance < priceFormat(data.total_payable)) {
  //     return res.status(errorCodes.default).send(formatErrorResponse("Insufficient wallet balance for adjust sale amount from advance."));
  //   }
  // }

  try {
    //const trans = await sequelize.transaction(async (t) => {
    //upload banner
    let image = null;
    let uploadResult = base64FileUpload(data.image_file, 'sales');
    if (uploadResult) {
      image = uploadResult.path;
    }
    //insert into sale table
    let invoice_number = data.invoice_number || null;
    let req_data = JSON.stringify(data);
    req_data = new Buffer.from(req_data).toString("base64");
    let req_data_for_purchase = data;
    let status = "due", paid_amount = 0, due_amount = 0;
    if (data.payment_mode != "cheque") {
      status = (priceFormat(data.paid_amount) >= priceFormat(data.total_payable)) ? 'paid' : 'due';
      paid_amount = data.paid_amount ? priceFormat(data.paid_amount) : 0;
      due_amount = priceFormat(data.due_amount);
    } else {
      due_amount = priceFormat(data.total_payable);
    }
    let is_approved = 0;
    if (isDistributor(req) || isSalesExecutive(req)) {
      let userObj = await UserModel.findByPk(data.user_id);
      if (userObj && userObj.role_id == 5) {
        is_approved = 1;
      }
    }
    if (data.order_from_customer) {
      is_approved = 1;
    }

    if (data.pay_from_advance) {
      if (parseFloat(data.total_payable) >= parseFloat(data.advance_amount)) {
        paid_amount = priceFormat(paid_amount + parseFloat(data.advance_amount));
      } else {
        paid_amount = parseFloat(data.total_payable);
      }
    }

    let saleObj = {
      user_id: data.user_id,
      is_assigned: data.is_assigned,
      order_id: data.order_id || null,
      sale_by: userID,
      invoice_number: invoice_number,
      invoice_date: moment(data.invoice_date, "MM/DD/YYYY").format('YYYY-MM-DD'),
      notes: data.notes,
      payment_mode: data.payment_mode,
      transaction_no: data.transaction_no,
      total_amount: priceFormat(data.total_amount),
      cgst_tax: priceFormat(data.cgst_tax),
      sgst_tax: priceFormat(data.sgst_tax),
      igst_tax: priceFormat(data.igst_tax),
      discount: priceFormat(data.discount),
      paid_amount: paid_amount,
      taxable_amount: priceFormat(data.taxable_amount),
      bill_amount: priceFormat(data.total_payable),
      total_payable: priceFormat(data.total_payable),
      due_amount: due_amount,
      due_date: data.due_date ? moment(data.due_date).format('YYYY-MM-DD') : null,
      settlement_date: data.settlement_date ? moment(data.settlement_date).format('YYYY-MM-DD') : null,
      product_discount: priceFormat(data.product_discount),
      total_tag_price: priceFormat(data.total_tag_price),
      is_approved: data.on_approval ? 3 : is_approved,
      is_approval: data.on_approval,
      req_data: req_data,
      status: status,
      image: image
    };
    let sale = await SaleModel.create(saleObj);

    let purchase = null;
    //if(!isSuperAdmin(req)){
    if (!data.on_approval && !data.order_from_customer) {
      let purchaseObj = {
        supplier_id: userID,
        is_assigned: data.is_assigned,
        sale_id: sale.id,
        user_id: data.user_id,
        invoice_number: invoice_number,
        invoice_date: moment(data.invoice_date, "MM/DD/YYYY").format('YYYY-MM-DD'),
        notes: data.notes,
        payment_mode: data.payment_mode,
        transaction_no: data.transaction_no,
        total_amount: priceFormat(data.total_amount),
        tax: priceFormat(data.cgst_tax + data.sgst_tax + data.igst_tax),
        discount: priceFormat(data.discount),
        paid_amount: paid_amount,
        taxable_amount: priceFormat(data.taxable_amount),
        bill_amount: priceFormat(data.total_payable),
        total_payable: priceFormat(data.total_payable),
        due_amount: due_amount,
        due_date: data.due_date ? moment(data.due_date).format('YYYY-MM-DD') : null,
        status: status,
        is_approved: is_approved,
        image: image
      };
      purchase = await PurchaseModel.create(purchaseObj);
    }
    //}

    //insert into sale product table
    let saleProductIds = [];
    for (let i = 0; i < data.products.length; i++) {
      let thisItem = data.products[i];
      let thisObj = {
        sale_id: sale.id,
        stock_id: thisItem.stock_id,
        product_id: thisItem.product_id,
        size_id: thisItem.size_id || null,
        certificate_no: thisItem.certificate_no,
        total_weight: weightFormat(thisItem.total_weight),
        sub_price: priceFormat(thisItem.sub_price),
        making_charge: priceFormat(thisItem.making_charge),
        rep: priceFormat(thisItem.rep),
        tax: priceFormat(thisItem.total_tax),
        cgst_tax: priceFormat(thisItem.cgst_tax),
        sgst_tax: priceFormat(thisItem.sgst_tax),
        igst_tax: priceFormat(thisItem.igst_tax),
        total: priceFormat(thisItem.total),
        total_discount: priceFormat(thisItem.total_discount),
        rate: priceFormat(thisItem.rate),
        making_charge_discount: priceFormat(thisItem.making_charge_discount_percent),
        making_charge_discount_amount: priceFormat(thisItem.making_charge_discount_amount),
        tax_info: thisItem.tax_info ? JSON.stringify(thisItem.tax_info) : null,
        making_charge_discount_percent: thisItem.making_charge_discount_percent,
        max_making_charge_discount_percent: thisItem.max_making_charge_discount_percent,
        sub_cat_making_charge: thisItem.sub_cat_making_charge,
        sub_cat_making_charge_type: thisItem.sub_cat_making_charge_type,
        order_product_id: thisItem.order_product_id ? thisItem.order_product_id : null
      }
      let saleProduct = await SaleProductModel.create(thisObj);
      let product = await ProductModel.findByPk(thisItem.product_id);
      let sale_product_id = null;
      if ('sale_product_id' in thisItem && !isEmpty(thisItem.sale_product_id)) {
        sale_product_id = thisItem.sale_product_id;
        saleProductIds.push(thisItem.sale_product_id);
      }

      //insert into order product
      if (!isEmpty(thisObj.order_product_id)) {
        await orderProductModel.update({
          total_weight: weightFormat(thisItem.total_weight),
          rate: priceFormat(thisItem.total),
          making_charge: priceFormat(thisItem.making_charge),
          making_charge_discount_amount: priceFormat(thisItem.making_charge_discount_amount),
          making_charge_discount_percent: thisItem.making_charge_discount_percent,
          total_discount: priceFormat(thisItem.total_discount),
          sub_price: priceFormat(thisItem.sub_price),
          total: priceFormat(thisItem.total),
          price_without_tax: priceFormat(priceFormat(thisObj.total) - priceFormat(thisObj.total_tax)),
          igst: priceFormat(thisItem.igst_tax),
          cgst: priceFormat(thisItem.cgst_tax),
          sgst: priceFormat(thisItem.sgst_tax),
        }, { where: { id: thisObj.order_product_id } })
      }

      let purchaseProduct = null;
      //if(!isSuperAdmin(req)){
      if (purchase) {
        let thisObj2 = {
          purchase_id: purchase.id,
          product_id: thisItem.product_id,
          size_id: thisItem.size_id || null,
          certificate_no: thisItem.certificate_no,
          total_weight: weightFormat(thisItem.total_weight),
          sub_price: priceFormat(thisItem.sub_price),
          making_charge: priceFormat(thisItem.making_charge),
          rep: priceFormat(thisItem.rep),
          tax: priceFormat(thisItem.total_tax),
          total: priceFormat(thisItem.total),
          total_discount: priceFormat(thisItem.total_discount),
        }
        purchaseProduct = await PurchaseProductModel.create(thisObj2);
        req_data_for_purchase.products[i].id = purchaseProduct.id;
      }
      //}

      //remove stock
      if (isEmpty(sale_product_id) && product.type != "material") {
        await StockModel.destroy({ where: { id: thisItem.stock_id } });
      }

      //insert into sale product materials
      let batch_id = null;
      for (let x = 0; x < thisItem.materials.length; x++) {
        let thisMObj = {
          sale_id: sale.id,
          sale_product_id: saleProduct.id,
          material_id: thisItem.materials[x].material_id,
          weight: weightFormat(thisItem.materials[x].weight),
          quantity: thisItem.materials[x].quantity || 0,
          purity_id: thisItem.materials[x].purity_id,
          unit_id: thisItem.materials[x].unit_id,
          rate: thisItem.materials[x].rate,
          amount: thisItem.materials[x].amount,
          discount_amount: thisItem.materials[x].discount_amount,
          discount_percent: thisItem.materials[x].discount_percent || 0,
          max_discount_percent: thisItem.materials[x].max_discount_percent,
          total_gram: thisItem.materials[x].total_gram,
          per_gram_price: thisItem.materials[x].per_gram_price,
        }
        await SaleProductMaterialModel.create(thisMObj);

        //if(!isSuperAdmin(req)){
        if (purchase) {
          let thisMObj2 = {
            purchase_id: purchase.id,
            purchase_product_id: purchaseProduct.id,
            material_id: thisItem.materials[x].material_id,
            weight: weightFormat(thisItem.materials[x].weight),
            quantity: thisItem.materials[x].quantity || 0,
            purity_id: thisItem.materials[x].purity_id,
            unit_id: thisItem.materials[x].unit_id,
            rate: thisItem.materials[x].rate,
            amount: thisItem.materials[x].amount,
            discount_amount: thisItem.materials[x].discount_amount,
          }
          await PurchaseProductMaterialModel.create(thisMObj2);
        }
        //}

        /**
         * remove from stock materials
         */
        if (isEmpty(sale_product_id)) {
          if (product.type == "material") {
            let stockMaterial = await StockMaterialModel.findOne({ where: { material_id: thisItem.materials[x].material_id, stock_id: thisItem.stock_id } });
            if (stockMaterial) {
              await StockMaterialModel.update({
                weight: weightFormat(parseFloat(stockMaterial.weight) - weightFormat(thisItem.materials[x].weight)),
                quantity: (parseFloat(stockMaterial.quantity) - parseFloat(thisItem.materials[x].quantity))
              }, { where: { id: stockMaterial.id } });

              if ((parseFloat(stockMaterial.weight) - parseFloat(thisItem.materials[x].weight)) <= 0) {
                await StockModel.destroy({ where: { id: thisItem.stock_id } });
              } else {
                let stock = await StockModel.findOne({ where: { id: thisItem.stock_id } });
                if (stock) {
                  await StockModel.update({
                    quantity: (parseFloat(stockMaterial.quantity) - parseFloat(thisItem.materials[x].quantity)),
                    total_weight: (parseFloat(stock.total_weight) - weightFormat(thisItem.total_weight)),
                  }, { where: { id: thisItem.stock_id } });
                }
              }

            }

          }
        }

      }

      /**
      * START - add to admin stock
      */
      /*let stock = null;
      if(product.type == "material"){
        let quantity = 0;
        for(let x = 0; x < thisItem.materials.length; x++){
          quantity += thisItem.materials[x].quantity ? parseInt(thisItem.materials[x].quantity) : 0;
        }
        let result = await updateOrCreate(StockModel, {product_id: thisItem.product_id, user_id: data.user_id}, {product_id: thisItem.product_id, quantity: quantity, user_id: data.user_id, total_weight: thisItem.total_weight}, null, ['quantity', 'total_weight']);
        stock = result.item;
      }else{
        stock = await StockModel.create({
          product_id: thisItem.product_id,
          size_id: thisItem.size_id || null,
          certificate_no: thisItem.certificate_no,
          quantity: 1,
          user_id: data.user_id,
          sale_id: sale.id,
          total_weight: thisItem.total_weight
        });
      }*/

      //insert into stock materials
      let batch_id2 = null;
      /**
      * add to stock materials
      */
      /*for(let x = 0; x < thisItem.materials.length; x++){
        if(product.type == "material"){
          let stockMaterial = await StockMaterialModel.findOne({where: {stock_id: stock.id, material_id: thisItem.materials[x].material_id}});
          if(stockMaterial){
            await StockMaterialModel.update({
              weight: weightFormat(stockMaterial.weight + weightFormat(thisItem.materials[x].weight)),
              quantity: (stockMaterial.quantity + thisItem.materials[x].quantity),
              purity_id: thisItem.materials[x].purity_id,
              unit_id: thisItem.materials[x].unit_id,
              category_id: product.category_id
            },{where: {id: stockMaterial.id}});
          }else{
            await StockMaterialModel.create({
              stock_id: stock.id, 
              material_id: thisItem.materials[x].material_id,
              weight: weightFormat(thisItem.materials[x].weight),
              quantity: thisItem.materials[x].quantity,
              purity_id: thisItem.materials[x].purity_id,
              unit_id: thisItem.materials[x].unit_id,
              category_id: product.category_id
            });
          }
        }else{
          await StockMaterialModel.create({
            stock_id: stock.id, 
            material_id: thisItem.materials[x].material_id,
            weight: weightFormat(thisItem.materials[x].weight),
            quantity: thisItem.materials[x].quantity,
            purity_id: thisItem.materials[x].purity_id,
            unit_id: thisItem.materials[x].unit_id,
            category_id: product.category_id
          });
        }

      }*/

      /**
      * END - add to admin stock
      */


    }

    //update invoice no if not sent
    let purchase_invoice_number = invoice_number;
    if (isEmpty(invoice_number)) {
      invoice_number = 'RV-S-' + sale.id;
      purchase_invoice_number = invoice_number; //'RV-P-' + purchase.id;
      await SaleModel.update({
        invoice_number: invoice_number
      }, { where: { id: sale.id } });
    }

    if (purchase) {
      req_data_for_purchase = JSON.stringify(req_data_for_purchase);
      req_data_for_purchase = new Buffer.from(req_data_for_purchase).toString("base64");
      await PurchaseModel.update({
        invoice_number: purchase_invoice_number,
        req_data: req_data_for_purchase
      }, { where: { id: purchase.id } });
    }

    //insert into payment table
    if (!data.is_assigned && priceFormat(data.paid_amount) > 0) {
      let amount = priceFormat(data.paid_amount);
      if (!isEmpty(data.on_approval_id) && parseInt(data.on_approval_id) > 0) {
        let approvalSale = await SaleModel.findByPk(data.on_approval_id);
        if (approvalSale && !isEmpty(approvalSale.paid_amount)) {
          amount = amount >= parseFloat(approvalSale.paid_amount) ? amount - parseFloat(approvalSale.paid_amount) : amount;
        }
      }

      if (amount > 0) {
        let payment = await paymentModel.create({
          payment_mode: data.payment_mode,
          amount: amount,
          user_id: data.user_id,
          payment_by: req.userId,
          payment_date: moment().format('YYYY-MM-DD'),
          txn_id: data.transaction_no,
          cheque_no: data.cheque_no,
          status: data.payment_mode == 'cheque' ? 'pending' : 'success',
          type: 'credit',
          table_type: 'sale',
          table_id: sale.id,
          payment_belongs: userID,
          purpose: sale.is_approval ? 'sale on approval' : 'sale',
          can_accept: true
        });

        await updateWalletRemainingBalance(userID, payment.id);

        //debit from down user
        let payment2 = await paymentModel.create({
          parent_id: payment.id,
          payment_mode: data.payment_mode,
          amount: priceFormat(data.paid_amount),
          user_id: userID,
          payment_by: req.userId,
          payment_date: moment().format('YYYY-MM-DD'),
          txn_id: data.transaction_no,
          cheque_no: data.cheque_no,
          status: 'success',
          type: 'debit',
          table_type: 'purchase',
          table_id: purchase ? purchase.id : sale.id,
          payment_belongs: data.user_id,
          purpose: sale.is_approval ? 'purchase on approval' : 'purchase',
          can_accept: false
        });

        await updateWalletRemainingBalance(data.user_id, payment2.id);

      }
    }

    //if paid from advance amount
    if (parseFloat(data.advance_amount) > 0 && data.pay_from_advance) {
      let thisAmnt = (parseFloat(data.total_payable) >= parseFloat(data.advance_amount)) ? data.advance_amount : priceFormat(parseFloat(data.advance_amount) - parseFloat(data.total_payable));
      let payment = await paymentModel.create({
        payment_mode: 'advance',
        amount: priceFormat(thisAmnt),
        user_id: data.user_id,
        payment_by: req.userId,
        payment_date: moment().format('YYYY-MM-DD'),
        // txn_id: data.transaction_no,
        // cheque_no: data.cheque_no,
        status: 'success',
        type: 'advance_adjust',
        table_type: 'sale',
        table_id: sale.id,
        payment_belongs: userID,
        purpose: 'sale adjust from advance',
        can_accept: true,
        is_advance: true
      });

      await updateWalletRemainingBalance(userID, payment.id);

      await updateAdvanceAmount(data.user_id, userID, thisAmnt, false)
    }

    //complete order
    if (!isEmpty(data.order_id) && !data.order_from_customer) {
      await orderModel.update({
        status: 'delivered'
      }, { where: { id: data.order_id } });
    }

    if (!isEmpty(data.order_id)){
      await orderModel.update({
        paid_amount: sale.paid_amount,
        sub_total: sale.total_amount,
        total_amount: sale.total_payable
      }, { where: { id: data.order_id } })
    }

    let carts = await cartModel.findAll({ where: { user_id: userID } });
    let cartIds = arrayColumn(carts, 'id');
    await cartMaterialsModel.destroy({ where: { cart_id: { [Op.in]: cartIds } } });
    await cartModel.destroy({ where: { user_id: userID } });

    /**
     * Add Retailer relationship with se
     */
    if (isSalesExecutive(req)) {
      let user = await UserModel.findByPk(data.user_id);
      if (user && isRetailer(user.role_id)) {
        let roleId = getRoleId('retailer');
        await UserToUserModel.create({
          user_id: req.userId,
          to_user_id: data.user_id,
          to_role_id: roleId
        });
        await insertVisit({ user_id: req.userId, visit_user_id: data.user_id });
      }
    }

    //restore into stock
    if (saleProductIds.length > 0 && !isEmpty(data.on_approval_id) && parseInt(data.on_approval_id) > 0) {
      let saleApproval = await SaleModel.findOne({
        where: { id: data.on_approval_id },
        include: [
          {
            model: SaleProductModel,
            as: 'saleProducts',
            separate: true,
            include: [
              {
                model: SaleProductMaterialModel,
                as: 'saleMaterials',
                separate: true,
                include: [
                  {
                    model: UnitModel,
                    as: 'unit'
                  }
                ]
              }
            ]
          }
        ]
      });
      if (saleApproval) {
        await SaleModel.update({
          is_approved: 4,
          accept_declined_at: moment().format('YYYY-MM-DD HH:mm:ss')
        }, { where: { id: saleApproval.id } });

        let parentUserID = userID; //isSuperAdmin(req) ? null : req.userId;
        for (let i = 0; i < saleApproval.saleProducts.length; i++) {
          let thisItem = saleApproval.saleProducts[i];
          if (saleProductIds.includes(thisItem.id)) {
            continue;
          }

          let product = await ProductModel.findByPk(thisItem.product_id);
          let stock = null;
          if (product.type == "material") {
            let quantity = 0;
            for (let x = 0; x < thisItem.saleMaterials.length; x++) {
              quantity += thisItem.saleMaterials[x].quantity ? parseInt(thisItem.saleMaterials[x].quantity) : 0;
            }
            let result = await updateOrCreate(StockModel, {
              product_id: thisItem.product_id,
              user_id: parentUserID,
              purity_id: thisItem.saleMaterials[0].purity_id,
            }, {
              product_id: thisItem.product_id,
              quantity: quantity,
              total_weight: thisItem.total_weight,
              user_id: parentUserID,
              purity_id: thisItem.saleMaterials[0].purity_id,
            }, null, ['quantity', 'total_weight']);
            stock = result.item;
          } else {
            stock = await StockModel.create({
              product_id: thisItem.product_id,
              size_id: thisItem.size_id || null,
              certificate_no: thisItem.certificate_no,
              quantity: 1,
              total_weight: thisItem.total_weight,
              user_id: parentUserID
            });
          }

          for (let x = 0; x < thisItem.saleMaterials.length; x++) {
            let saleMaterial = thisItem.saleMaterials[x];
            /**
             * add to stock materials
             */
            let weight_in_gram = convertUnitToGram(saleMaterial.unit.name, saleMaterial.weight);
            if (product.type == "material") {
              let stockMaterial = await StockMaterialModel.findOne({ where: { stock_id: stock.id, material_id: saleMaterial.material_id } });
              if (stockMaterial) {
                let thisquantity = saleMaterial.quantity ? (parseInt(stockMaterial.quantity) + parseInt(saleMaterial.quantity)) : stockMaterial.quantity;
                await StockMaterialModel.update({
                  weight: weightFormat(parseFloat(stockMaterial.weight) + weightFormat(saleMaterial.weight)),
                  weight_in_gram: weightFormat(parseFloat(stockMaterial.weight_in_gram) + weightFormat(weight_in_gram)),
                  quantity: thisquantity,
                  purity_id: saleMaterial.purity_id,
                  unit_id: saleMaterial.unit_id,
                  category_id: product.category_id
                }, { where: { id: stockMaterial.id } });
              } else {
                await StockMaterialModel.create({
                  stock_id: stock.id,
                  material_id: saleMaterial.material_id,
                  weight: weightFormat(saleMaterial.weight),
                  weight_in_gram: weightFormat(weight_in_gram),
                  quantity: saleMaterial.quantity || 0,
                  purity_id: saleMaterial.purity_id,
                  unit_id: saleMaterial.unit_id,
                  category_id: product.category_id
                });
              }
            } else {
              await StockMaterialModel.create({
                stock_id: stock.id,
                material_id: saleMaterial.material_id,
                weight: weightFormat(saleMaterial.weight),
                weight_in_gram: weightFormat(weight_in_gram),
                quantity: saleMaterial.quantity || 0,
                purity_id: saleMaterial.purity_id,
                unit_id: saleMaterial.unit_id,
                category_id: product.category_id
              });
            }
          }
        }
      }
    }

    //send notification
    if (purchase) {
      sendNotification('sale', req, { sale: sale, purchase: purchase });
    }

    res.send(formatResponse([], "Sale successfully!"));
    //});
  } catch (error) {
    addLog("error: " + error.toString())
    return res.status(errorCodes.default).send(formatErrorResponse('Sale does not success due to some error'));
  }

};


/**
 * Status Change
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.statuschange = async (req, res) => {
  let data = req.body;
  let userID = isManager(req) ? req.userId : await getWorkingUserID(req);
  let sale = await SaleModel.findOne({
    where: { id: req.params.id, sale_by: userID },
    include: [
      {
        model: SaleProductModel,
        as: 'saleProducts',
        separate: true,
        include: [
          {
            model: SaleProductMaterialModel,
            as: 'saleMaterials',
            separate: true,
            include: [
              {
                model: UnitModel,
                as: 'unit'
              }
            ]
          }
        ]
      }
    ]
  });
  if (!sale) {
    return res.status(errorCodes.default).send(formatErrorResponse('Sale not found'));
  }

  let return_payment_mode = data.return_payment_mode ? data.return_payment_mode : "cash";
  if (data.approve_status == 2 && data.decline_type == "return") {
    let paidAmnt = parseFloat(sale.paid_amount);
    let payment = await paymentModel.findOne({ where: { table_type: "sale", table_id: sale.id } });
    if (payment) {
      if (payment.payment_mode == "cheque" && payment.status == "pending") {
        paidAmnt = priceFormat(paidAmnt - parseFloat(payment.amount));
      }
    }
    if (paidAmnt > 0) {
      let walletBalance = await getWalletBalance(userID, return_payment_mode);
      if (walletBalance < paidAmnt) {
        return res.status(errorCodes.default).send(formatErrorResponse("Insufficient wallet balance."));
      }
    }
  }

  try {

    if (data.approve_status != 4) {
      await SaleModel.update({
        is_approved: data.approve_status,
        accept_declined_at: moment().format('YYYY-MM-DD HH:mm:ss')
      }, { where: { id: sale.id } });
    }

    if (data.approve_status == 2) {
      if (data.decline_type == "return") {
        let paidAmnt = parseFloat(sale.paid_amount);
        let payment = await paymentModel.findOne({ where: { table_type: "sale", table_id: sale.id } });
        if (payment) {
          if (payment.payment_mode == "cheque" && payment.status == "pending") {
            await paymentModel.destroy({ where: { id: payment.id } });
            await paymentModel.destroy({ where: { table_type: 'purchase', table_id: sale.id } });
            paidAmnt = priceFormat(paidAmnt - parseFloat(payment.amount));
          }
        }
        if (paidAmnt > 0) {
          let payment2 = await paymentModel.create({
            payment_mode: return_payment_mode,
            amount: paidAmnt,
            user_id: sale.user_id,
            payment_by: userID,
            payment_date: moment().format('YYYY-MM-DD'),
            //txn_id: payment.txn_id,
            //cheque_no: payment.cheque_no,
            status: 'success',
            type: 'debit',
            table_type: 'purchase',
            payment_belongs: userID,
            purpose: sale.is_approval == 1 ? 'sale on apporval refund' : 'sale refund'
          });

          await updateWalletRemainingBalance(userID, payment2.id);

          let payment3 = await paymentModel.create({
            payment_mode: return_payment_mode,
            amount: paidAmnt,
            user_id: userID,
            payment_by: userID,
            payment_date: moment().format('YYYY-MM-DD'),
            //txn_id: payment.txn_id,
            //cheque_no: payment.cheque_no,
            status: 'success',
            type: 'credit',
            table_type: 'purchase',
            payment_belongs: sale.user_id,
            purpose: 'purchase refund'
          });

          await updateWalletRemainingBalance(sale.user_id, payment3.id);
        }
      } else if (data.decline_type == "advance") {
        let paidAmnt = parseFloat(sale.paid_amount);
        let payment = await paymentModel.findOne({ where: { table_type: "sale", table_id: sale.id } });
        if (payment && payment.status == "pending") {
          paidAmnt = priceFormat(paidAmnt - parseFloat(payment.amount));
        }
        await updateAdvanceAmount(sale.user_id, sale.sale_by, paidAmnt, true);
      }

      //restore stock
      let parentUserID = userID; //isSuperAdmin(req) ? null : req.userId;
      for (let i = 0; i < sale.saleProducts.length; i++) {
        let thisItem = sale.saleProducts[i];

        let product = await ProductModel.findByPk(thisItem.product_id);
        let stock = null;
        if (product.type == "material") {
          let quantity = 0;
          for (let x = 0; x < thisItem.saleMaterials.length; x++) {
            quantity += thisItem.saleMaterials[x].quantity ? parseInt(thisItem.saleMaterials[x].quantity) : 0;
          }
          let result = await updateOrCreate(StockModel, {
            product_id: thisItem.product_id,
            user_id: parentUserID,
            purity_id: thisItem.saleMaterials[0].purity_id,
          }, {
            product_id: thisItem.product_id,
            quantity: quantity,
            total_weight: thisItem.total_weight,
            user_id: parentUserID,
            purity_id: thisItem.saleMaterials[0].purity_id,
          }, null, ['quantity', 'total_weight']);
          stock = result.item;
        } else {
          stock = await StockModel.create({
            product_id: thisItem.product_id,
            size_id: thisItem.size_id || null,
            certificate_no: thisItem.certificate_no,
            quantity: 1,
            total_weight: thisItem.total_weight,
            user_id: parentUserID
          });
        }

        for (let x = 0; x < thisItem.saleMaterials.length; x++) {
          let saleMaterial = thisItem.saleMaterials[x];
          /**
           * add to stock materials
           */
          let weight_in_gram = convertUnitToGram(saleMaterial.unit.name, saleMaterial.weight);
          if (product.type == "material") {
            let stockMaterial = await StockMaterialModel.findOne({ where: { stock_id: stock.id, material_id: saleMaterial.material_id } });
            if (stockMaterial) {
              let thisquantity = saleMaterial.quantity ? (parseInt(stockMaterial.quantity) + parseInt(saleMaterial.quantity)) : stockMaterial.quantity;
              await StockMaterialModel.update({
                weight: weightFormat(parseFloat(stockMaterial.weight) + weightFormat(saleMaterial.weight)),
                weight_in_gram: weightFormat(parseFloat(stockMaterial.weight_in_gram) + weightFormat(weight_in_gram)),
                quantity: thisquantity,
                purity_id: saleMaterial.purity_id,
                unit_id: saleMaterial.unit_id,
                category_id: product.category_id
              }, { where: { id: stockMaterial.id } });
            } else {
              await StockMaterialModel.create({
                stock_id: stock.id,
                material_id: saleMaterial.material_id,
                weight: weightFormat(saleMaterial.weight),
                weight_in_gram: weightFormat(weight_in_gram),
                quantity: saleMaterial.quantity || 0,
                purity_id: saleMaterial.purity_id,
                unit_id: saleMaterial.unit_id,
                category_id: product.category_id
              });
            }
          } else {
            await StockMaterialModel.create({
              stock_id: stock.id,
              material_id: saleMaterial.material_id,
              weight: weightFormat(saleMaterial.weight),
              weight_in_gram: weightFormat(weight_in_gram),
              quantity: saleMaterial.quantity || 0,
              purity_id: saleMaterial.purity_id,
              unit_id: saleMaterial.unit_id,
              category_id: product.category_id
            });
          }
        }
      }

    } else if (data.approve_status == 4) {
      /**
       * Clear cart data
       */
      let carts = await cartModel.findAll({ where: { user_id: userID } });
      let cartIds = arrayColumn(carts, 'id');
      await cartMaterialsModel.destroy({ where: { cart_id: { [Op.in]: cartIds } } });
      await cartModel.destroy({ where: { user_id: userID } });

      for (let item of sale.saleProducts) {
        let quantity = 1;
        if (item.product && item.product.type == "material") {
          quantity = item.saleMaterials[0].quantity;
        }
        let cart = await cartModel.create({
          user_id: userID,
          stock_id: null,
          product_id: item.product_id,
          size_id: item.size_id || null,
          quantity: quantity,
          total_weight: item.total_weight || null,
          certificate_no: item.certificate_no,
          sale_product_id: item.id,
          type: 'sale'
        });
        for (let x = 0; x < item.saleMaterials.length; x++) {
          let material = item.saleMaterials[x];
          await cartMaterialsModel.create({
            cart_id: cart.id,
            material_id: material.material_id,
            purity_id: material.purity_id,
            weight: material.weight,
            unit_id: material.unit_id,
            quantity: material.quantity
          });
        }
      }
    }

    res.send(formatResponse([], "Status Changed successfully!"));

  } catch (error) {
    return res.status(errorCodes.default).send(formatErrorResponse(error));
  }
};
/**
 * View Sale
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.view = async (req, res) => {
  let userID = isManager(req) ? req.userId : await getWorkingUserID(req);
  let sale = await SaleModel.findOne({
    where: { id: req.params.id /*, sale_by: userID*/ },
    include: [
      {
        model: SaleProductModel,
        as: 'saleProducts',
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
            model: SaleProductMaterialModel,
            as: 'saleMaterials',
            separate: true,
            include: [
              {
                model: MaterialModel,
                as: 'material'
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
        as: 'user',
      }
    ]
  });
  if (!sale) {
    return res.status(errorCodes.default).send(formatErrorResponse('Sale not found'));
  }
  res.send(formatResponse(SaleCollection(sale), "Sale details"));
};

/**
 * Edit Sale
 * 
 * @param {*} req
 * @param {*} res 
 */
exports.edit = async (req, res) => {
  let userID = await getWorkingUserID(req);
  let sale = await SaleModel.findOne({
    where: { id: req.params.id, sale_by: userID },
    include: [
      {
        model: SaleProductModel,
        as: 'saleProducts',
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
            model: SaleProductMaterialModel,
            as: 'saleMaterials',
            separate: true,
            include: [
              {
                model: MaterialModel,
                as: 'material'
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
        as: 'user',
        include: [
          {
            model: RoleModel,
            as: 'role'
          }
        ]
      }
    ]
  });
  if (!sale) {
    return res.status(errorCodes.default).send(formatErrorResponse('Sale not found'));
  }

  res.send(formatResponse(await SaleEditCollection(sale, req), "Purchase edit details"));

}


/**
 * Return sale
 * 
 * @param {*} req
 * @param {*} res 
 */
exports.returnSale = async (req, res) => {
  let sale = await SaleModel.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: SaleProductModel,
        as: 'saleProducts'
      }
    ]
  });
  if (!sale) {
    return res.status(errorCodes.default).send(formatErrorResponse('Sale not found'));
  }

  let data = req.body;
  let return_products = req.body.return_products;
  let return_data = req.body.return_data;
  let userID = isManager(req) ? req.userId : await getWorkingUserID(req);

  let is_return_stock = false;
  for (let i = 0; i < return_products.length; i++) {
    if (!return_products[i].is_return) {
      continue;
    }
    if (return_data.products[i].return_charge_percent > 0) {
      is_return_stock = true;
      break;
    }
  }
  let from_retailer_customer = false, show_superadmin = false;
  if (isSalesExecutive(req) || isDistributor(req)) {
    from_retailer_customer = true;
  } else {
    is_return_stock = false;
  }
  let return_status = 'pending';
  if (from_retailer_customer) {
    if (is_return_stock) {
      return_status = 'pending';
    } else {
      return_status = 'completed';
    }
  } else {
    return_status = 'pending';
  }

  //check has amount in wallet
  let return_amount_from_wallet = data.return_amount_from_wallet;
  if (data.payment_type == "return" && (!from_retailer_customer || (from_retailer_customer && return_status == 'completed'))) {
    let walletBalance = await getWalletBalance(userID, data.return_payment_mode);
    if (return_amount_from_wallet > 0 && walletBalance < return_amount_from_wallet) {
      return res.status(errorCodes.default).send(formatErrorResponse("Insufficient wallet balance."));
    }
  }

  try {
    const trans = await sequelize.transaction(async (t) => {

      let sale_products = sale.saleProducts;
      let req_data = JSON.stringify(data);
      req_data = new Buffer.from(req_data).toString("base64");

      let saleReturnObj = await ReturnModel.create({
        user_id: sale.user_id,
        seller_id: req.userId,
        table_id: sale.id,
        table_type: 'sales',
        notes: return_data.notes,
        payment_mode: return_data.payment_mode,
        txn_id: return_data.transaction_no,
        cheque_no: return_data.cheque_no,
        status: return_status,
        product_amount: data.product_amount,
        charge: data.return_charge,
        total_amount: data.return_amount,
        accepted_at: moment().format('YYYY-MM-DD'),
        return_date: data.return_date ? moment(data.return_date, "MM/DD/YYYY").format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
        req_data: req_data,
        show_superadmin: show_superadmin,
        from_retailer_customer: from_retailer_customer,
        return_amount_from_wallet: return_amount_from_wallet
      }, { transaction: t });

      /**
       * Return Products
       */
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

        /**
         * moved to stock
         */
        let stock_type = "product";
        if (return_data.products[i].return_charge_percent > 0) {
          stock_type = "return";
        }
        let quantity = 0, weight_in_gram = 0;
        for (let x = 0; x < return_data.products[i].materials.length; x++) {
          quantity += (return_data.products[i].product_type == 'material') ? parseFloat(return_data.products[i].materials[x].return_qty) : return_data.products[i].materials[x].quantity;
          let thisWeight = (return_data.products[i].product_type == 'material') ? parseFloat(return_data.products[i].materials[x].return_weight) : return_data.products[i].materials[x].weight;
          weight_in_gram += convertUnitToGram(return_data.products[i].materials[x].unit_name, thisWeight)
        }
        let stock = null;
        if (return_data.products[i].product_type == "material") {
          if(return_status == "completed"){
            let result = await updateOrCreate(StockModel,
              {
                user_id: req.userId,
                type: stock_type,
                product_id: return_data.products[i].product_id,
                purity_id: return_data.products[i].materials[0].purity_id,
              }
              , {
                quantity: quantity,
                total_weight: weight_in_gram,
                user_id: req.userId,
                type: stock_type,
                product_id: return_data.products[i].product_id,
                purity_id: return_data.products[i].materials[0].purity_id,
              }, t, ['quantity', 'total_weight']);
            stock = result.item;
          }else{
            stock = await StockModel.create({
              product_id: return_data.products[i].product_id,
              quantity: quantity,
              total_weight: weight_in_gram,
              user_id: req.userId,
              type: stock_type,
              return_id: saleReturnObj.id,
              purity_id: return_data.products[i].materials[0].purity_id,
            }, { transaction: t });
          }
        } else {
          stock = await StockModel.create({
            product_id: return_data.products[i].product_id,
            size_id: return_data.products[i].size_id || null,
            certificate_no: return_data.products[i].certificate_no,
            quantity: 1,
            total_weight: weight_in_gram,
            user_id: req.userId,
            type: stock_type,
            return_id: saleReturnObj.id
          }, { transaction: t });
        }

        //insert into return product table
        let returnSaleProduct = await ReturnProductModel.create({
          return_id: saleReturnObj.id,
          table_id: sale_products[i].id,
          table_type: 'sale_products',
          sub_total: return_data.products[i].return_amount
        }, { transaction: t });

        //insert into return product materials table
        for (let x = 0; x < return_data.products[i].materials.length; x++) {
          let thisQty = (return_data.products[i].product_type == 'material') ? parseFloat(return_data.products[i].materials[x].return_qty) : return_data.products[i].materials[x].quantity;
          let thisWeight = (return_data.products[i].product_type == 'material') ? parseFloat(return_data.products[i].materials[x].return_weight) : return_data.products[i].materials[x].weight;
          await ReturnProductMaterialModel.create({
            return_id: saleReturnObj.id,
            return_product_id: returnSaleProduct.id,
            material_id: return_data.products[i].materials[x].material_id,
            weight: thisWeight,
            quantity: thisQty,
            purity_id: return_data.products[i].materials[x].purity_id,
            unit_id: return_data.products[i].materials[x].unit_id,
          }, { transaction: t });

          /**
           * add to stock materials
           */
          let weight_in_gram = convertUnitToGram(return_data.products[i].materials[x].unit_name, thisWeight)
          if (return_data.products[i].product_type == 'material') {
            let stockMaterial = await StockMaterialModel.findOne({ where: { stock_id: stock.id, material_id: return_data.products[i].materials[x].material_id } });
            if (stockMaterial) {
              let thisquantity = thisQty ? (parseInt(stockMaterial.quantity) + parseInt(thisQty)) : stockMaterial.quantity;
              await StockMaterialModel.update({
                weight: weightFormat(parseFloat(stockMaterial.weight) + weightFormat(thisWeight)),
                weight_in_gram: weightFormat(parseFloat(stockMaterial.weight_in_gram) + weightFormat(weight_in_gram)),
                quantity: thisquantity,
                purity_id: return_data.products[i].materials[x].purity_id,
                unit_id: return_data.products[i].materials[x].unit_id,
                category_id: return_data.products[i].category_id
              }, { where: { id: stockMaterial.id }, transaction: t });
            } else {
              await StockMaterialModel.create({
                stock_id: stock.id,
                material_id: return_data.products[i].materials[x].material_id,
                weight: weightFormat(thisWeight),
                weight_in_gram: weightFormat(weight_in_gram),
                quantity: thisQty || 0,
                purity_id: return_data.products[i].materials[x].purity_id,
                unit_id: return_data.products[i].materials[x].unit_id,
                category_id: return_data.products[i].category_id
              }, { transaction: t });
            }
          } else {
            await StockMaterialModel.create({
              stock_id: stock.id,
              material_id: return_data.products[i].materials[x].material_id,
              weight: weightFormat(thisWeight),
              weight_in_gram: weightFormat(weight_in_gram),
              quantity: thisQty || 0,
              purity_id: return_data.products[i].materials[x].purity_id,
              unit_id: return_data.products[i].materials[x].unit_id,
              category_id: return_data.products[i].category_id
            }, { transaction: t });
          }
        }

        if (!from_retailer_customer || (from_retailer_customer && return_status == 'completed')) {
          //update sale product is return and return weight & qty into sale product material table
          if (return_data.products[i].product_type == 'material') {
            let total_return_weight = parseFloat(saleProduct.saleMaterials[0].return_weight) + parseFloat(return_data.products[i].materials[0].return_weight);
            let total_return_qty = parseInt(saleProduct.saleMaterials[0].return_qty) + parseInt(return_data.products[i].materials[0].return_qty);
            let is_return = (total_return_qty >= parseInt(saleProduct.saleMaterials[0].quantity) || total_return_weight >= parseFloat(saleProduct.saleMaterials[0].weight)) ? true : false;

            await SaleProductModel.update({ is_return: is_return }, { where: { id: saleProduct.id }, transaction: t });
            await SaleProductMaterialModel.update({
              return_qty: total_return_qty,
              return_weight: total_return_weight
            }, { where: { id: saleProduct.saleMaterials[0].id }, transaction: t });

          } else {
            await SaleProductModel.update({ is_return: true }, { where: { id: saleProduct.id }, transaction: t });
          }
        }

      }

      if (!from_retailer_customer || (from_retailer_customer && return_status == 'completed')) {

        //update sale total payable price
        let total_payable = parseFloat(sale.total_payable);
        let return_amount = parseFloat(data.product_amount);
        total_payable = priceFormat(total_payable - return_amount);
        let paid_amount = parseFloat(sale.paid_amount);
        let due_amount = priceFormat(total_payable - paid_amount, true);
        due_amount = due_amount < 0 ? 0 : due_amount;
        if (paid_amount > total_payable) {
          paid_amount = total_payable;
        }

        let return_amount_from_wallet = parseFloat(data.return_amount_from_wallet);
        if (return_amount_from_wallet > 0) {
          if (data.payment_type == "return") {
            let payment2 = await PaymentModel.create({
              user_id: sale.user_id,
              payment_by: userID,
              table_type: "sale",
              table_id: sale.id,
              amount: data.return_amount_from_wallet,
              payment_mode: data.return_payment_mode,
              remaining_balance: 0,
              status: "success",
              payment_date: data.return_date ? moment(data.return_date, "MM/DD/YYYY").format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
              payment_belongs: userID,
              type: 'debit',
              purpose: sale.is_approval == 1 ? 'sale on apporval refund' : 'sale refund',
              can_accept: false,
              is_advance: false
            });
            await updateWalletRemainingBalance(userID, payment2.id);
          } else {
            await updateAdvanceAmount(sale.user_id, userID, return_amount_from_wallet, true);
          }
        }

        let total_return_amt = priceFormat(priceFormat(sale.return_amount) + return_amount);
        await SaleModel.update({
          return_amount: total_return_amt,
          total_payable: total_payable,
          due_amount: due_amount,
          paid_amount: paid_amount
        }, { where: { id: req.params.id }, transaction: t });

        if (due_amount <= 0) {
          await NoticationModel.update({
            is_read: true
          }, { where: { type_id: sale.id, [Op.or]: [{ type: "sale_due" }, { type: "sale_settlement" }] }, transaction: t });
        }

      } else {
        await SaleModel.update({
          status: 'return_pending'
        }, { where: { id: req.params.id }, transaction: t });
      }

    });

    let allReturn = await SaleProductModel.count({ where: { sale_id: sale.id, is_return: true } });
    allReturn = allReturn ?? 0;
    if (allReturn == sale.saleProducts.length) {
      await SaleModel.update({
        status: "returned"
      }, { where: { id: req.params.id } });
    }

    res.send(formatResponse([], "Returned successfully!"));

  } catch (error) {
    addLog('err: ' + error.toString())
    return res.status(errorCodes.default).send(formatErrorResponse());
  }

}



/**
 * delete sale
 * 
 * @param {*} req
 * @param {*} res 
 */
exports.delete = async (req, res) => {
  let sale = await SaleModel.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: SaleProductModel,
        as: 'saleProducts',
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
            model: SaleProductMaterialModel,
            as: 'saleMaterials',
            include: [
              {
                model: MaterialModel,
                as: 'material'
              }
            ]
          }
        ]
      },
    ]
  });
  if (!sale) {
    return res.status(errorCodes.default).send(formatErrorResponse('Data not found'));
  }

  try {
    let sale_id = req.params.id;
    //const trans = await sequelize.transaction(async (t) => {

    /**
     * Add to superadmin stock
     */
    let userID = isManager(req) ? req.userId : await getWorkingUserID(req);
    for (let i = 0; i < sale.saleProducts.length; i++) {
      let product = sale.saleProducts[i].product;
      if (product) {
        if (product.type != "material") {
          await StockModel.update({ deletedAt: null }, { where: { deletedAt: { ne: null }, id: sale.saleProducts[i].stock_id }, paranoid: false });
          await StockMaterialModel.update({ deletedAt: null }, { where: { deletedAt: { ne: null }, stock_id: sale.saleProducts[i].stock_id }, paranoid: false });
        } else {
          let result = await updateOrCreate(StockModel, { product_id: product.id, user_id: userID }, { product_id: product.id }, null);
          let stock = result.item;
          let totalQnty = 0;
          if (result.created) {
            for (let x = 0; x < sale.saleProducts[i].saleMaterials.length; i++) {
              let thisItem = sale.saleProducts[i].saleMaterials[x];
              await StockMaterialModel.create({
                stock_id: stock.id,
                material_id: thisItem.material_id,
                weight: weightFormat(thisItem.weight),
                quantity: thisItem.quantity
              });
              totalQnty += parseInt(thisItem.quantity);
            }
          } else {
            for (let x = 0; x < sale.saleProducts[i].saleMaterials.length; x++) {
              let thisItem = sale.saleProducts[i].saleMaterials[x];
              let stockMaterial = await StockMaterialModel.findOne({ where: { stock_id: stock.id, material_id: thisItem.material_id } });
              if (stockMaterial) {
                await StockMaterialModel.update({
                  weight: weightFormat(parseFloat(stockMaterial.weight) + parseFloat(thisItem.weight)),
                  quantity: (parseInt(stockMaterial.quantity) + parseInt(thisItem.quantity))
                }, { where: { id: stockMaterial.id } });
                totalQnty += thisItem.quantity;
              }
            }
          }
          totalQnty += stock.quantity ? stock.quantity : 0;
          let totalWeight = stock.total_weight ? (parseFloat(stock.total_weight) + parseFloat(sale.saleProducts[i].total_weight)) : parseFloat(sale.saleProducts[i].total_weight);
          await StockModel.update({
            quantity: totalQnty,
            total_weight: weightFormat(totalWeight)
          }, { where: { id: stock.id } });
        }
      }

    }

    /**
     * Remove from admin stock
     */
    for (let i = 0; i < sale.saleProducts.length; i++) {
      let product = sale.saleProducts[i].product;
      if (product) {
        if (product.type == "material") {
          let stock2 = await StockModel.findOne({ where: { product_id: product.id, user_id: sale.user_id } });
          let quantity = 0;
          for (let mItem of sale.saleProducts[i].saleMaterials) {
            let stockM = await StockMaterialModel.findOne({ where: { stock_id: stock2.id, material_id: mItem.material_id } });
            if (stockM) {
              await StockMaterialModel.update({
                weight: weightFormat(parseFloat(stockM.weight) - parseFloat(mItem.weight)),
                quantity: (parseFloat(stockM.quantity) - parseFloat(mItem.quantity))
              }, { where: { id: stockM.id } });
              quantity += mItem.quantity ? parseInt(mItem.quantity) : 0;
            }
          }
          if (stock2.quantity == quantity) {
            await StockModel.destroy({ where: { id: stock2.id } });
          } else {
            await StockModel.update({
              quantity: quantity,
              total_weight: (parseFloat(stock2.total_weight) - parseFloat(sale.saleProducts[i].total_weight))
            }, { where: { id: stock2.id } });
          }
        } else {
          await StockModel.destroy({ where: { sale_id: sale.id } });

        }
      }

    }


    await SaleProductModel.destroy({ where: { sale_id: sale_id } });
    await SaleProductMaterialModel.destroy({ where: { sale_id: sale_id } });
    await SaleModel.destroy({ where: { id: sale_id } });

    res.send(formatResponse([], "Sale deleted successfully!"));
    //});
  } catch (error) {
    return res.status(errorCodes.default).send(formatErrorResponse('Sale does not delete due to some error'));
  }
}

/**
 * Return Stock Transfer
 * 
 * @param {*} req
 * @param {*} res 
 */
exports.returnStockTransfer = async (req, res) => {
  try {
    let data = req.body;
    let user = await UserModel.findByPk(req.userId);
    let admin_id = await getDistributorAdmin(user.parent_id);

    let userID = await getWorkingUserID(req);
    let invoice_number = null;
    let req_data = {};
    let req_data_for_purchase = data;
    let status = "paid", paid_amount = 0, due_amount = 0;
    let is_approved = 0;
    let saleObj = {
      user_id: admin_id,
      is_assigned: true,
      sale_by: userID,
      invoice_number: invoice_number,
      invoice_date: moment().format('YYYY-MM-DD'),
      is_approved: is_approved,
      status: status,
    };
    let sale = await SaleModel.create(saleObj);

    let purchase = null;
    if (!data.on_approval && !data.order_from_customer) {
      let purchaseObj = {
        supplier_id: userID,
        is_assigned: true,
        sale_id: sale.id,
        user_id: admin_id,
        invoice_number: invoice_number,
        invoice_date: moment().format('YYYY-MM-DD'),
        status: status,
        is_approved: is_approved,
        type: "return_product"
      };
      purchase = await PurchaseModel.create(purchaseObj);
    }

    let stocks = await StockModel.findAll({
      where: { id: { [Op.in]: data.stock_ids } },
      include: [
        {
          model: StockMaterialModel,
          as: 'stockMaterials',
          required: true,
          separate: true,
          include: [
            {
              model: MaterialModel,
              as: 'material'
            },
            {
              model: UnitModel,
              as: 'unit'
            }
          ]
        }
      ]
    });
    let reqDataP = [];
    for (let i = 0; i < stocks.length; i++) {
      let thisItem = stocks[i];
      let thisObj = {
        sale_id: sale.id,
        product_id: thisItem.product_id,
        size_id: thisItem.size_id || null,
        certificate_no: thisItem.certificate_no,
        total_weight: weightFormat(thisItem.total_weight)
      }
      let saleProduct = await SaleProductModel.create(thisObj);
      //let product = await ProductModel.findByPk(thisItem.product_id);
      let thisObj2 = {
        purchase_id: purchase.id,
        product_id: thisItem.product_id,
        size_id: thisItem.size_id || null,
        certificate_no: thisItem.certificate_no,
        total_weight: weightFormat(thisItem.total_weight)
      }
      let purchaseProduct = await PurchaseProductModel.create(thisObj2);

      //insert into sale product materials
      let reqDataM = [];
      for (let x = 0; x < thisItem.stockMaterials.length; x++) {
        let thisMObj = {
          sale_id: sale.id,
          sale_product_id: saleProduct.id,
          material_id: thisItem.stockMaterials[x].material_id,
          weight: weightFormat(thisItem.stockMaterials[x].weight),
          quantity: thisItem.stockMaterials[x].quantity || 0,
          purity_id: thisItem.stockMaterials[x].purity_id,
          unit_id: thisItem.stockMaterials[x].unit_id
        }
        await SaleProductMaterialModel.create(thisMObj);

        if (purchase) {
          let thisMObj2 = {
            purchase_id: purchase.id,
            purchase_product_id: purchaseProduct.id,
            material_id: thisItem.stockMaterials[x].material_id,
            weight: weightFormat(thisItem.stockMaterials[x].weight),
            quantity: thisItem.stockMaterials[x].quantity || 0,
            purity_id: thisItem.stockMaterials[x].purity_id,
            unit_id: thisItem.stockMaterials[x].unit_id
          }
          await PurchaseProductMaterialModel.create(thisMObj2);
        }

        reqDataM.push({
          material_id: thisItem.stockMaterials[x].material_id,
          weight: weightFormat(thisItem.stockMaterials[x].weight),
          quantity: thisItem.stockMaterials[x].quantity || 0,
          purity_id: thisItem.stockMaterials[x].purity_id,
          unit_id: thisItem.stockMaterials[x].unit_id,
          weight_in_gram: thisItem.stockMaterials[x].weight_in_gram
        })

        /**
         * remove from stocks
         */
        await StockModel.destroy({ where: { id: thisItem.id } });
        await StockMaterialModel.destroy({ where: { stock_id: thisItem.id } });

      }

      reqDataP.push({
        id: purchaseProduct.id,
        product_id: thisItem.product_id,
        size_id: thisItem.size_id,
        certificate_no: thisItem.certificate_no,
        total_weight: thisItem.total_weight,
        materials: reqDataM,
        worker_id: ''
      })

    }

    req_data.products = reqDataP;

    //update invoice no if not sent
    let purchase_invoice_number = invoice_number;
    if (isEmpty(invoice_number)) {
      invoice_number = 'RV-T-' + sale.id;
      purchase_invoice_number = invoice_number;
      req_data = JSON.stringify(req_data);
      req_data = new Buffer.from(req_data).toString("base64");
      await SaleModel.update({
        invoice_number: invoice_number,
        req_data: req_data
      }, { where: { id: sale.id } });
    }

    if (purchase) {
      await PurchaseModel.update({
        invoice_number: purchase_invoice_number,
        req_data: req_data
      }, { where: { id: purchase.id } });
    }

    //send notification
    if (purchase) {
      purchase = await PurchaseModel.findByPk(purchase.id);
      sendNotification('sale', req, { sale: sale, purchase: purchase });
    }

    res.send(formatResponse([], "Transfer successfully. Waiting for approval."));

  } catch (error) {
    addLog("error: " + error.toString())
    return res.status(errorCodes.default).send(formatErrorResponse('Transfer does not success due to some error'));
  }
}

/**
 * Sale Product List
 * 
 * @param {*} req
 * @param {*} res 
 */
exports.saleProducts = async (req, res) => {
  //let userID = isManager(req) ? req.userId : await getWorkingUserID(req);
  let saleProductsRes = await getOwnUserSaleProducts(req, req.query);
  res.send(formatResponse(saleProductsRes));
}


/**
 * Download Invoice
 * 
 * @param {*} req
 * @param {*} res 
 */
exports.downloadInvoice = async (req, res) => {
  let userID = isManager(req) ? req.userId : await getWorkingUserID(req);
  let sale = await SaleModel.findOne({
    where: { id: req.params.id, sale_by: userID },
    include: [
      {
        model: SaleProductModel,
        as: 'saleProducts',
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
            model: SaleProductMaterialModel,
            as: 'saleMaterials',
            separate: true,
            include: [
              {
                model: MaterialModel,
                as: 'material'
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
        as: 'user',
      },
      {
        model: UserModel,
        as: 'saleBy'
      }
    ]
  });
  if (!sale) {
    return res.status(errorCodes.default).send(formatErrorResponse('Sale not found'));
  }
  let saleData = SaleCollection(sale);

  let payments = await PaymentModel.findAll({
    where: {
      table_type: 'sale',
      table_id: req.params.id
    },
    include: [
      {
        model: UserModel,
        as: 'user'
      }
    ]
  });
  payments = await PaymentCollection(payments);

  const cwd = process.cwd();
  //const logoUrl = `file://${cwd}/public/images/logo.png`;
  const logoUrl = `public/images/logo.png`;
  //const logoUrl = process.env.BASE_URL + "public/images/logo.png";

  const bitmap = fs.readFileSync(logoUrl);
  const logo = bitmap.toString('base64');


  let html = `<!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bill</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <style>
          html {
            -webkit-print-color-adjust: exact;
          }
          </style>
      </head>
      <body style="box-sizing: border-box; padding: 0px; margin: 0px; font-family:
          'Poppins', sans-serif;">
          <div class="invoice" style="max-width: 1000px; margin: auto; padding:
              15px;
              background-color: #f9f9f9;">
              <table cellpadding="0" cellspacing="0" width="100%">
                  <tbody>
                      <tr>
                          <td>
                              <table cellspacing="0" cellpadding="0" border="0"
                                  align="center" width="100%">
                                  <h1 style="font-size: 14px; text-align:
                                      right; margin-bottom: 5px; font-weight:
                                      300;">TAX INVOICE</h1>
                              </table>
                              <table cellspacing="0" cellpadding="0" border="0"
                                  align="center" width="100%">
                                  <div style="display: table; width: 100%;">
                                      <div style="width: 65%; display: table-cell;
                                          vertical-align: bottom;">
                                          <img src="data:image/png;base64,${logo}" style="width:
                                              220px; margin-left: 10px;">
                                          <h3 style="margin: 0; font-weight: 400;
                                              font-size: 12px;">Corporate Office -
                                              P210 Strand Bank Road Brabzar
                                              Kolkata 700 011</h3>
  
                                      </div>
                                      <div style="width: 35%; display: table-cell;
                                          vertical-align: middle; text-align:
                                          left;">
                                          <h3 style="margin: 0;">
                                              <span style="font-size: 16px;
                                                  font-weight: 600;">Ratn Vihar
                                                  Patna</span></h3>
                                          <h3 style="margin: 0; font-weight: 400;
                                              font-size: 14px;">GST No -
                                              <span style="font-weight: 600;">10CIUPK2654L1ZY</span></h3>
                                          <h3 style="margin: 0; font-weight: 400;
                                              font-size: 12px;">User Id - <span>${saleData.sale_by_name}</span></h3>
                                          <h3 style="margin: 0; font-weight: 400;
                                              font-size: 12px;">Address - G100
                                              RBI CPC Colony Kankarbagh Patna
                                              Bihar 800 020</h3>
                                          <h3 style="font-weight: 600; font-size:
                                              12px; margin: 0;">
                                              support@ratnvihar.com, +91 98744
                                              45878
                                          </h3>
                                      </div>
                                  </div>
                              </table>
                              <table cellspacing="0" cellpadding="5" border="0"
                                  align="center" width="100%">
                                  <tbody>
                                      <tr>
                                          <hr style="border: 1px solid #1e2746">
                                      </tr>
                                  </tbody>
                              </table>
                              <table cellspacing="0" cellpadding="5" border="0"
                                  align="center" width="100%">
                                  <thead>
                                      <!-- <tr style="background-color: #000;">
                                          <th style="text-align: left; color:
                                              #fff;">Company: Ratn Alankar
                                              Jewellers</th>
                                          <th style="text-align: left; color:
                                              #fff;">Name: Mukund Singhaindi</th>
                                          <th style="text-align: left; color:
                                              #fff;">Cont: 91919191919</th>
                                          <th style="text-align: left; color:
                                              #fff;">City: Muzaffarpur</th>
                                      </tr>
                                  </thead> -->
                                      <tbody>
                                          <!-- <tr style="background-color: #fff;">
                                          <td style="">
                                              <span style="font-weight: 600;"> GST
                                                  IN ${saleData.user_details.gst} </span>
                                          </td>
                                          <td style="">
                                              Ad:
                                          </td>
                                          <td style="">
  
                                          </td>
                                          <td style="">
                                              Pin Code: 800 020
                                          </td>
                                      </tr> -->
                                          <tr>
                                              <td style="padding: 0;">
                                                  <div class="comp-part-one">
                                                      <ul style="margin: 0;
                                                          padding: 0; list-style:
                                                          none; display: flex;
                                                          gap: 15px;
                                                          justify-content:
                                                          space-between;">
                                                          <li><span
                                                                  style="font-weight:
                                                                  400; font-size:
                                                                  12px; margin:
                                                                  0;">Company -</span>
                                                              <span
                                                                  style="font-weight:
                                                                  600; font-size:
                                                                  12px; margin:
                                                                  0;">${saleData.user_details.company_name}</span></li>
                                                          <li><span
                                                                  style="font-weight:
                                                                  400; font-size:
                                                                  12px; margin:
                                                                  0;">GST IN</span>
                                                              <span
                                                                  style="font-weight:
                                                                  600; font-size:
                                                                  12px; margin:
                                                                  0;">${saleData.user_details.gst}</span></li>
                                                          <li><span
                                                                  style="font-weight:
                                                                  400; font-size:
                                                                  12px; margin:
                                                                  0;">Cont -
                                                              </span>
                                                              <span
                                                                  style="font-weight:
                                                                  600; font-size:
                                                                  12px; margin:
                                                                  0;">${saleData.user_mobile}</span>
                                                          <li><span
                                                                  style="font-weight:
                                                                  400; font-size:
                                                                  12px; margin:
                                                                  0;">Invoice Date
                                                                  -
                                                              </span> <span
                                                                  style="font-weight:
                                                                  600; font-size:
                                                                  12px; margin:
                                                                  0;">${saleData.invoice_date}</span></li>
                                                                  
                                                      </ul>
                                                  </div>
                                                  <div class="comp-part-two">
                                                      <ul style="margin: 0;
                                                          padding: 0; list-style:
                                                          none; display: flex;
                                                          gap: 15px;
                                                          justify-content:
                                                          space-between;">
                                                          <li><span
                                                                  style="font-weight:
                                                                  400; font-size:
                                                                  12px; margin:
                                                                  0;">Address -</span>
                                                              <span
                                                                  style="font-weight:
                                                                  600; font-size:
                                                                  12px; margin:
                                                                  0;">${saleData.user_details.address}</span></li>
                                                          <li><span
                                                                  style="font-weight:
                                                                  400; font-size:
                                                                  12px; margin:
                                                                  0;">City -</span>
                                                              <span
                                                                  style="font-weight:
                                                                  600; font-size:
                                                                  12px; margin:
                                                                  0;">${saleData.user_details.city}</span></li>
                                                          <li><span
                                                                  style="font-weight:
                                                                  400; font-size:
                                                                  12px; margin:
                                                                  0;">Pin -
                                                              </span>
                                                              <span
                                                                  style="font-weight:
                                                                  600; font-size:
                                                                  12px; margin:
                                                                  0;">${saleData.user_details.pincode}</span></li>
                                                          <li><span
                                                                  style="font-weight:
                                                                  400; font-size:
                                                                  12px; margin:
                                                                  0;">Invoice No -
                                                              </span> <span
                                                                  style="font-weight:
                                                                  600; font-size:
                                                                  12px; margin:
                                                                  0;">${saleData.invoice_number}</span></li>
                                                      </ul>
                                                  </div>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                                  <table cellspacing="0" cellpadding="5"
                                      border="0"
                                      align="center" width="100%">
                                      <thead style="background-color: #1E2746;">
                                          <tr style="background-color: #1E2746;">
                                              <th style="text-align: left; color:
                                                  #fff; border: 1px solid #1E2746;
                                                  font-size: 12px; font-weight:
                                                  400;background-color: #1E2746;">#</th>
                                              <th style="text-align: left; color:
                                                  #fff; font-size: 12px;
                                                  font-weight: 400; width:
                                                  250px;">Product Name</th>
                                              <th style="text-align: left; color:
                                                  #fff; font-size: 12px;
                                                  font-weight: 400; width: 50px;">Size</th>
                                              <th style="text-align: left; color:
                                                  #fff; font-size: 12px;
                                                  font-weight: 400; width: 150px;">Product Id</th>
                                              <th style="text-align: left; color:
                                                  #fff; font-size: 12px;
                                                  font-weight: 400;">Mtrl</th>
                                              <th style="text-align: left; color:
                                                  #fff; font-size: 12px;
                                                  font-weight: 400; width: 70px">Making Etc</th>
                                              <th style="text-align: left; color:
                                                  #fff; font-size: 12px;
                                                  font-weight: 400;">Tag Price</th>
                                              <th style="text-align: left; color:
                                                  #fff; font-size: 12px;
                                                  font-weight: 400;">Dist Amt</th>
                                              <th style="text-align: left; color:
                                                  #fff; font-size: 12px;
                                                  font-weight: 400;">Sub-Tot</th>
                                              <th style="text-align: left; color:
                                                  #fff; font-size: 12px;
                                                  font-weight: 400;">Tax%</th>
                                              <th style="text-align: left; color:
                                                  #fff; font-size: 12px;
                                                  font-weight: 400;">Total</th>
                                          </tr>
                                      </thead>
                                      <tbody>`;
  for (let i = 0; i < saleData.products.length; i++) {
    html += `<tr style="background-color: #C1BDBD;">
                                              <td style="text-align: left;
                                                  font-size: 11px;
                                                  font-weight: 400;">
                                                  ${i + 1}
                                              </td>
                                              <td style="text-align: left;
                                                  font-size: 11px;
                                                  font-weight: 400;font-size: 10px;">
                                                  ${saleData.products[i].product_name} - ${saleData.products[i].product_code}
                                              </td>
                                              <td style="text-align: left;
                                                  font-size: 11px;
                                                  font-weight: 400;">
                                                  ${saleData.products[i].size_name}
                                              </td>
                                              <td colspan="8" style="text-align:
                                                  left; font-size: 11px;
                                                  font-weight: 400;">
                                                  ${saleData.products[i].certificate_no}
                                              </td>
  
                                          </tr>
                                          <tr style="background-color: #fff;
                                              vertical-align: top;">
                                              <td colspan="3"
                                                  style="border-bottom: 1px solid
                                                  #1E2746; width: 300px; text-align: left;">
                                                  <div style="max-width: 300px; text-align: left;">`;
    for (let x = 0; x < saleData.products[i].materials.length; x++) {
      html += `<div style="display: flex;
                                                          flex-wrap: wrap;
                                                          justify-content: center;
                                                          margin: 0 -5px; text-align: left;">
                                                          <div style="flex-basis:
                                                              calc(69% - 10px);
                                                              margin: 0 5px
                                                              0px; line-height:
                                                              1;text-align: left;">
                                                              <span
                                                                  style="text-align:
                                                                  left;font-size:
                                                                  10px;
                                                                  font-weight:
                                                                  400;text-align: left;">${saleData.products[i].materials[x].material_name} ${saleData.products[i].materials[x].weight} ${saleData.products[i].materials[x].unit_name} X ${saleData.products[i].materials[x].rate}
                                                              </span>
  
                                                          </div>
  
                                                          <div
                                                              style="flex-basis:
                                                              calc(31% -
                                                              10px);
                                                              margin: 0 5px
                                                              0px; line-height:
                                                              1;">
                                                              <span
                                                                  style="text-align:
                                                                  left; font-size:
                                                                  10px;
                                                                  font-weight:
                                                                  400;"> = ${saleData.products[i].materials[x].amount}</span>
                                                          </div>
  
                                                      </div>`;
    }

    html += `</div>
  
  
                                                      </td>
                                                      <td style="border-bottom:
                                                          1px solid #1E2746;">`;
    for (let x = 0; x < saleData.products[i].materials.length; x++) {
      html += `<div>`;
      if (isEmpty(saleData.products[i].materials[x].discount_amount)) {
        html += `-`;
      } else {
        html += `<span
                                                                  style="text-align:
                                                                  left; font-size:
                                                                  10px;
                                                                  font-weight:
                                                                  400;">Dist@${removeBlankZero(saleData.products[i].materials[x].discount_percent)}% ${saleData.products[i].materials[x].discount_amount_display}</span> 
															  <!--<span
                                                                  style="text-align:
                                                                  left; font-size:
                                                                  10px;
                                                                  font-weight:
                                                                  400;">${saleData.products[i].materials[x].discount_amount_display}</span>-->`;
      }
      html += `</div>`;
    }
    html += `</td>
                                                      <td style="text-align: left;
                                                          font-size: 10px;
                                                          font-weight: 400;
                                                          border-bottom: 1px solid
                                                          #1E2746;">`;
    for (let x = 0; x < saleData.products[i].materials.length; x++) {
      html += `<div>${saleData.products[i].materials[x].material_cost}</div>`;
    }
    html += `</td>
                                                      <td style="text-align: left;
                                                          font-size: 10px;
                                                          font-weight: 400;
                                                          border-bottom: 1px solid
                                                          #1E2746;">
                                                          ${saleData.products[i].making_charge}@${saleData.products[i].making_charge_discount}% = ${saleData.products[i].total_making_charge_discount}
                                                      </td>
  
                                                      <td style="text-align:
                                                          left;font-size: 10px;
                                                          font-weight: 400;
                                                          border-bottom: 1px solid
                                                          #1E2746;">
                                                          ${saleData.products[i].sub_price}
                                                      </td>
                                                      <td style="text-align:
                                                          left;font-size: 10px;
                                                          font-weight: 400;
                                                          border-bottom: 1px solid
                                                          #1E2746;">
                                                          ${saleData.products[i].total_discount_display}
                                                      </td>
                                                      <td style="text-align:
                                                          left;font-size: 10px;
                                                          font-weight: 400;
                                                          border-bottom: 1px solid
                                                          #1E2746;">
                                                          ${saleData.products[i].sub_total}
                                                      </td>
                                                      <td style="text-align:
                                                          left;font-size: 10px;
                                                          font-weight: 400;
                                                          border-bottom: 1px solid
                                                          #1E2746;">
                                                          ${saleData.products[i].tax}
                                                      </td>
                                                      <td style="text-align:
                                                          left;font-size: 10px;
                                                          font-weight: 400;
                                                          border-bottom: 1px solid
                                                          #1E2746;">
                                                          ${saleData.products[i].total_display}
                                                      </td>
  
                                                  </tr>`;
  }
  html += `<tr style="
                                                      vertical-align: top;">
                                                      <td colspan="6"
                                                          style="
                                                          border:none;">
  
                                                      </td>
                                                      <!-- <td style="">
                                                          <div>
                                                              <h4 style="margin:
                                                                  0;
                                                                  text-align:
                                                                  left; font-size:
                                                                  12px;
                                                                  font-weight:
                                                                  600; display:
                                                                  ;">
                                                                  Total
                                                                  Save <div>139000</div></h4>
                                                          </div>
                                                      </td> -->
                                                      
                                                      
                                                      
  
                                                  </tr>
                                                  
                                                  
                                                  
                                                  
                                                  
                                                  
                                                  
                                                  
                                                  <!-- <tr style="
                                                      vertical-align: top;">
                                                      <td colspan="8"
                                                          style="
                                                          border:none; padding: 0;">
                                                      </td>
                                                   
                                                     
                                                      
                                                      <td colspan="3" style="margin: 0;
                                                          text-align: left;
                                                          font-size: 12px;
                                                          font-weight: 600; padding: 4px;">
                                                          <div>
                                                              <h4 style="margin:
                                                                  0;
                                                                  text-align:
                                                                  right; font-size:
                                                                  12px;
                                                                  font-weight:
                                                                  600;">
                                                                  Sub-Total <span style=""> <input type="text" value="139000" style="max-width: 80px;"></span></h4>
                                                          </div>
                                                      </td>
  
                                                  </tr>
                                                  <tr style="
                                                      vertical-align: top;">
                                                      <td colspan="8"
                                                          style="
                                                          border:none; padding: 0;">
  
                                                      </td>
                                                   
                                                     
                                                      
                                                      <td colspan="3" style="margin: 0;
                                                          text-align: left;
                                                          font-size: 12px;
                                                          font-weight: 600; padding: 4px;">
                                                          <div>
                                                              <h4 style="margin:
                                                                  0;
                                                                  text-align:
                                                                  right; font-size:
                                                                  12px;
                                                                  font-weight:
                                                                  600;">
                                                                  Sub-Total <span style=""> <input type="text" value="139000" style="max-width: 80px;"></span></h4>
                                                          </div>
                                                      </td>
  
                                                  </tr> -->
                                              </tbody>
                                          </table>
                                          
                                          <div
                                              class="table-footer-area"
                                              style="display: table; width:
                                              100%;">
                                              <div style="display:
                                                  table-cell; width:
                                                  74%">
                                                  <div style="display: block;
                                                      justify-content: flex-end;
                                                      gap: 10px;">
                                                      <div>
                                                          <h4 style="margin:
                                                              0;
                                                              text-align:
                                                              left; font-size:
                                                              14px;
                                                              font-weight:
                                                              600; display: flex; gap: 40px; justify-content: end;">
                                                              <div>${saleData.total_tag_price}</div>
                                                              <div>${saleData.product_discount}</div>
                                                          </h4>
                                                      </div>`;


  if (payments.length) {
    html += `<table cellspacing="0"
                                                          cellpadding="5"
                                                          border="1"
                                                          align="center"
                                                          width="100%"
                                                          style="border: 0.5px solid #373737; margin-top: 10px;">
                                                          <tr
                                                              style="background-color:
                                                              #1E2746;
                                                              color: #fff;">
                                                              <th
                                                                  style="font-weight:
                                                                  400; font-size: 14px; text-align: left;">SL</th>
                                                              <th
                                                                  style="font-weight:
                                                                  400; font-size: 14px; text-align: left;">PayDate</th>
                                                              <th
                                                                  style="font-weight:
                                                                  400; font-size: 14px; text-align: left;">Mode of
                                                                  Payment</th>
                                                              <th
                                                                  style="font-weight:
                                                                  400; font-size: 14px; text-align: left;">Amount</th>
                                                              <th
                                                                  style="font-weight:
                                                                  400; font-size: 14px; text-align: left;">Notes</th>
                                                          </tr>`;
    for (let i = 0; i < payments.length; i++) {
      html += `<tr
                                                              style="background-color:
                                                              #C1BDBD; color:
                                                              #fff;">
                                                              <td
                                                                  style="border-right:
                                                                  none; font-size: 14px;">${i + 1}</td>
                                                              <td
                                                                  style="border-right:
                                                                  none; font-size: 14px;">${payments[i].payment_date}</td>
                                                              <td
                                                                  style="border-right:
                                                                  none; font-size: 14px;">${payments[i].payment_mode}</td>
                                                              <td
                                                                  style="border-right:
                                                                  none; font-size: 14px;">${payments[i].amount}</td>
                                                              <td
                                                              style="border-right:
                                                              none; font-size: 14px;"
                                                              >${payments[i].notes}</td>
                                                          </tr>`;
    }
    html += `</table>`;
  }
  html += `</div>
                                              </div>
                                              <div style="display:
                                                  table-cell; width:
                                                  26%">
                                                  <div style="display: block;
                                                      justify-content: flex-end;
                                                      ">
                                                      <div>
                                                          <h4 style="margin:
                                                              0;
                                                              text-align:
                                                              right;
                                                              font-size:
                                                              12px;
                                                              font-weight:
                                                              400; margin-bottom:
                                                              5px;">
                                                              Sub-Total <span
                                                                  style="">
                                                                  <input
                                                                      type="text"
                                                                      value="${saleData.total_sub_total}"
                                                                      style="max-width:
                                                                      80px;"></span></h4>
                                                      </div>`;
  if (saleData.cgst_tax) {
    html += `<div>
                                                          <h4 style="margin:
                                                              0;
                                                              text-align:
                                                              right;
                                                              font-size:
                                                              12px;
                                                              font-weight:
                                                              400; margin-bottom:
                                                              5px;">
                                                              CGST Amt <span
                                                                  style="">
                                                                  <input
                                                                      type="text"
                                                                      value="${saleData.cgst_tax_display}"
                                                                      style="max-width:
                                                                      80px;"></span></h4>
                                                      </div>`;
  }
  if (saleData.sgst_tax) {
    html += `<div>
                                                          <h4 style="margin:
                                                              0;
                                                              text-align:
                                                              right;
                                                              font-size:
                                                              12px;
                                                              font-weight:
                                                              400; margin-bottom:
                                                              5px;">
                                                              SGST Amt <span
                                                                  style="">
                                                                  <input
                                                                      type="text"
                                                                      value="${saleData.sgst_tax_display}"
                                                                      style="max-width:
                                                                      80px;"></span></h4>
                                                      </div>`;
  }
  if (saleData.igst_tax) {
    html += `<div>
                                                          <h4 style="margin:
                                                              0;
                                                              text-align:
                                                              right;
                                                              font-size:
                                                              12px;
                                                              font-weight:
                                                              400; margin-bottom:
                                                              5px;">
                                                              IGST Amt <span
                                                                  style="">
                                                                  <input
                                                                      type="text"
                                                                      value="${saleData.igst_tax_display}"
                                                                      style="max-width:
                                                                      80px;"></span></h4>
                                                      </div>`;
  }
  html += `<div>
                                                          <h4 style="margin:
                                                              0;
                                                              text-align:
                                                              right;
                                                              font-size:
                                                              12px;
                                                              font-weight:
                                                              400; margin-bottom:
                                                              5px;">
                                                              Tax Amt <span
                                                                  style="">
                                                                  <input
                                                                      type="text"
                                                                      value="${saleData.total_tax_display}"
                                                                      style="max-width:
                                                                      80px;"></span></h4>
                                                      </div>
                                                      <div>
                                                          <h4 style="margin:
                                                              0;
                                                              text-align:
                                                              right;
                                                              font-size:
                                                              12px;
                                                              font-weight:
                                                              400; margin-bottom:
                                                              5px;">
                                                              Total Amt <span
                                                                  style="">
                                                                  <input
                                                                      type="text"
                                                                      value="${saleData.total_amount}"
                                                                      style="max-width:
                                                                      80px;"></span></h4>
                                                      </div>
                                                      <div>
                                                          <h4 style="margin:
                                                              0;
                                                              text-align:
                                                              right;
                                                              font-size:
                                                              12px;
                                                              font-weight:
                                                              400; margin-bottom:
                                                              5px;">
                                                              Cash Dist <span
                                                                  style="">
                                                                  <input
                                                                      type="text"
                                                                      value="${saleData.discount}"
                                                                      style="max-width:
                                                                      80px;"></span></h4>
                                                      </div>
                                                      <div>
                                                          <h4 style="margin:
                                                              0;
                                                              text-align:
                                                              right;
                                                              font-size:
                                                              12px;
                                                              font-weight:
                                                              400; margin-bottom:
                                                              5px;">
                                                              Total Payable <span
                                                                  style="">
                                                                  <input
                                                                      type="text"
                                                                      value="${saleData.bill_amount}"
                                                                      style="max-width:
                                                                      80px;"></span></h4>
                                                      </div>
                                                      <div>
                                                          <h4 style="margin:
                                                              0;
                                                              text-align:
                                                              right;
                                                              font-size:
                                                              12px;
                                                              font-weight:
                                                              400; margin-bottom:
                                                              5px;">
                                                              Payment Mode <span
                                                                  style="">
                                                                  <input
                                                                      type="text"
                                                                      value="${saleData.payment_mode}"
                                                                      style="max-width:
                                                                      80px;"></span></h4>
                                                      </div>
  
                                                  </div>
                                              </div>
                                          </div>
                                          <div
                                              class="table-footer-area"
                                              style="display: table; width:
                                              100%;">
                                              <div style="display:
                                                  table-cell; width:
                                                  74%">
                                                  <div style="display: block;
                                                      justify-content: flex-end;
                                                      gap: 10px;">
                                                      <div>
                                                          <h4 style="margin:
                                                              0;
                                                              text-align:
                                                              left;
                                                              font-size:
                                                              12px;
                                                              font-weight:
                                                              400; margin-bottom:
                                                              5px;">
                                                              <span
                                                                  style="">
                                                                  <input
                                                                      type="text"
                                                                      value="${saleData.due_date}"
                                                                      style="max-width:
                                                                      80px;"></span>
                                                              Due Date</h4>
                                                      </div>
                                                      <div>
                                                          <h4 style="margin:
                                                              0;
                                                              text-align:
                                                              left;
                                                              font-size:
                                                              12px;
                                                              font-weight:
                                                              400; margin-bottom:
                                                              5px;">
                                                              <span
                                                                  style="">
                                                                  <input
                                                                      type="text"
                                                                      value="${saleData.settlement_date}"
                                                                      style="max-width:
                                                                      80px;"></span>
                                                              Settlement Date</h4>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div style="display:
                                                  table-cell; width:
                                                  26%">
                                                  <div style="display: block;
                                                      justify-content: flex-end;
                                                      ">
                                                      <div>
                                                          <h4 style="margin:
                                                              0;
                                                              text-align:
                                                              right;
                                                              font-size:
                                                              12px;
                                                              font-weight:
                                                              400; margin-bottom:
                                                              5px;">
                                                              Paid Amount <span
                                                                  style="">
                                                                  <input
                                                                      type="text"
                                                                      value="${saleData.paid_amount}"
                                                                      style="max-width:
                                                                      80px;"></span></h4>
                                                      </div>`;
  if (saleData.return_amount) {
    html += `<div>
                                                          <h4 style="margin:
                                                              0;
                                                              text-align:
                                                              right;
                                                              font-size:
                                                              12px;
                                                              font-weight:
                                                              400; margin-bottom:
                                                              5px;">
                                                              Return Amount <span
                                                                  style="">
                                                                  <input
                                                                      type="text"
                                                                      value="${saleData.return_amount}"
                                                                      style="max-width:
                                                                      80px;"></span></h4>
                                                      </div>`;
  }

  html += `<div>
                                                          <h4 style="margin:
                                                              0;
                                                              text-align:
                                                              right;
                                                              font-size:
                                                              12px;
                                                              font-weight:
                                                              400; margin-bottom:
                                                              5px;">
                                                              Rest Due Amt <span
                                                                  style="">
                                                                  <input
                                                                      type="text"
                                                                      value="${saleData.due_amount_display}"
                                                                      style="max-width:
                                                                      80px;"></span></h4>
                                                      </div>
  
                                                  </div>
                                              </div>
                                          </div>
                                          <table cellspacing="0" cellpadding="0"
                                              border="0"
                                              align="center" width="100%">
                                              <tbody>
                                                  <tr>
                                                      <hr style="border: 0.5px
                                                          solid #1E2746">
                                                  </tr>
                                              </tbody>
                                          </table>
                                          <!-- Footer -->
                                      </td>
                                  </tr>
  
                              </tbody>
                          </table>
                      </div>
                  </body>
              </html>`;
  let footerhtml = `<!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bill</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <style>
          html {
            -webkit-print-color-adjust: exact;
          }
          </style>
      </head>
      <body style="box-sizing: border-box; padding: 0px; margin: 0px; font-family:
          'Poppins', sans-serif;"><div class="invoice" style="max-width: 1000px; margin: auto; padding:
              15px;
              background-color: #f9f9f9;">
              <table cellpadding="0" cellspacing="0" width="100%">
                  <tbody>
                      <tr>
                          <td><table cellspacing="0" cellpadding="0"
                                              border="0"
                                              align="center" width="100%">
                                              <div style="display: table; width:
                                                  100%; font-size: 12px;">
                                                  <div style="display: table-cell;
                                                      width: 65%;">
                                                      <h5 style="margin: 0px;
                                                          font-size: 12px;
                                                          font-weight:
                                                          600; text-transform:
                                                          uppercase;">Notice</h5>
                                                      <ul style="margin: 0;
                                                          padding: 0px;
                                                          list-style: none;">
                                                          <span style="margin: 0;
                                                              text-align: left;
                                                              font-size: 12px;
                                                              font-weight: 400; ">*
                                                              Goods once sold will
                                                              be taken back with
                                                              condition</span>
  
                                                          <li style="margin: 0;
                                                              text-align: left;
                                                              font-size: 12px;
                                                              font-weight: 400;
                                                              list-style-type:
                                                              disc; margin-left:
                                                              35px;">Returning
                                                              minimum product
                                                              value of Rs 5000/-
                                                              above</li>
                                                          <li style="margin: 0;
                                                              text-align: left;
                                                              font-size: 12px;
                                                              font-weight: 400;
                                                              list-style-type:
                                                              disc; margin-left:
                                                              35px;">Returning
                                                              product taken back
                                                              Less than 20-30% of
                                                              my billing amount</li>
                                                          <li style="margin: 0;
                                                              text-align: left;
                                                              font-size: 12px;
                                                              font-weight: 400;
                                                              list-style-type:
                                                              disc; margin-left:
                                                              35px;">If any Damage
                                                              charge as per making
                                                              cost only</li>
                                                          <li style="margin: 0;
                                                              text-align: left;
                                                              font-size: 12px;
                                                              font-weight: 400;
                                                              list-style-type:
                                                              disc; margin-left:
                                                              35px;">No Charges
                                                              taken on Sale
                                                              product returning
                                                              within 7 days from
                                                              bill date</li>
                                                          <li style="margin: 0;
                                                              text-align: left;
                                                              font-size: 12px;
                                                              font-weight: 400;
                                                              list-style-type:
                                                              disc; margin-left:
                                                              35px;">All disputes
                                                              are subject to Patna
                                                              Juridiction only</li>
                                                          <li style="margin: 0;
                                                              text-align: left;
                                                              font-size: 12px;
                                                              font-weight: 400;
                                                              list-style-type:
                                                              disc; margin-left:
                                                              35px;">Charges may
                                                              be appling cancel of
                                                              order product making
                                                              only</li>
  
                                                      </ul>
                                                  </div>
                                                  <div style="display: table-cell;
                                                      width: 35%;">
                                                      <div style="display: flex;
                                                          gap: 10px;
                                                          justify-content:
                                                          space-between;">
                                                          <!---<div>
                                                              <h4 style="margin:
                                                                  0px;
                                                                  text-align:
                                                                  center;
                                                                  font-size:
                                                                  12px;">Customer
                                                                  Signature</h4>
                                                              <input type="text"
                                                                  style="display:
                                                                  block;
                                                                  margin: auto;
                                                                  height:
                                                                  36px; min-width:
                                                                  142px; ">
  
                                                          </div> -->
                                                          <div>
                                                              <h4 style="margin:
                                                                  0px;
                                                                  text-align:
                                                                  center;
                                                                  font-size:
                                                                  12px;">Returning%
                                                              </h4>
                                                              <div
                                                                  style="position:
                                                                  relative;">
                                                                  <input
                                                                      type="text"
                                                                      style="display:
                                                                      block;
                                                                      margin:
                                                                      auto;
                                                                      height:
                                                                      36px;
                                                                      min-width:
                                                                      84px; ">
                                                                  <div
                                                                      style="position:
                                                                      absolute;
                                                                      right:
                                                                      12px; top:
                                                                      12px;
                                                                      font-size:
                                                                      14px;">%</div>
                                                              </div>
                                                          </div>
  
                                                      </div>
                                                      <div>
                                                          <p style="font-size:
                                                              12px; margin: 0;
                                                              line-height: 1.9; ">
                                                              Company Name - ${saleData.user_details.company_name}</p>
                                                          <p style="font-size:
                                                              12px; margin: 0;
                                                              line-height: 1.9; ">
                                                              ${saleData.user_details.company_name}, Ac
                                                              No - ${saleData.user_details.bank_account_no}</p>
                                                          <p style="font-size:
                                                              12px; margin: 0;
                                                              line-height: 1.9; ">
                                                              IFSC Code -
                                                              ${saleData.user_details.bank_ifsc}</p>
                                                      </div>
  
                                                  </div>
  
                                              </div>
                                          </table></td>
                                  </tr>
  
                              </tbody>
                          </table>
                      </div></body>
                      </html>`;

  /*var options = { 
    format: "A4",
    orientation: "portrait",
    border: "1mm",
    header: {
        height: "0mm",
        contents: ''
    },
    footer: {
        height: "10mm",
        contents: {
            first: '',
            2: '', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: ''
        }
    }
  };

  let file_path = "public/invoices/"+saleData.invoice_number+".pdf";

  var document = {
    html: html,
    data: {
      
    },
    path: './'+file_path,
    type: "",
  };
  pdf.create(document, options)
  .then((resp) => {
    res.send(formatResponse({
      file_name: saleData.invoice_number+".pdf",
      url: getFileAbsulatePath(file_path),
      image_url: logoUrl
    }, "Invoice pdf"));
  })
  .catch((error) => {
    addLog("pdf error: " + error.toString());
    console.error(error);
  });*/


  try {


    let file_path = "public/invoices/" + saleData.invoice_number + ".pdf";

    // Create a browser instance
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser',
      args: ["--no-sandbox"]
    });

    // Create a new page
    const page = await browser.newPage();

    //Get HTML content from HTML file
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    // To reflect CSS used for screens instead of print
    await page.emulateMediaType('screen');

    // Downlaod the PDF
    const pdf = await page.pdf({
      path: file_path,
      //margin: { top: '0px', right: '0px', bottom: '300px', left: '0px' },
      //printBackground: true,
      format: 'A4',
      displayHeaderFooter: true,
      footerTemplate: footerhtml,
      margin: {
        top: '0px',
        right: '0px',
        bottom: '250px',
        left: '0px'
      }
    });

    // Close the browser instance
    await browser.close();

    res.send(formatResponse({
      file_name: saleData.invoice_number + ".pdf",
      url: getFileAbsulatePath(file_path),
    }, "Invoice pdf"));

  } catch (error) {
    return res.status(errorCodes.default).send(formatErrorResponse(error.toString()));
  }


}

