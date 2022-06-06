// import axios from 'axios'
import {
  ALL_PRODUCT_ERROR,
  ALL_PRODUCT_LOADING,
  ALL_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  CREATE_PRODUCT_LOADING,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_LOADING,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  EDIT_PRODUCT_LOADING,
  EDIT_PRODUCT_SUCCESS,
  LATEST_PRODUCT_ERROR,
  LATEST_PRODUCT_LOADING,
  LATEST_PRODUCT_SUCCESS,
  PRODUCT_UPLOAD_ERROR,
  PRODUCT_UPLOAD_LOADING,
  PRODUCT_UPLOAD_SUCCESS,
  SINGLE_PRODUCT_ERROR,
  SINGLE_PRODUCT_LOADING,
  SINGLE_PRODUCT_SUCCESS,
  YOUR_PRODUCT_ERROR,
  YOUR_PRODUCT_LOADING,
  YOUR_PRODUCT_SUCCESS,
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
      payload: error.response.data.msg,
    });
  }
};

export const fetchAllProductsAction =
  (category = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_LOADING });
      let postData;
      if (category) {
        postData = {
          category,
        };
      } else {
        postData = {};
      }
      const { data } = await axios.post("/product/category", postData, {
        "Content-Type": "application/json",
      });

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data.msg,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ALL_PRODUCT_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

export const fetchYourProductsAction =
  (limit = null) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: YOUR_PRODUCT_LOADING });
      let url;
      if (limit) {
        url = `/product/your-products?limit=${limit}`;
      } else {
        url = `/product/your-products`;
      }

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(url, config);

      dispatch({
        type: YOUR_PRODUCT_SUCCESS,
        payload: data.msg,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: YOUR_PRODUCT_ERROR,
        payload: error.response.data.msg,
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
      payload: error.response.data.msg,
    });
  }
};

export const editProductAction =
  (id, details) => async (dispatch, getState) => {
    try {
      dispatch({ type: EDIT_PRODUCT_LOADING });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(`/product/${id}`, details, config);
      dispatch({
        type: EDIT_PRODUCT_SUCCESS,
        payload: data.msg,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: EDIT_PRODUCT_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

export const productUploadAction = (files) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPLOAD_LOADING });

    const formData = new FormData();
    files.forEach((file, i) => formData.append(`image-${i + 1}`, file));

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post("/product/upload", formData, config);

    dispatch({
      type: PRODUCT_UPLOAD_SUCCESS,
      payload: data.msg,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PRODUCT_UPLOAD_ERROR,
      payload: error.response.data.msg,
    });
  }
};

export const createProductAction = (details) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PRODUCT_LOADING });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/product", details, config);

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data.msg,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_PRODUCT_ERROR,
      payload: error.response.data.msg,
    });
  }
};

export const deleteProductAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_PRODUCT_LOADING });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/product/${id}`, config);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.msg,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_PRODUCT_ERROR,
      payload: error.response.data.msg,
    });
  }
};
