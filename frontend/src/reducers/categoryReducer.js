import { FETCH_CATEGORY_ERROR, FETCH_CATEGORY_LOADING, FETCH_CATEGORY_RESET, FETCH_CATEGORY_SUCCESS } from "./types/categoryTypes"

export const fetchCategoryReducer = (state = {} , action) => {
    switch(action.type) {
        case FETCH_CATEGORY_LOADING:
            return {
                loading: true
            }
        case FETCH_CATEGORY_SUCCESS:
            return {
                categories: action.payload
            }
        case FETCH_CATEGORY_ERROR:
            return {
                error: action.payload
            }
        case FETCH_CATEGORY_RESET:
            return {

            }    
        default:
            return state
    }
}