const { isObject, formatDateTime, priceFormat, displayAmount, isEmpty, ucWords, weightFormat } = require("@helpers/helper");

const PurchaseViewCollection = (data) => {
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
    let products = [];
    for(let i = 0; i < data.purchaseProducts.length; i++){
        let item = data.purchaseProducts[i];
        let materials = [];
        for(let x = 0; x < item.purchaseMaterials.length; x++){
            let thisM = item.purchaseMaterials[x];
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
                rate: displayAmount(thisM.rate),
                amount: displayAmount(thisM.amount),
                discount_amount: displayAmount(thisM.discount_amount),
            });
        }
        let total_weight = '';
        if(materials.length == 1){
            total_weight = materials[0].weight + ' ' + materials[0].unit_name;
        }else{
            total_weight = weightFormat(item.total_weight) + ' Gram';
        }
        let sub_total = !isEmpty(data.sale_id) ? displayAmount(item.sub_price) : displayAmount(parseFloat(item.sub_price) + parseFloat(item.making_charge));
        products.push({
            product_name: item.product ? item.product.name : '',
            product_type: item.product ? item.product.type : '',
            category_name: (item.product && item.product.category) ? item.product.category.name : '',
            size_name: item.size ? item.size.name : '',
            certificate_no: item.certificate_no,
            total_weight: total_weight,
            sub_price: displayAmount(item.sub_price),
            making_charge: displayAmount(item.making_charge),
            rep: displayAmount(item.rep),
            tax: displayAmount(item.tax),
            total: displayAmount(item.total),
            total_discount: displayAmount(item.total_discount),
            materials: materials,
            is_return: item.is_return,
            sub_total: sub_total,
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
        approve_status = "Transfer To Purchase";
    }

    return {
        id: data.id,
        supplier_id: data.supplier_id,
        supplier_name: data.supplier ? data.supplier.name : '',
        supplier_mobile: data.supplier ? data.supplier.mobile : '',
        invoice_number: data.invoice_number,
        invoice_date: formatDateTime(data.invoice_date, 9),
        notes: data.notes,
        total_amount: displayAmount(data.total_amount),
        payment_mode: data.payment_mode,
        transaction_no: data.transaction_no,
        tax: displayAmount(data.tax),
        discount: displayAmount(data.discount),
        paid_amount: priceFormat(data.paid_amount),
        paid_amount_display: displayAmount(data.paid_amount),
        products: products,
        taxable_amount: displayAmount(data.taxable_amount),
        return_amount: displayAmount(data.return_amount),
        bill_amount: displayAmount(data.bill_amount),
        total_payable: displayAmount(data.total_payable),
        due_amount: priceFormat(data.due_amount),
        due_amount_display: displayAmount(data.due_amount),
        due_date: formatDateTime(data.due_date, 8),
        status: data.status,
        status_display: !isEmpty(data.status) ? ucWords(data.status) : 'Due',
        is_approved: data.is_approved,
        approve_status: approve_status,
        is_assigned: data.is_assigned,
        accept_declined_at: data.accept_declined_at ? formatDateTime(data.accept_declined_at, 7) : '',
        no_of_products: products.length,
        created_myself: isEmpty(data.sale_id) ? true : false
    }

    
}

module.exports = {
    PurchaseViewCollection
}
