const { isObject, isEmpty, weightFormat } = require("@helpers/helper");
const {getProductPrices} = require("@library/common");

const CartMaterialCollection = (data) => {
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
    return {
        id: data.id,
        material_id: data.material_id,
        material_name: !isEmpty(data.material) ? data.material.name : '',
        weight: !isEmpty(data.weight) ? weightFormat(data.weight) : '',
        quantity: !isEmpty(data.quantity) ? data.quantity : '',
        unit_name: data.unit ? data.unit.name : '',
        unit_id: data.unit_id,
        purity: data.purity ? data.purity.name : '',
        purity_id: data.purity_id,
        amount: 0,
        mrp: 0,
        rate: 0
    }
}

module.exports = {
    CartMaterialCollection
}
