import { LATEST_PRODUCT_ERROR, LATEST_PRODUCT_LOADING, LATEST_PRODUCT_RESET, LATEST_PRODUCT_SUCCESS } from "./types/productTypes"


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