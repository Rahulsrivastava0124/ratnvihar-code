import axios from 'actions/axios';
import {
    LIST_SUB_CATEGORY,
    ADD_SUB_CATEGORY,
    UPDATE_SUB_CATEGORY,
    DELETE_SUB_CATEGORY,
} from 'actionTypes/superadmin/subCategory.types';
import {objectToQuery} from 'src/helpers/helper';

export const subCategoryList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/sub-categories${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({  
                    type: LIST_SUB_CATEGORY,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const subCategoryCreate = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/sub-categories/store", data)
        .then(response => {
            dispatch({
                type: ADD_SUB_CATEGORY,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const subCategoryUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/sub-categories/update/${id}`, data)
        .then(response => { 
            dispatch({
                type: UPDATE_SUB_CATEGORY,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const subCategoryDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/sub-categories/delete/${id}`, data)
        .then(response => {
            dispatch({
                type: DELETE_SUB_CATEGORY,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const subCategoryRawList = (params) => {
    params = objectToQuery(params, true)
    return axios.get(`/superadmin/sub-categories${params}`);
}