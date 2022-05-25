// import axios from 'axios'
import {
  LATEST_PRODUCT_ERROR,
  LATEST_PRODUCT_LOADING,
  LATEST_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_ERROR,
  SINGLE_PRODUCT_LOADING,
  SINGLE_PRODUCT_SUCCESS,
} from "../reducers/types/productTypes";
import { categories } from "../constants/category";
import axios from "axios";
export const latestProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: LATEST_PRODUCT_LOADING });
    const { data } = await axios.post(
      "/product/latest",
      {
        category: {
          first: categories[0].title,
          second: categories[1].title,
        },
      },
      {
        "Content-Type": "application/json",
      }
    );
    const products = {};
    products.first = categories[0].title;
    products.firstData = data.msg[0];
    products.second = categories[1].title;
    products.secondData = data.msg[1];
    dispatch({
      type: LATEST_PRODUCT_SUCCESS,
      payload: products,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LATEST_PRODUCT_ERROR,
      payload: error.response.data,
    });
  }
};

export const fetchSingleProductsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_PRODUCT_LOADING });
    const { data } = await axios.get(`/product/${id}`);
    dispatch({
      type: SINGLE_PRODUCT_SUCCESS,
      payload: data.msg,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SINGLE_PRODUCT_ERROR,
      payload: error.response.data,
    });
  }
};
