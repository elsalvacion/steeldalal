import {
  FETCH_CATEGORY_ERROR,
  FETCH_CATEGORY_LOADING,
  FETCH_CATEGORY_SUCCESS,
} from "../reducers/types/categoryTypes";
import axios from "axios";
import { backendBaseUrl } from "../constants/url";

export const fetchCategoryAction =
  (limit = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: FETCH_CATEGORY_LOADING });
      let url;
      if (limit) url = `${backendBaseUrl}/category?limit=${limit}`;
      else url = `${backendBaseUrl}/category`;
      const { data } = await axios.get(url);
      dispatch({
        type: FETCH_CATEGORY_SUCCESS,
        payload: data.msg,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_CATEGORY_ERROR,
        payload: error.response.data.msg,
      });
    }
  };
