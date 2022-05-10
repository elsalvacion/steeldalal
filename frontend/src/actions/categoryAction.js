import { FETCH_CATEGORY_ERROR, FETCH_CATEGORY_LOADING, FETCH_CATEGORY_SUCCESS } from "../reducers/types/categoryTypes";
import {categories} from '../constants/category'


export const fetchCategoryAction = () => async dispatch => {
    try {
        dispatch({type: FETCH_CATEGORY_LOADING})
        // const {data} = await axios.get('..');
        dispatch({
            type: FETCH_CATEGORY_SUCCESS,
            payload: categories
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: FETCH_CATEGORY_ERROR,
            payload: error.response.data
        })
    }
}