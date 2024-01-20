import React from "react";
import axios from "axios";

export default function Products()
{
    const getProducts = ()=>{
        return async (dispatch)=>{
            dispatch({type:"GET_PRODUCTS", loading: true });

            try{
                const{data} = await axios.get(`http://localhost:8080/api/products`);
                dispatch({type: "GET_PRODUCTS_SUCESS", loading:false, value:data});
            }catch(error){
                dispatch({type:"GET_PRODUCTS_FAIL", error:error.message, loading:false});
            }
        };
    };
}