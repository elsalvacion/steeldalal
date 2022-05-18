// import axios from 'axios'
import { LATEST_PRODUCT_ERROR, LATEST_PRODUCT_LOADING, LATEST_PRODUCT_SUCCESS, SINGLE_PRODUCT_ERROR, SINGLE_PRODUCT_LOADING, SINGLE_PRODUCT_SUCCESS } from '../reducers/types/productTypes'
import { products } from '../constants/products'
export const fetchLatestProductsAction = () => async dispatch => {
    try {
        dispatch({type: LATEST_PRODUCT_LOADING})
        // const {data} = await axios.get('..');
        dispatch({
            type: LATEST_PRODUCT_SUCCESS,
            payload: products
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: LATEST_PRODUCT_ERROR,
            payload: error.response.data
        })
    }
}


export const fetchSingleProductsAction = (id) => async dispatch => {
    try {
        dispatch({type: SINGLE_PRODUCT_LOADING})
        // const {data} = await axios.get('..');
        console.log(products.find(product => product.id === id))
        dispatch({
            type: SINGLE_PRODUCT_SUCCESS,
            payload: products.find(product => product.id === id)
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: SINGLE_PRODUCT_ERROR,
            payload: error.response.data
        })
    }
}