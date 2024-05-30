const config = require("@config/auth.config");
const { errorCodes, formatErrorResponse, formatResponse } = require("@utils/response.config");
const db = require("@models");
const moment = require('moment');
const {isEmpty, getDateFromToWhere, priceFormat, formatDateTime, weightFormat, addLog, convertUnitToGram} = require("@helpers/helper");
const {updateOrCreate, removeMaterialFromStock, getWalletBalance, getSuperAdminId, getWorkingUserID} = require("@library/common");
const { getPaginationOptions } = require('@helpers/paginator')
const {PurchaseListCollection} = require("@resources/superadmin/PurchaseListCollection");
const {PurchaseEditCollection} = require("@resources/superadmin/PurchaseEditCollection");
const {PurchaseViewCollection} = require("@resources/superadmin/PurchaseViewCollection");
const { Op } = require("sequelize");
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

/**
 * Retrieve all purchase
 * 
 * @param req
 * @param res
 */
exports.index = async (req, res) => {
  let { page, limit, supplier_id, load_payments, search, date_from, date_to, status } = req.query;
  let conditions = {user_id: req.userId};
  if(status !== undefined && status != ""){
    conditions.is_approved = status;
  }
  if(!isEmpty(supplier_id)){
    conditions.supplier_id = supplier_id;
  }
  if(!isEmpty(search)){
    conditions.invoice_number = {[Op.like]: `%${search}%` };
  }
  conditions = {...conditions, ...getDateFromToWhere(date_from, date_to, 'invoice_date')}

  const paginatorOptions = getPaginationOptions(page, limit);
  PurchaseModel.findAndCountAll({ 
    order:[['id', 'DESC']],
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
 * Store purchase
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.store = async (req, res) => {
  let data = req.body;

  if(!isEmpty(data.invoice_number)){
    let purchaseData = await PurchaseModel.findOne({where: {invoice_number: data.invoice_number}});
    if(purchaseData){
      return res.status(errorCodes.default).send(formatErrorResponse('Invoice number is exists.'));
    }
  }

  if(priceFormat(data.paid_amount) > 0){
    let wallet_balance = await getWalletBalance(req.userId, data.payment_mode);
    if(priceFormat(data.paid_amount) > wallet_balance){
      return res.status(errorCodes.default).send(formatErrorResponse('Insufficient wallet balance.'));
    }
  }

  try {
    const trans = await sequelize.transaction(async (t) => {

      //insert into purchase table
      let invoice_number = data.invoice_number || null;
      let req_data = data; //JSON.stringify(data);
      //req_data = new Buffer.from(req_data).toString("base64");
      let status = "due", paid_amount = 0, due_amount = 0;
      if(data.payment_mode != "cheque"){
        status = (priceFormat(data.paid_amount) >= priceFormat(data.total_payable)) ? 'paid' : 'due';
        paid_amount = data.paid_amount ? priceFormat(data.paid_amount) : 0;
        due_amount = priceFormat(data.due_amount);
      }else{
        due_amount = priceFormat(data.total_payable);
      }
      let purchaseObj = {
        supplier_id: data.supplier_id,
        user_id: req.userId,
        invoice_number: invoice_number,
        invoice_date: moment(data.invoice_date).format('YYYY-MM-DD'),
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
        is_approved: 0,
        //req_data: req_data
      };
      let purchase = await PurchaseModel.create(purchaseObj, { transaction: t });

      //insert into purchase product table
      for(let i = 0; i < data.products.length; i++){
        let thisItem = data.products[i];
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
        for(let x = 0; x < thisItem.materials.length; x++){
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

          /*if(!isEmpty(worker_id)){
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
      if(isEmpty(invoice_number)){
        invoice_number = 'RV-P-' + purchase.id;
      }

      req_data = JSON.stringify(req_data);
      req_data = new Buffer.from(req_data).toString("base64");
      await PurchaseModel.update({
        invoice_number: invoice_number,
        req_data: req_data
      },{where: {id: purchase.id}, transaction: t});
      

      //insert into payment table
      if(priceFormat(data.paid_amount) > 0){
        await paymentModel.create({
          payment_mode: data.payment_mode,
          amount: priceFormat(data.paid_amount),
          user_id: data.supplier_id,
          payment_by: req.userId,
          payment_date: moment().format('YYYY-MM-DD'),
          txn_id: data.transaction_no,
          cheque_no: data.cheque_no,
          status: 'success',
          type: 'purchase',
          table_type: 'purchase',
          table_id: purchase.id,
          payment_belongs: req.userId,
          purpose: 'purchase'
        });
      }
      

      res.send(formatResponse([], "Purchase successfully!"));
    });
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
  if(!isEmpty(supplier_id)){
    conditions.supplier_id = supplier_id;
  }
  if(!isEmpty(search)){
    conditions.invoice_number = {[Op.like]: `%${search}%` };
  }
  conditions.is_approved = {[Op.eq]: 0};

  conditions = {...conditions, ...getDateFromToWhere(date_from, date_to, 'invoice_date')}

  const paginatorOptions = getPaginationOptions(page, limit);
  PurchaseModel.findAndCountAll({ 
    order:[['id', 'DESC']],
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
  let purchase = await PurchaseModel.findOne({ where: { id: req.params.id },
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
  let purchase = await PurchaseModel.findOne({ where: { id: req.params.id },
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
  
  try{
    const trans = await sequelize.transaction(async (t) => {
      let purchaseObj = {
        is_approved: data.approve_status
      };
      await PurchaseModel.update(purchaseObj,{where: {id: purchase.id}, transaction: t});

      /**
       * START - add to super admin stock
       */
      if(data.approve_status == 1){
        let req_data = purchase.req_data;
        if(!isEmpty(req_data)){
          req_data = new Buffer.from(req_data, "base64").toString('ascii');
          req_data = JSON.parse(req_data);
          for(let i = 0; i < req_data.products.length; i++){
            let thisItem = req_data.products[i];
            let worker_id = thisItem.worker_id || null;

            let product = await ProductModel.findByPk(thisItem.product_id);
            let stock = null;
            if(product.type == "material"){
              let quantity = 0;
              for(let x = 0; x < thisItem.materials.length; x++){
                quantity += thisItem.materials[x].quantity ? parseInt(thisItem.materials[x].quantity) : 0;
              }
              let result = await updateOrCreate(StockModel, {
                product_id: thisItem.product_id, 
                user_id: req.userId
              }, {
                product_id: thisItem.product_id, 
                quantity: quantity,
                total_weight: thisItem.total_weight
              }, t, ['quantity', 'total_weight']);
              stock = result.item;
            }else{
              stock = await StockModel.create({
                user_id: req.userId,
                purchase_id: purchase.id,
                purchase_product_id: thisItem.id,
                product_id: thisItem.product_id,
                size_id: thisItem.size_id || null,
                certificate_no: thisItem.certificate_no,
                quantity: 1,
                total_weight: thisItem.total_weight
              }, { transaction: t });
            }

            let batch_id = null;
            for(let x = 0; x < thisItem.materials.length; x++){
              if(!isEmpty(worker_id)){
                let stockH = await stockHistoryModel.create({
                  from_user_id: worker_id,
                  to_user_id: req.userId,
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
              }

              /**
               * add to stock materials
               */
              if(product.type == "material"){
                let stockMaterial = await StockMaterialModel.findOne({where: {stock_id: stock.id, material_id: thisItem.materials[x].material_id}});
                if(stockMaterial){
                  let thisquantity = thisItem.materials[x].quantity ? (stockMaterial.quantity + thisItem.materials[x].quantity) : stockMaterial.quantity;
                  await StockMaterialModel.update({
                    weight: weightFormat(parseFloat(stockMaterial.weight) + weightFormat(thisItem.materials[x].weight)),
                    weight_in_gram: weightFormat(parseFloat(stockMaterial.weight_in_gram) + weightFormat(thisItem.materials[x].weight_in_gram)),
                    quantity: thisquantity,
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
                    quantity: thisItem.materials[x].quantity || 0,
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
                  quantity: thisItem.materials[x].quantity || 0,
                  purity_id: thisItem.materials[x].purity_id,
                  unit_id: thisItem.materials[x].unit_id,
                  category_id: product.category_id
                }, { transaction: t });
              }
            }
          }

          //delete all payment
          await paymentModel.destroy({ where: {
            table_type: 'purchase',
            table_id: purchase.id
          }, transaction: t});

          if(!isEmpty(purchase.paid_amount)){
            await PurchaseModel.update({
              paid_amount: 0,
              due_amount: purchase.total_payable,
              status: 'due'
            },{where: {id: purchase.id}, transaction: t});
          }
 
        }
      }

      res.send(formatResponse([], "Purchase Status Changed successfully!"));
    });

  } catch (error) {
    addLog('err: ' + error.toString())
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
  let purchase = await PurchaseModel.findOne({ where: { id: req.params.id },
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
 * edit data for Purchase
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.edit = async (req, res) => {
  let purchase = await PurchaseModel.findOne({ where: { id: req.params.id },
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
      }
    ]
  });
  if (!purchase) {
    return res.status(errorCodes.default).send(formatErrorResponse('Purchase not found'));
  }
  res.send(formatResponse(PurchaseEditCollection(purchase), "Purchase edit details"));
};




/**
 * Update Product
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.update = async (req, res) => {
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

  let data = req.body;
  try {

    const trans = await sequelize.transaction(async (t) => {

      //remove from stock history
      await stockHistoryModel.destroy({ where: { purchase_id: purchase.id}, transaction: t});

      //update purchase table
      let invoice_number = data.invoice_number || null;
      let purchaseObj = {
        supplier_id: data.supplier_id,
        invoice_number: invoice_number,
        invoice_date: (formatDateTime(purchase.invoice_date, 9) == data.invoice_date) ? moment(purchase.invoice_date).format('YYYY-MM-DD') : moment(data.invoice_date).format('YYYY-MM-DD'),
        notes: data.notes,
        payment_mode: data.payment_mode,
        transaction_no: data.transaction_no,
        total_amount: priceFormat(data.total_amount),
        tax: priceFormat(data.tax),
        discount: priceFormat(data.discount),
        paid_amount: priceFormat(data.paid_amount),
        taxable_amount: priceFormat(data.taxable_amount),
        total_payable: priceFormat(data.total_payable),
        due_amount: priceFormat(data.due_amount),
        due_date: (formatDateTime(purchase.due_date, 9) == data.due_date) ? moment(purchase.due_date).format('YYYY-MM-DD') : moment(data.due_date).format('YYYY-MM-DD'),
      };
      await PurchaseModel.update(purchaseObj,{where: {id: purchase.id}, transaction: t});

      //remove old product & materials from stock
      let userID = await getWorkingUserID(req);
      await removeMaterialFromStock(purchase, t, userID);

      //update purchase product table
      let ppIds = [], pmIds = [];
      for(let i = 0; i < data.products.length; i++){
        let thisItem = data.products[i];
        let worker_id = thisItem.worker_id || null;
        let thisObj = {
          purchase_id: purchase.id,
          worker_id: worker_id,
          product_id: thisItem.product_id,
          size_id: thisItem.size_id,
          certificate_no: thisItem.certificate_no,
          total_weight: priceFormat(thisItem.total_weight),
          sub_price: priceFormat(thisItem.sub_price),
          making_charge: priceFormat(thisItem.making_charge),
          rep: priceFormat(thisItem.rep),
          tax: priceFormat(thisItem.tax),
          total: priceFormat(thisItem.total),
        }
        let purchaseProduct = null;
        if(thisItem.id == 0){
          let quantity = 0;
          for(let x = 0; x < thisItem.materials.length; x++){
            quantity += thisItem.materials[x].quantity ? parseInt(thisItem.materials[x].quantity) : 0;
          }

          purchaseProduct = await PurchaseProductModel.create(thisObj, { transaction: t });
        }else{
          purchaseProduct = await PurchaseProductModel.update(thisObj,{where: {id: thisItem.id}, transaction: t});
        }
        ppIds.push(purchaseProduct.id);

        /**
         * update to stock
         */
        let product = await ProductModel.findByPk(thisItem.product_id);
        let stock = null;
        if(product.type == "material"){
          let quantity = 0;
          for(let x = 0; x < thisItem.materials.length; x++){
            quantity += thisItem.materials[x].quantity ? parseInt(thisItem.materials[x].quantity) : 0;
          }
          let result = await updateOrCreate(StockModel, {product_id: thisItem.product_id, user_id: req.userId}, {product_id: thisItem.product_id, quantity: quantity, total_weight: thisItem.total_weight}, t, ['quantity', 'total_weight']);
          stock = result.item;
        }else{
          let result = await updateOrCreate(StockModel, {purchase_id: purchase.id, user_id: req.userId}, {
            user_id: req.userId,
            purchase_id: purchase.id,
            product_id: thisItem.product_id,
            size_id: thisItem.size_id,
            certificate_no: thisItem.certificate_no,
            quantity: 1,
            total_weight: thisItem.total_weight
          }, t);
          stock = result.item;
        }

        //update purchase product materials
        let batch_id = null;
        for(let x = 0; x < thisItem.materials.length; x++){
          let thisMObj = {
            purchase_id: purchase.id,
            purchase_product_id: purchaseProduct.id,
            material_id: thisItem.materials[x].material_id,
            weight: priceFormat(thisItem.materials[x].weight),
            quantity: thisItem.materials[x].quantity,
            purity_id: thisItem.materials[x].purity_id,
            unit_id: thisItem.materials[x].unit_id,
            rate: thisItem.materials[x].rate,
            amount: thisItem.materials[x].amount
          }
          let purchaseProductM = null
          if(thisItem.materials[x].id == 0){
            purchaseProductM = await PurchaseProductMaterialModel.create(thisMObj, { transaction: t });
          }else{
            purchaseProductM = await PurchaseProductMaterialModel.update(thisMObj, {where: {id: thisItem.materials[x].id}, transaction: t});
          }

          if(!isEmpty(worker_id)){
            let stockH = await stockHistoryModel.create({
              from_user_id: worker_id,
              to_user_id: req.userId,
              material_id: thisItem.materials[x].material_id,
              weight: priceFormat(thisItem.materials[x].weight),
              unit_id: thisItem.materials[x].unit_id,
              quantity: thisItem.materials[x].quantity,
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
          }

          /**
           * add to stock materials
           */
           if(product.type == "material"){
            let stockMaterial = await StockMaterialModel.findOne({where: {stock_id: stock.id, material_id: thisItem.materials[x].material_id}});
            if(stockMaterial){
              await StockMaterialModel.update({
                weight: priceFormat(stockMaterial.weight + priceFormat(thisItem.materials[x].weight)),
                quantity: (stockMaterial.quantity + thisItem.materials[x].quantity),
                purity_id: thisItem.materials[x].purity_id,
                unit_id: thisItem.materials[x].unit_id
              },{where: {id: stockMaterial.id}, transaction: t});
            }else{
              await StockMaterialModel.create({
                stock_id: stock.id, 
                material_id: thisItem.materials[x].material_id,
                weight: priceFormat(thisItem.materials[x].weight),
                quantity: thisItem.materials[x].quantity,
                purity_id: thisItem.materials[x].purity_id,
                unit_id: thisItem.materials[x].unit_id
              }, { transaction: t });
            }
          }else{
            let result = await updateOrCreate(StockMaterialModel, {
              stock_id: stock.id, 
              material_id: thisItem.materials[x].material_id
            }, {
              stock_id: stock.id, 
              material_id: thisItem.materials[x].material_id,
              weight: priceFormat(thisItem.materials[x].weight),
              quantity: thisItem.materials[x].quantity,
              purity_id: thisItem.materials[x].purity_id,
              unit_id: thisItem.materials[x].unit_id
            }, t);
          }

        }

      }

      //update invoice no if not sent
      if(isEmpty(invoice_number)){
        invoice_number = 'RVINV' + purchase.id;
        await PurchaseModel.update({
          invoice_number: invoice_number
        },{where: {id: purchase.id}, transaction: t});
      }

      res.send(formatResponse([], "Purchase updated successfully!"));
    });
  } catch (error) {
    return res.status(errorCodes.default).send(formatErrorResponse('Purchase does not update due to some error'));
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
      let userID = await getWorkingUserID(req);
      await removeMaterialFromStock(purchase, t, userID);

      await PurchaseProductModel.destroy({ where: { purchase_id: purchase_id}, transaction: t});
      await PurchaseProductMaterialModel.destroy({ where: { purchase_id: purchase_id}, transaction: t});
      await PurchaseModel.destroy({ where: { id: purchase_id}, transaction: t});

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
  let purchase = await PurchaseModel.findOne({order:[['id', 'DESC']]});
  let next_invoice = 'RV-P-' + (purchase ? (purchase.id + 1) : 1);

  res.send(formatResponse({next_invoice: next_invoice}));
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
  let purchase = await PurchaseModel.findOne({ where: { id: req.params.id }});
  if (!purchase) {
    return res.status(errorCodes.default).send(formatErrorResponse('Purchase not found'));
  }

  try{
    const trans = await sequelize.transaction(async (t) => {

      //insert into return table
      const returnObj = await ReturnModel.create({
        user_id: req.userId,
        table_id: purchase.id,
        table_type: 'purchases',
        notes: data.notes,
        payment_mode: data.payment_mode,
        txn_id: data.transaction_no,
        cheque_no: data.cheque_no,
        status: "success",
        total_amount: data.return_amount,
        accepted_at: moment().format('YYYY-MM-DD'),
        return_date: data.return_date ? moment(data.return_date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')
      }, { transaction: t });

      for(let i = 0; i < return_products.length; i++){
        if(!return_products[i].is_return){
          continue;
        }

        //fetch purchase product by id
        let purchaseProduct = await PurchaseProductModel.findOne({
          where: {id: return_products[i].id},
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
        });

        //insert into return product table
        let returnProduct = await ReturnProductModel.create({
          return_id: returnObj.id,
          table_id: purchaseProduct.id,
          table_type: 'purchase_products',
          sub_total: return_data.products[i].return_amount
        }, { transaction: t });

        //insert into return product materials table
        for(let x = 0; x < return_data.products[i].materials.length; x++){
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
        }

        //update purchase product is return and return weight & qty into purchase product material table
        if(return_data.products[i].product_type == 'material'){
          let total_return_weight = parseFloat(purchaseProduct.purchaseMaterials[0].return_weight) + parseFloat(return_data.products[i].materials[0].return_weight);
          let total_return_qty = parseInt(purchaseProduct.purchaseMaterials[0].return_qty) + parseInt(return_data.products[i].materials[0].return_qty);
          let is_return = (total_return_qty >= parseInt(purchaseProduct.purchaseMaterials[0].quantity) || total_return_weight >= parseFloat(purchaseProduct.purchaseMaterials[0].weight)) ? true : false;

          await PurchaseProductModel.update({is_return: is_return}, {where: {id: purchaseProduct.id}, transaction: t});
          await PurchaseProductMaterialModel.update({
            return_qty: total_return_qty,
            return_weight: total_return_weight
          }, {where: {id: purchaseProduct.purchaseMaterials[0].id}, transaction: t});

        }else{
          await PurchaseProductModel.update({is_return: true}, {where: {id: purchaseProduct.id}, transaction: t});
        }

        /**
         * START - Remove from stock table
         */
        if(purchase.is_approved == 1){
          let stock = null;
          if(return_data.products[i].product_type == "material"){
            stock = await StockModel.findOne({where: {product_id: return_data.products[i].product_id, user_id: req.userId}});
            let quantity = 0, unit_name = '';
            for(let mItem of return_data.products[i].materials){
              let stockM = await StockMaterialModel.findOne({where: {stock_id: stock.id, material_id: mItem.material_id}});
              if(stockM){
                await StockMaterialModel.update({
                weight: weightFormat(parseFloat(stockM.weight) - parseFloat(mItem.return_weight)),
                quantity: (parseInt(stockM.quantity) - parseInt(mItem.return_qty))
                },{where: {id: stockM.id}});
                quantity += mItem.return_qty ? parseInt(mItem.return_qty) : 0;
              }
              unit_name = mItem.unit_name;
            }
            if(stock.quantity <= quantity){
              await StockModel.destroy({ where: { id: stock.id}});
            }else{
              let return_weight_in_gram = convertUnitToGram(unit_name, return_data.products[i].materials[0].return_weight);
              await StockModel.update({
                quantity: (stock.quantity - quantity),
                total_weight: (stock.total_weight - return_weight_in_gram)
              },{where: {id: stock.id}});
            }
              
          }else{
            let stock = await StockModel.findOne({where: {purchase_product_id: purchaseProduct.id}})
            if(stock){
              await StockModel.destroy({ where: { id: stock.id}});
              await StockMaterialModel.destroy({ where: { stock_id: stock.id}});
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
        if(advance_amount > 0){
          // let supplier = await UserModel.findByPk(purchase.supplier_id);
          // if(supplier){
          //   advance_amount = priceFormat(advance_amount + supplier.advance_amount);
          //   await UserModel.update({advance_amount: advance_amount}, {where: {id: purchase.supplier_id}, transaction: t});
          // }
        }
  
        await PurchaseModel.update({
          return_amount: return_amount,
          total_payable: total_payable,
          due_amount: due_amount
        }, {where: {id: req.params.id}, transaction: t});

      }
      res.send(formatResponse([], "Returned successfully!"));
    });

  } catch (error) {
    addLog('err: ' + error.toString())
    return res.status(errorCodes.default).send(formatErrorResponse(errorCodes.defaultErrorMsg));
  }

}