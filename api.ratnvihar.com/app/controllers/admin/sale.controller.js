const config = require("@config/auth.config");
const { errorCodes, formatErrorResponse, formatResponse } = require("@utils/response.config");
const db = require("@models");
const moment = require('moment');
const {isEmpty, getDateFromToWhere, priceFormat, displayAmount, addLog, getFileAbsulatePath, weightFormat} = require("@helpers/helper");
const {updateOrCreate, removeMaterialFromStock} = require("@library/common");
const { getPaginationOptions } = require('@helpers/paginator')
const {SaleCollection} = require("@resources/superadmin/SaleCollection");
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
const paymentModel = db.payments;
const orderModel = db.orders;

/**
 * Retrieve all sales
 * 
 * @param req
 * @param res
 */
exports.index = async (req, res) => {
  let { page, limit, user_id, search, date_from, date_to } = req.query;
  let conditions = {sale_by: req.userId}
  if(!isEmpty(user_id)){
    conditions.user_id = user_id;
  }
  if(!isEmpty(search)){
    conditions.invoice_number = {[Op.like]: `%${search}%` };
  }
  conditions = {...conditions, ...getDateFromToWhere(date_from, date_to, 'invoice_date')}

  const paginatorOptions = getPaginationOptions(page, limit);
  SaleModel.findAndCountAll({ 
    order:[['id', 'DESC']],
    where: conditions,
    offset: paginatorOptions.offset,
    limit: paginatorOptions.limit,
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
      {
        model: UserModel,
        as: 'user',
      }
    ]
  }).then(async (data) => {
    let result = {
      items: SaleCollection(data.rows),
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

  try {
    //const trans = await sequelize.transaction(async (t) => {

      //insert into sale table
      let invoice_number = data.invoice_number || null;
      let saleObj = {
        user_id: data.user_id,
        order_id: data.order_id || null,
        sale_by: req.userId,
        invoice_number: invoice_number,
        invoice_date: moment(data.invoice_date).format('YYYY-MM-DD'),
        notes: data.notes,
        payment_mode: data.payment_mode,
        transaction_no: data.transaction_no,
        total_amount: priceFormat(data.total_amount),
        cgst_tax: priceFormat(data.cgst_tax),
        sgst_tax: priceFormat(data.sgst_tax),
        igst_tax: priceFormat(data.igst_tax),
        discount: priceFormat(data.discount),
        paid_amount: data.paid_amount ? priceFormat(data.paid_amount) : 0,
        taxable_amount: priceFormat(data.taxable_amount),
        total_payable: priceFormat(data.total_payable),
        due_amount: priceFormat(data.due_amount),
        due_date: moment(data.due_date).format('YYYY-MM-DD'),
        settlement_date: moment(data.settlement_date).format('YYYY-MM-DD'),
      };
      let sale = await SaleModel.create(saleObj);

      //insert into sale product table
      for(let i = 0; i < data.products.length; i++){
        let thisItem = data.products[i];
        let thisObj = {
          sale_id: sale.id,
          stock_id: thisItem.stock_id,
          product_id: thisItem.product_id,
          size_id: thisItem.size_id,
          certificate_no: thisItem.certificate_no,
          total_weight: weightFormat(thisItem.total_weight),
          sub_price: priceFormat(thisItem.sub_price),
          making_charge: priceFormat(thisItem.making_charge),
          rep: priceFormat(thisItem.rep),
          tax: priceFormat(thisItem.tax),
          total: priceFormat(thisItem.total),
          total_discount: priceFormat(thisItem.total_discount)
        }
        let saleProduct = await SaleProductModel.create(thisObj);

        let product = await ProductModel.findByPk(thisItem.product_id);

        //remove stock from superadmin
        if(product.type != "material"){
          await StockModel.destroy({ where: { id: thisItem.stock_id}});
        }

        //insert into sale product materials
        let batch_id = null;
        for(let x = 0; x < thisItem.materials.length; x++){
          let thisMObj = {
            sale_id: sale.id,
            sale_product_id: saleProduct.id,
            material_id: thisItem.materials[x].material_id,
            weight: weightFormat(thisItem.materials[x].weight),
            quantity: thisItem.materials[x].quantity,
            purity_id: thisItem.materials[x].purity_id,
            unit_id: thisItem.materials[x].unit_id,
            rate: thisItem.materials[x].rate,
            amount: thisItem.materials[x].amount,
            discount_amount: thisItem.materials[x].discount_amount,
            discount_percent: thisItem.materials[x].discount_percent
          }
          await SaleProductMaterialModel.create(thisMObj);

          /**
           * remove from stock materials
           */
          if(product.type == "material"){
            let stockMaterial = await StockMaterialModel.findOne({where: {material_id: thisItem.materials[x].material_id, stock_id: thisItem.stock_id}});
            if(stockMaterial){
              await StockMaterialModel.update({
                weight: weightFormat(parseFloat(stockMaterial.weight) - weightFormat(thisItem.materials[x].weight)),
                quantity: (parseInt(stockMaterial.quantity) - parseInt(thisItem.materials[x].quantity))
              },{where: {id: stockMaterial.id}});

              if((parseInt(stockMaterial.quantity) - parseInt(thisItem.materials[x].quantity)) <= 0){
                await StockModel.destroy({ where: { id: thisItem.stock_id}});
              }else{
                let stock = await StockModel.findOne({where: {id: thisItem.stock_id}});
                if(stock){
                  await StockModel.update({
                    quantity: (parseInt(stockMaterial.quantity) - parseInt(thisItem.materials[x].quantity)),
                    total_weight: (parseFloat(stock.total_weight) - weightFormat(thisItem.total_weight)),
                  },{where: {id: thisItem.stock_id}});
                }
              }

            }
            
          }

        }

        /**
        * START - add to admin stock
        */
        let stock = null;
        if(product.type == "material"){
          let quantity = 0;
          for(let x = 0; x < thisItem.materials.length; x++){
            quantity += thisItem.materials[x].quantity ? parseInt(thisItem.materials[x].quantity) : 0;
          }
          let result = await updateOrCreate(StockModel, {product_id: thisItem.product_id, user_id: data.user_id}, {product_id: thisItem.product_id, quantity: quantity, user_id: data.user_id, total_weight: thisItem.total_weight}, null, ['quantity', 'total_weight']);
          stock = result.item;
        }else{
          stock = await StockModel.create({
            user_id: data.user_id,
            product_id: thisItem.product_id,
            size_id: thisItem.size_id,
            certificate_no: thisItem.certificate_no,
            quantity: 1,
            user_id: data.user_id,
            sale_id: sale.id,
            total_weight: thisItem.total_weight
          });
        }

        //insert into stock materials
        let batch_id2 = null;
        for(let x = 0; x < thisItem.materials.length; x++){

          /**
          * add to stock materials
          */
          if(product.type == "material"){
            let stockMaterial = await StockMaterialModel.findOne({where: {stock_id: stock.id, material_id: thisItem.materials[x].material_id}});
            if(stockMaterial){
              await StockMaterialModel.update({
                weight: weightFormat(parseFloat(stockMaterial.weight) + weightFormat(thisItem.materials[x].weight)),
                quantity: (parseInt(stockMaterial.quantity) + parseInt(thisItem.materials[x].quantity)),
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

        }
 
        /**
        * END - add to admin stock
        */


      }

      //update invoice no if not sent
      if(isEmpty(invoice_number)){
        invoice_number = 'RV-S-' + sale.id;
        await SaleModel.update({
          invoice_number: invoice_number
        },{where: {id: sale.id}});
      }

      //insert into payment table
      if(priceFormat(data.paid_amount) > 0){
        await paymentModel.create({
          payment_mode: data.payment_mode,
          amount: priceFormat(data.paid_amount),
          user_id: req.userId,
          payment_by: data.user_id,
          payment_date: moment().format('YYYY-MM-DD'),
          txn_id: data.transaction_no,
          cheque_no: data.cheque_no,
          status: 'success',
          type: 'pay_to_admin',
          table_type: 'sale',
          table_id: sale.id
        });
      }

      //complete order
      if(!isEmpty(data.order_id)){
        await orderModel.update({
          status: 'delivered'
        },{where: {id: data.order_id}});
      }

      res.send(formatResponse([], "Sale successfully!"));
    //});
  } catch (error) {
    addLog("error: " + error.toString())
    return res.status(errorCodes.default).send(formatErrorResponse('Sale does not success due to some error'));
  }

};


/**
 * View Sale
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.view = async (req, res) => {
  let sale = await SaleModel.findOne({ where: { id: req.params.id, sale_by: req.userId },
    include: [
      {
        model: SaleProductModel,
        as: 'saleProducts',
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
      for(let i = 0; i < sale.saleProducts.length; i++){
        let product = sale.saleProducts[i].product;
        if(product){
          if(product.type != "material"){
            await StockModel.update( { deletedAt: null }, { where: {deletedAt: {ne: null}, id: sale.saleProducts[i].stock_id}, paranoid: false  });
            await StockMaterialModel.update( { deletedAt: null }, { where: {deletedAt: {ne: null}, stock_id: sale.saleProducts[i].stock_id}, paranoid: false  });
          }else{
            let result = await updateOrCreate(StockModel, {product_id: product.id, user_id: req.userId}, {product_id: product.id, user_id: req.userId}, null);
            let stock = result.item;
            let totalQnty = 0;
            if(result.created){
              for(let x = 0; x < sale.saleProducts[i].saleMaterials.length; i++){
                let thisItem = sale.saleProducts[i].saleMaterials[x];
                await StockMaterialModel.create({
                  stock_id: stock.id, 
                  material_id: thisItem.material_id,
                  weight: weightFormat(thisItem.weight),
                  quantity: thisItem.quantity
                });
                totalQnty += parseInt(thisItem.quantity);
              }
            }else{
              for(let x = 0; x < sale.saleProducts[i].saleMaterials.length; x++){
                let thisItem = sale.saleProducts[i].saleMaterials[x];
                let stockMaterial = await StockMaterialModel.findOne({where: {stock_id: stock.id, material_id: thisItem.material_id}});
                if(stockMaterial){
                  await StockMaterialModel.update({
                    weight: weightFormat(parseFloat(stockMaterial.weight) + parseFloat(thisItem.weight)),
                    quantity: (parseInt(stockMaterial.quantity) + parseInt(thisItem.quantity))
                  },{where: {id: stockMaterial.id}});
                  totalQnty += thisItem.quantity;
                }
              }
            }
            totalQnty += stock.quantity ? stock.quantity : 0;
            let totalWeight = stock.total_weight ? (parseFloat(stock.total_weight) + parseFloat(sale.saleProducts[i].total_weight)) : parseFloat(sale.saleProducts[i].total_weight);
            await StockModel.update({
              quantity: totalQnty,
              total_weight: weightFormat(totalWeight)
            },{where: {id: stock.id}});
          }
        }
  
      }

      /**
       * Remove from admin stock
       */
      for(let i = 0; i < sale.saleProducts.length; i++){
        let product = sale.saleProducts[i].product;
        if(product){
          if(product.type == "material"){
            let stock2 = await StockModel.findOne({where: {product_id: product.id, user_id: sale.user_id}});
            let quantity = 0;
            for(let mItem of sale.saleProducts[i].saleMaterials){
              let stockM = await StockMaterialModel.findOne({where: {stock_id: stock2.id, material_id: mItem.material_id}});
              if(stockM){
                await StockMaterialModel.update({
                weight: weightFormat(parseFloat(stockM.weight) - parseFloat(mItem.weight)),
                quantity: (parseInt(stockM.quantity) - parseInt(mItem.quantity))
                },{where: {id: stockM.id}});
                quantity += mItem.quantity ? parseInt(mItem.quantity) : 0;
              }
            }
            if(stock2.quantity == quantity){
                await StockModel.destroy({ where: { id: stock2.id}});
            }else{
              await StockModel.update({
              quantity: quantity,
              total_weight: (parseFloat(stock2.total_weight) - parseFloat(sale.saleProducts[i].total_weight))
              },{where: {id: stock2.id}});
            }
          }else{
            await StockModel.destroy({ where: { sale_id: sale.id}});
            
          }
        }

      }
      

      await SaleProductModel.destroy({ where: { sale_id: sale_id}});
      await SaleProductMaterialModel.destroy({ where: { sale_id: sale_id}});
      await SaleModel.destroy({ where: { id: sale_id}});

      res.send(formatResponse([], "Sale deleted successfully!"));
    //});
  } catch (error) {
    return res.status(errorCodes.default).send(formatErrorResponse('Sale does not delete due to some error'));
  }
}


/**
 * Download Invoice
 * 
 * @param {*} req
 * @param {*} res 
 */
exports.downloadInvoice = async (req, res) => {
  let sale = await SaleModel.findOne({ where: { id: req.params.id, sale_by: req.userId },
    include: [
      {
        model: SaleProductModel,
        as: 'saleProducts',
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
  let saleData = SaleCollection(sale);

  //const logoUrl = process.env.BASE_URL + "public/images/logo.png";
  const logoUrl = "file://var/www/html/Prakriti/api.prakriti.one/public/images/logo.png";


  let html = `<!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bill</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <style>
  
      </style>
      </head>
      <body style="box-sizing: border-box; padding: 0px; margin: 0px; font-family:
          'Poppins', sans-serif; font-size: 10px;">
          <div class="invoice" style="max-width: 1000px; margin: auto;
              background-color: #f9f9f9; border: 2px solid #000;">
              <table cellpadding="0" cellspacing="0" width="100%">
                  <tbody>
                      <tr>
                          <td>
                              <table cellspacing="0" cellpadding="0" border="0"
                                  align="center" width="100%">
                                  <tr>
                                      <div style="display: table; width: 100%;
                                          border-bottom: 2px solid #000;">
                                          <div style="display: table-cell; width:
                                              33.33%; padding: 4px 8px;"> 
                                          </div>
                                          <div style="display: table-cell; width:
                                              33.33%; padding: 4px 8px;"><h1
                                                  style="font-size: 14px;
                                                  text-align:
                                                  center; margin: 0px;">Tax
                                                  Invoice</h1></div>
                                          <div style="display: table-cell; width:
                                              33.33%; text-align: right; padding:
                                              4px 8px;"></div>
                                      </div>
                                  </tr>
                              </table>
                              <table cellspacing="0" cellpadding="0" border="0"
                                  align="center" width="100%">
  
  
                                  <!-- <div class="underline" style="display: block; width: 100px; height: 3px; background-color: #000; margin: 0 auto 10px"></div> -->
                                  <tr>
                                      <div style="text-align: center; font-size: 22px;">
                                          <!--<img src="https://ratn-admin.newbazar.in/assets/logo.png" style="width:
                                              220px;"> -->
                                              RATN VIHAR
                                      </div>
                                      <h3 style="margin: 0; font-weight: 400;
                                          font-size: 10px;text-align: center">Head
                                          Office P210
                                          Strand Bank Road Brabzar Kolkata 700
                                          011</h3>
                                      <h3 style="margin: 0; font-weight: 400;
                                          font-size: 10px; text-align: center;">
                                          <strong>GST
                                              IN:</strong> 10CIUPK2654L1ZY | 
                                          <strong>Contact:</strong>
                                          9038377730,9038377731</h3>
                                  </tr>
  
                              </table>
                              <table cellspacing="0" cellpadding="0" border="0"
                                  align="center" width="100%">
                                  <tr>
                                      <td><div style="display: table; width: 100%;
                                              border-top: 2px solid #000;
                                              border-bottom: 2px solid #000;">
                                              <div style="width: 65%; display:
                                                  table-cell;
                                                  vertical-align: top;
                                                  border-right: 2px solid #000;
                                                  padding: 12px;">
  
                                                  <h3 style="margin: 0;
                                                      font-weight: 400;
                                                      font-size: 14px;"><span
                                                          style="font-weight:
                                                          600;">${saleData.user_details.company_name}</span>
                                                      </h3>
                                                  <h3 style="margin: 0;
                                                      font-weight: 400;
                                                      font-size: 10px;"> <span
                                                          style="font-weight:
                                                          600;">Name: </span>
                                                          ${saleData.user_name}</h3>
                                                  <h3 style="margin: 0;
                                                      font-weight: 400;
                                                      font-size: 10px;"> <span
                                                          style="font-weight:
                                                          600;">Contact: </span>
                                                          ${saleData.user_mobile}</h3>
                                                  <h3 style="margin: 0;
                                                      font-weight: 400;
                                                      font-size: 10px;"> <span
                                                          style="font-weight:
                                                          600;">Address: </span>
                                                          ${saleData.user_details.address}</span></h3>
                                              </div>
                                              <div style="width: 35%; display:
                                                  table-cell;
                                                  vertical-align: top;
                                                  text-align:
                                                  right; padding: 12px;">
                                                  <h3 style="margin: 0;
                                                      font-weight: 400;
                                                      font-size: 10px;">
                                                      <span
                                                      style="font-weight:
                                                      600;">Invoice
                                                      Date: </span> 
                                                      ${saleData.invoice_date}</h3>
                                                  <h3 style="margin: 0;
                                                      font-weight: 400;
                                                      font-size: 10px;">
                                                      <span
                                                      style="font-weight:
                                                      600;">Invoice
                                                      No: </span> ${saleData.invoice_number}
                                          </h3>
                                                  <h3 style="margin: 0;
                                                      font-weight: 400;
                                                      font-size: 10px;">
                                                      <span
                                                      style="font-weight:
                                                      600;">User Id: </span>  
                                                      RV${saleData.user_details.id}</h3>
                                              </div>
                                          </div></td>
                                  </tr>
  
                              </table>
                              <table cellspacing="0" cellpadding="5" border="0"
                                  align="center" width="100%">
                                  <thead>
                                      <tr style="background-color: #000;">
                                          <th style="text-align: left; color:
                                              #fff; border: 1px solid #000;">SL#</th>
                                          <th style="text-align: left; color:
                                              #fff;">Product Name</th>
                                          <th style="text-align: left; color:
                                              #fff;">Size</th>
                                          <th style="text-align: left; color:
                                              #fff;">Product Id</th>
                                          <th style="text-align: left; color:
                                              #fff;">Matl Cost</th>
                                          <th style="text-align: left; color:
                                              #fff;">Tag Price</th>
                                          <th style="text-align: left; color:
                                              #fff;">Disc</th>
                                          <th style="text-align: left; color:
                                              #fff;">Total</th>
                                      </tr>
                                  </thead>
                                  <tbody>`;
                                  for(let i = 0; i < saleData.products.length; i++){
                                      html += `<tr style="background-color: #ddd;">
                                          <td style="border: 1px solid #000;">
                                              ${i+1}
                                          </td>
                                          <td style="border: 1px solid #000;">
                                          ${saleData.products[i].product_name}
                                          </td>
                                          <td style="border: 1px solid #000;">
                                          ${saleData.products[i].size_name}
                                          </td>
                                          <td colspan="5" style="border: 1px solid
                                              #000;">
                                              ${saleData.products[i].product_code}
                                          </td>
                                      </tr><tr style="background-color: #fff;
                                            vertical-align: top;">`;
                                      html += `<td colspan="3" style="border: 1px solid
                                      #000;">`;
                                      for(let x = 0; x < saleData.products[i].materials.length; x++){
                                        html += `<div> <span>${saleData.products[i].materials[x].material_name}</span> <span>${saleData.products[i].materials[x].weight}${saleData.products[i].materials[x].unit_name}</span> X <span>${saleData.products[i].materials[x].rate}</span> = <span>${saleData.products[i].materials[x].amount}</span></div>`;
                                            
                                      }
                                      html += `</td>`;
                                      html += `<td style="border: 1px solid #000;">`;
                                      for(let x = 0; x < saleData.products[i].materials.length; x++){
                                        html += `<div>`;
                                        if(isEmpty(saleData.products[i].materials[x].discount_amount)){
                                          html += `-`;
                                        }else{
                                          html += `<span>Discount@${saleData.products[i].materials[x].discount_amount}%</span>
                                          <span>${saleData.products[i].materials[x].discount_amount_display}</span>`;
                                        }
                                        html += `</div>`;
                                      }
                                                
                                      html += `</td><td style="border: 1px solid #000;">`;
                                      for(let x = 0; x < saleData.products[i].materials.length; x++){
                                        html += `<div> <span>${priceFormat(saleData.products[i].materials[x].rate - saleData.products[i].materials[x].discount_amount)} </span> @${saleData.products[i].materials[x].discount_amount}% =
                                        <span>${saleData.products[i].materials[x].rate}</span></div>`;
                                      }
                                      html += `      
                                            </td style="border: 1px solid #000;">
                                            <td style="border: 1px solid #000;">
                                              ${displayAmount(saleData.products[i].making_charge + saleData.products[i].sub_price)}
                                            </td>
                                            <td style="border: 1px solid #000;">
                                            ${saleData.products[i].total_discount_display}
                                            </td>
                                            <td style="border: 1px solid #000;">
                                            ${saleData.products[i].total_display}
                                            </td></tr>`;
                                      }
                                      html += `<tr style="background-color: #ddd;
                                          vertical-align: top;">
                                          <td colspan="5"
                                              style="background-color:#fff;
                                              border:none;">
  
                                          </td>
                                          <td style="border: 1px solid #000;">
                                              <div>
                                                  <h4 style="margin: 0;
                                                      text-align: center;"> Tag
                                                      Price <span>${saleData.total_amount}</span></h4>
                                              </div>
                                          </td>
                                          <td style="border: 1px solid #000;">
                                              <div>
                                                  <h4 style="margin: 0;
                                                      text-align: center;">
                                                      Discount <span>${saleData.discount}%</span></h4>
                                              </div>
                                          </td>
                                          <td style="border: 1px solid #000;">
                                              <div>
                                                  <h4 style="margin: 0;
                                                      text-align: center;"> Gross
                                                      Amt <span>${saleData.total_payable}</span></h4>
                                              </div>
                                          </td>
  
                                      </tr>
                                  </tbody>
                              </table>
                              <br>
                              <table cellspacing="0" cellpadding="0" border="0"
                                  align="center" width="100%">
                                  <tr>
                                      <td style="padding: 12px;">
                                          <div style="display: table; width:
                                              100%;">`;
                                              if(!isEmpty(saleData.notes)){
                                              html += `<div style="width: 25%; padding-right: 1%;
                                                  vertical-align: top;">
                                                  <table cellspacing="0"
                                                      cellpadding="5"
                                                      border="1"
                                                      align="center" width="100%">
                                                      <tr>
                                                          <th>Remark</th>
                                                      </tr>
                                                      <tr>
                                                          <td>${saleData.notes}</td>
                                                      </tr>
                                                  </table>
                                                </div>`;
                                              }
                                              html += `<!--<div style="width: 50%; display:
                                                  table-cell; padding-right: 1%;
                                                  vertical-align: top;">
                                                  <table cellspacing="0"
                                                      cellpadding="5"
                                                      border="1"
                                                      align="center" width="100%">
                                                      <tr style="background-color:
                                                          #000;
                                                          color: #fff;">
                                                          <th>SL</th>
                                                          <th>PayDate</th>
                                                          <th>Mode of Payment</th>
                                                          <th>Amount</th>
                                                      </tr>
                                                      <tr style="background-color:
                                                          #ddd;">
                                                          <td>01</td>
                                                          <td>01/12/2022</td>
                                                          <td>NEFT765/9UYT </td>
                                                          <td>5000</td>
                                                      </tr>
                                                      <tr>
                                                          <td>02</td>
                                                          <td>01/12/2022</td>
                                                          <td>NEFT765/9UYT </td>
                                                          <td>5000</td>
                                                      </tr>
                                                      <tr style="background-color:
                                                          #ddd;">
                                                          <td>03</td>
                                                          <td>01/12/2022</td>
                                                          <td>NEFT765/9UYT </td>
                                                          <td>5000</td>
                                                      </tr>
                                                  </table>
                                              </div>
                                              <div style="width: 25%; display:
                                                  table-cell; vertical-align:
                                                  top;">
                                                  <table cellspacing="0"
                                                      cellpadding="5"
                                                      border="1"
                                                      align="center" width="100%">
                                                      <tr>
                                                          <td>
                                                              <div style="display:
                                                                  table;
                                                                  width: 100%;">
                                                                  <div
                                                                      style="display:
                                                                      table-cell;
                                                                      width:
                                                                      50%;">Sub
                                                                      Total</div>
                                                                  <div
                                                                      style="display:
                                                                      table-cell;
                                                                      width:
                                                                      50%;"> 23002</div>
                                                              </div>
                                                          </td>
  
                                                      </tr>
                                                      <tr>
                                                          <td>
                                                              <div style="display:
                                                                  table;
                                                                  width: 100%;">
                                                                  <div
                                                                      style="display:
                                                                      table-cell;
                                                                      width:
                                                                      50%;">CGST</div>
                                                                  <div
                                                                      style="display:
                                                                      table-cell;
                                                                      width:
                                                                      50%;"> 230</div>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td>
                                                              <div style="display:
                                                                  table;
                                                                  width: 100%;">
                                                                  <div
                                                                      style="display:
                                                                      table-cell;
                                                                      width:
                                                                      50%;">SGST</div>
                                                                  <div
                                                                      style="display:
                                                                      table-cell;
                                                                      width:
                                                                      50%;"> 230</div>
                                                              </div>
                                                          </td>
                                                      </tr>
  
  
                                                  </table>
                                              </div>-->
                                          </div>
                                      </td>
                                  </tr>
                              </table>
  
                              <table cellspacing="0" cellpadding="0" border="0"
                                  align="center" width="100%">
                                  <tbody>
                                      <tr>
                                          <hr style="border: 1px solid #000">
                                      </tr>
                                  </tbody>
                              </table>
  
                              <table cellspacing="0" cellpadding="0" border="0"
                                  align="center" width="100%">
                                  <div style="display: table; width: 100%;">
                                      <div style="display: table-cell; width:
                                          70%;">
                                          <h5 style="margin: 0px; padding: 5px
                                              12px; font-size: 14px; font-weight:
                                              600; text-transform: uppercase;">Notice</h5>
                                          <ul style="margin-bottom: 12px;">
                                              <li>Goods once sold will be taken
                                                  back with condition</li>
                                              <li>Minimum product value of Rs
                                                  5000/- above</li>
                                              <li>Returning Less than 25-30% of
                                                  billing amount</li>
                                              <li>Damage charge as per making cost
                                                  only</li>
                                              <li>Sale product return within 7
                                                  days from bill date</li>
                                              <li>All disputes are subject to
                                                  Patna Juridiction only</li>
                                          </ul>
                                      </div>
                                      <div style="display: table-cell; width:
                                          30%;">
                                          <!-- <div>
                                              <h4 style="margin-bottom: 10px; text-align: center;">Return %</h4>
                                              <input type="text" style="display: block; margin: auto; height: 38px;">
                                          </div>
                                          <div>
                                              <h4 style="margin-top: 10px; margin-bottom: 10px; text-align: center;">Customer Signature</h4>
                                              <input type="text" style="display: block; margin: auto; height: 38px;">
                                              
                                          </div> -->
                                      </div>
  
                                  </div>
                              </table>
                              <table cellspacing="0" cellpadding="0" border="0"
                                  align="center" width="100%">
                                  <tr>
                                      <td>
                                          <div style="display: table; width: 100%; border-top: 2px solid #000; border-bottom: 2px solid #000;">
                                              <div style="display: table-cell; width:
                                                  50%;">
                                                  <h2 style="margin: 0; font-size: 10px; text-align: center; padding-top: 14px;">Customer Signature</h2>
                                                  </div>
                                                  <div style="display: table-cell; width:
                                                  50%;">
                                              <h2 style="margin: 0; font-size: 10px; text-align: center; padding-top: 30px; padding-bottom: 4px;">For Prakriti</h2>    
                                              </div>
                                          </div>
                                      </td>
                                  </tr>
                                  
                              </table>
                              <h3 style="text-align: right; margin-bottom: 0;
                                  color: #333; font-weight: 400; font-size:
                                  10px; padding-right: 12px; ">Comprised bill
                                  valid with signature and stamp only</h3>
                              <h4 style="text-align: center; margin-bottom: 8px; margin-top: 10px;">Thank
                                  You! Visit Again.</h4>
  
                          </td>
                      </tr>
  
                  </tbody>
              </table>
          </div>
      </body>
  </html>`;

  var options = { 
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: ''
    },
    footer: {
        height: "28mm",
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
    console.error(error);
  });
}