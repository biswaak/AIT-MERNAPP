import React from "react";
import axios from "axios";

export default function Details()
{
    
    return async(dispatch) => {
        dispatch({type: "GET_DETAILS_PRODUCT", loading:true});

        try{
            const {data} = await axios.get(`http://localhost:8080/api/products/${id}`);
            dispatch(type: "GET_DETAILS_PRODUCTS")
        }catch(error){
            dispatch({type: "GET_DETAILS_PRODUCTS_FAIL", error: error.message, loading:false})
        }
    }
}