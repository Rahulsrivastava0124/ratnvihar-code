const { isObject, formatDateTime, isEmpty, displayAmount, weightFormat, priceFormat } = require("@helpers/helper");
const db = require("@models");
const moment = require('moment');
const ReturnPolicyModel = db.return_policy;
const {isAdmin, isDistributor} = require("@library/common");

const PurchaseEditCollection = async(data, req) => {
    if(isObject(data)){
        return await getModelObject(data, req);
    }else{
        let arr = [];
        for(let i = 0; i < data.length; i++){
            arr.push(await getModelObject(data[i], req));
        }
        return arr;
    }
}

const getModelObject = async(data, req) => {

    let products = [], total_sub_total = 0;
    for(let i = 0; i < data.purchaseProducts.length; i++){
        let item = data.purchaseProducts[i];
        let materials = [];
        for(let x = 0; x < item.purchaseMaterials.length; x++){
            let thisM = item.purchaseMaterials[x];
            let puritiesArr = [];
            let purities = thisM.material ? thisM.material.purities : [];
            for(let pitm of purities){
                puritiesArr.push(pitm.name);
            }
            let purity_name = '';
            if('purity' in thisM && thisM.purity){
                purity_name = thisM.purity.name;
            }
            let return_weight = weightFormat(thisM.return_weight);
            let return_qty = thisM.return_qty || 0;
            materials.push({
                id: thisM.id,
                material_id: thisM.material_id,
                material_name: thisM.material ? thisM.material.name : '',
                weight: weightFormat(thisM.weight),
                quantity: thisM.quantity,
                purities: puritiesArr.join(", "),
                unit_name: (thisM.unit) ? thisM.unit.name : '',
                purity_id: thisM.purity_id,
                purity_name: purity_name,
                unit_id: thisM.unit_id,
                rate: thisM.rate,
                amount: thisM.amount,
                avl_qty: (parseFloat(thisM.quantity) - parseFloat(return_qty)),
                avl_weight: weightFormat(parseFloat(thisM.weight) - parseFloat(return_weight)),
                return_qty: '',
                return_weight: '',
            });
        }

        let return_charge_percent = 0;
        if(isAdmin(req) || isDistributor(req)){
            let returnPolicy = null;
            if(isAdmin(req)){
                returnPolicy = await ReturnPolicyModel.findOne({where: {category_id: item.product.category_id, role: 'admin'}});
            }else if(isDistributor(req)){
                returnPolicy = await ReturnPolicyModel.findOne({where: {category_id: item.product.category_id, role: 'distributor'}});
            }
            if(returnPolicy){
                let today = moment();
                let invoice_date = moment(data.invoice_date);
                if(today.diff(invoice_date, 'days') > parseInt(returnPolicy.days)){
                    return_charge_percent = returnPolicy.amount;
                }
            }
        }
        
        let product_name = item.product ? item.product.name : '';
        let product_type = item.product ? item.product.type : '';
        if(isEmpty(item.product_id) && isEmpty(item.size_id)){
            product_type = 'material';
            product_name = materials.length ? materials[0].material_name : ''
        }
        products.push({
            id: item.id,
            product_id: item.product_id,
            worker_id: item.worker_id,
            product_name: product_name,
            product_type: product_type,
            size_id: item.size_id,
            size_name: item.size ? item.size.name : '',
            certificate_no: item.certificate_no,
            total_weight: item.total_weight,
            sub_price: item.sub_price,
            making_charge: item.making_charge,
            rep: item.rep,
            tax: item.tax,
            total: item.total,
            materials: materials,
            is_return: item.is_return,
            return_amount: 0,
            return_charge: 0,
            return_charge_percent: return_charge_percent
        });
        total_sub_total += parseFloat(item.sub_price);
        total_sub_total += parseFloat(item.making_charge);
    }

    let supplier = data.supplier;
    return {
        id: data.id,
        supplier_id: data.supplier_id,
        supplier_details: {
            name: (!isEmpty(supplier) && !isEmpty(supplier.name)) ? supplier.name : '',
            company_name: (!isEmpty(supplier) && !isEmpty(supplier.company_name)) ? supplier.company_name : '',
            mobile: (!isEmpty(supplier) && !isEmpty(supplier.mobile)) ? supplier.mobile : '',
            city: (!isEmpty(supplier) && !isEmpty(supplier.city)) ? supplier.city : '',
            gst: (!isEmpty(supplier) && !isEmpty(supplier.gst)) ? supplier.gst : '',
            address: (!isEmpty(supplier) && !isEmpty(supplier.address)) ? supplier.address : '',
            pincode: (!isEmpty(supplier) && !isEmpty(supplier.pincode)) ? supplier.pincode : '',
        },
        //supplier_name: data.supplier ? data.supplier.name : '',
        invoice_number: data.invoice_number,
        invoice_date: formatDateTime(data.invoice_date, 9),
        notes: data.notes,
        total_amount: data.total_amount,
        payment_mode: data.payment_mode,
        transaction_no: data.transaction_no,
        tax: data.tax,
        discount: data.discount,
        paid_amount: data.paid_amount,
        products: products,
        taxable_amount: data.taxable_amount,
        total_payable: data.total_payable,
        due_amount: data.due_amount,
        due_date: formatDateTime(data.due_date, 9),
        total_sub_total: priceFormat(total_sub_total),
        have_return_charge: !isEmpty(data.sale_id) ? true : false,
        is_assigned: data.is_assigned,
        created_myself: isEmpty(data.sale_id) ? true : false,
        is_approved: data.is_approved,
    }

    
}

module.exports = {
    PurchaseEditCollection
}
