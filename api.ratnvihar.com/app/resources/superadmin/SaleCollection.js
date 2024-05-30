const { isObject, formatDateTime, ucWords, displayAmount, priceFormat, weightFormat } = require("@helpers/helper");
const { isEmpty } = require("lodash");

const SaleCollection = (data) => {
    if(isObject(data)){
        return getModelObject(data);
    }else{
        let arr = [];
        for(let i = 0; i < data.length; i++){
            arr.push(getModelObject(data[i]));
        }
        return arr;
    }
}

const getModelObject = (data) => {
    let products = [], total_sub_total = 0;
    for(let i = 0; i < data.saleProducts.length; i++){
        let item = data.saleProducts[i];
        let materials = [];
        for(let x = 0; x < item.saleMaterials.length; x++){
            let thisM = item.saleMaterials[x];
            let return_weight = weightFormat(thisM.return_weight);
            let return_qty = thisM.return_qty ? parseInt(thisM.return_qty) : 0;
            materials.push({
                id: thisM.id,
                material_id: thisM.material_id,
                material_name: thisM.material ? thisM.material.name : '',
                weight: weightFormat(thisM.weight),
                quantity: thisM.quantity,
                unit_name: (thisM.unit) ? thisM.unit.name : '',
                purity_id: thisM.purity_id,
                purity_name: thisM.purity ? thisM.purity.name : '',
                unit_id: thisM.unit_id,
                rate_display: displayAmount(thisM.rate),
                rate: priceFormat(thisM.rate),
                amount: displayAmount(thisM.amount),
                discount_amount: priceFormat(thisM.discount_amount),
                discount_amount_display: displayAmount(thisM.discount_amount, false, true, false),
                discount_percent: thisM.discount_percent,
                material_cost: priceFormat(thisM.amount - thisM.discount_amount),
                return_weight: return_weight,
                return_qty: return_qty
            });
            
        }

        total_sub_total += priceFormat(item.sub_price - item.total_discount);

        products.push({
            id: item.product ? item.product.id : 0,
            product_name: item.product ? item.product.name : '',
            product_type: item.product ? item.product.type : '',
            product_code: item.product ? item.product.product_code : '',
            category_name: (item.product && item.product.category) ? item.product.category.name : '',
            size_name: item.size ? item.size.name : '',
            certificate_no: item.certificate_no,
            total_weight: item.total_weight,
            sub_price: displayAmount(item.sub_price),
            making_charge: priceFormat(item.making_charge),
            making_charge_discount: priceFormat(item.making_charge_discount),
            making_charge_discount_amount: priceFormat(item.making_charge_discount_amount),
            making_charge_display: displayAmount(item.making_charge),
            rep: displayAmount(item.rep),
            tax: displayAmount(item.tax),
            total: priceFormat(item.total),
            total_display: displayAmount(item.total),
            total_discount: priceFormat(item.total_discount),
            total_discount_display: displayAmount(item.total_discount),
            materials: materials,
            total_making_charge_discount: priceFormat(priceFormat(item.making_charge) - priceFormat(item.making_charge_discount_amount)),
            sub_total: displayAmount(item.sub_price - item.total_discount),
            is_return: item.is_return
        });

    }

    let approve_status = 'Pending';
    if(data.is_approved == 1){
        approve_status = "Accepted";
    }else if(data.is_approved == 2){
        approve_status = "Declined";
    }else if(data.is_approved == 3){
        approve_status = "On Approval";
    }else if(data.is_approved == 4){
        approve_status = "Transfer To Sale";
    }
    if(data.status == "returned"){
        approve_status = "Returned";
    }else if(data.status == "return_pending"){
        approve_status = "Return Pending";
    }

    let total_tax = priceFormat(priceFormat(data.cgst_tax) + priceFormat(data.sgst_tax) + priceFormat(data.igst_tax));
    let company_name = (data.user && data.user.company_name) ? data.user.company_name : '';
    let user_name = data.user ? data.user.name : '';
    if(isEmpty(company_name)){
        company_name = user_name;
    }

    return {
        id: data.id,
        user_id: data.user_id,
        user_name: user_name,
        user_mobile: data.user ? data.user.mobile : '',
        user_details: {
            id: data.user_id,
            company_name: company_name,
            gst: (data.user && data.user.gst) ? data.user.gst : '',
            address: (data.user && data.user.address) ? data.user.address : '',
            city: (data.user && data.user.city) ? data.user.city : '',
            pincode: (data.user && data.user.pincode) ? data.user.pincode : '',
            user_name: user_name,
            bank_name: (data.user && data.user.bank_name) ? data.user.bank_name : '',
            bank_account_no: (data.user && data.user.bank_account_no) ? data.user.bank_account_no : '',
            bank_ifsc: (data.user && data.user.bank_ifsc) ? data.user.bank_ifsc : '',
        },
        sale_by_name: data.saleBy ? data.saleBy.name : '',
        invoice_number: data.invoice_number,
        invoice_date: formatDateTime(data.invoice_date, 8),
        //due_date: formatDateTime(data.due_date, 8),
        settlement_date: formatDateTime(data.settlement_date, 8),
        cgst_tax: priceFormat(data.cgst_tax),
        sgst_tax: priceFormat(data.sgst_tax),
        igst_tax: priceFormat(data.igst_tax),
        total_tax: priceFormat(total_tax),
        cgst_tax_display: displayAmount(data.cgst_tax),
        sgst_tax_display: displayAmount(data.sgst_tax),
        igst_tax_display: displayAmount(data.igst_tax),
        total_tax_display: displayAmount(total_tax),
        discount: displayAmount(data.discount),
        total_amount: displayAmount(data.total_amount),
        payment_mode: data.payment_mode,
        transaction_no: data.transaction_no,
        notes: data.notes,
        taxable_amount: displayAmount(data.taxable_amount),
        bill_amount: displayAmount(data.bill_amount),
        total_payable: displayAmount(data.total_payable),
        return_amount: parseFloat(data.return_amount) > 0 ? displayAmount(data.return_amount) : "",
        due_amount: priceFormat(data.due_amount),
        due_amount_display: displayAmount(data.due_amount),
        due_date: data.status != "paid" ? formatDateTime(data.due_date, 8) : '',
        paid_amount_display: displayAmount(data.paid_amount),
        paid_amount: priceFormat(data.paid_amount),
        total_tag_price: displayAmount(data.total_tag_price),
        product_discount: displayAmount(data.product_discount),
        total_sub_total: displayAmount(total_sub_total),
        status_display: ucWords(data.status),
        products: products,
        approve_status: approve_status,
        is_approved: data.is_approved,
        is_assigned: data.is_assigned,
        accept_declined_at: data.accept_declined_at ? formatDateTime(data.accept_declined_at, 7) : '',
        no_of_products: products.length
    }
}

module.exports = {
    SaleCollection
}
