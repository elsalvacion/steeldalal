import axios from "axios";
import { backendBaseUrl } from "../constants/url";
import {
  SEARCH_ERROR,
  SEARCH_LOADING,
  SEARCH_SUCCESS,
} from "../reducers/types/searchTypes";

export const searchAction = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_LOADING });
    const { data } = await axios.post(`${backendBaseUrl}/product/search`, {
      keyword,
    });
    dispatch({
      type: SEARCH_SUCCESS,
      payload: data.msg,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SEARCH_ERROR,
      payload: error.response.data.msg,
    });
  }
};
