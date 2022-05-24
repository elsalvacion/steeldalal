import {
  FETCH_CATEGORY_ERROR,
  FETCH_CATEGORY_LOADING,
  FETCH_CATEGORY_SUCCESS,
} from "../reducers/types/categoryTypes";
import axios from "axios";

export const fetchCategoryAction =
  (limit = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: FETCH_CATEGORY_LOADING });
      const { data } = await axios.get(`/category?limit=${limit}`);
      dispatch({
        type: FETCH_CATEGORY_SUCCESS,
        payload: data.msg,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_CATEGORY_ERROR,
        payload: error.response.data,
      });
    }
  };
