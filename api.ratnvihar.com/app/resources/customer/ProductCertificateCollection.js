const { isObject, isEmpty, getFileAbsulatePath } = require("@helpers/helper");

const ProductCertificateCollection = (data) => {
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
        name: data.name,
        description: data.description || "",
        website: data.website,
        logo: !isEmpty(data.logo) ? getFileAbsulatePath(data.logo): '',
    }
}

module.exports = {
    ProductCertificateCollection
}
