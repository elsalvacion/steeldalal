import { LATEST_PRODUCT_ERROR, LATEST_PRODUCT_LOADING, LATEST_PRODUCT_RESET, LATEST_PRODUCT_SUCCESS, SINGLE_PRODUCT_ERROR, SINGLE_PRODUCT_LOADING, SINGLE_PRODUCT_RESET, SINGLE_PRODUCT_SUCCESS } from "./types/productTypes"


export const latestProductReducer = (state = {} , action) => {
    switch(action.type) {
        case LATEST_PRODUCT_LOADING:
            return {
                loading: true
            }
        case LATEST_PRODUCT_SUCCESS:
            return {
                products: action.payload
            }
        case LATEST_PRODUCT_ERROR:
            return {
                error: action.payload
            }
        case LATEST_PRODUCT_RESET:
            return {

            }    
        default:
            return state
    }
}


export const singleProductReducer = (state = {} , action) => {
    switch(action.type) {
        case SINGLE_PRODUCT_LOADING:
            return {
                loading: true
            }
        case SINGLE_PRODUCT_SUCCESS:
            return {
                product: action.payload
            }
        case SINGLE_PRODUCT_ERROR:
            return {
                error: action.payload
            }
        case SINGLE_PRODUCT_RESET:
            return {

            }    
        default:
            return state
    }
}