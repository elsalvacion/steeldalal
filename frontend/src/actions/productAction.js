// import axios from 'axios'
import { LATEST_PRODUCT_ERROR, LATEST_PRODUCT_LOADING, LATEST_PRODUCT_SUCCESS } from '../reducers/types/productTypes'
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