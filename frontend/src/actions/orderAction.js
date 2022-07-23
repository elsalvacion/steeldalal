import axios from "axios";
import { backendBaseUrl } from "../constants/url";
import {
  FETCH_ORDERS_ERROR,
  FETCH_ORDERS_LOADING,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDER_ERROR,
  FETCH_ORDER_LOADING,
  FETCH_ORDER_SUCCESS,
  FETCH_SELLER_ORDER_ERROR,
  FETCH_SELLER_ORDER_LOADING,
  FETCH_SELLER_ORDER_SUCCESS,
  ORDER_INSTOCK_ERROR,
  ORDER_INSTOCK_LOADING,
  ORDER_INSTOCK_SUCCESS,
  PAY_ORDER_ERROR,
  PAY_ORDER_LOADING,
  PAY_ORDER_SUCCESS,
  PLACE_ORDER_ERROR,
  PLACE_ORDER_LOADING,
  PLACE_ORDER_SUCCESS,
  SAVE_ORDER_PAYMENT_ERROR,
  SAVE_ORDER_PAYMENT_LOADING,
  SAVE_ORDER_PAYMENT_SUCCESS,
} from "../reducers/types/orderTypes";
export const placeOrderAction = (details) => async (dispatch, getState) => {
  try {
    dispatch({ type: PLACE_ORDER_LOADING });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${backendBaseUrl}/order`,
      details,
      config
    );
    dispatch({
      type: PLACE_ORDER_SUCCESS,
      payload: data.msg,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PLACE_ORDER_ERROR,
      payload: error.response.data.msg,
    });
  }
};

export const fetchOrdersAction =
  (limit = null) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: FETCH_ORDERS_LOADING });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      let url;
      if (limit) {
        url = `${backendBaseUrl}/order?limit=${limit}`;
      } else {
        url = `${backendBaseUrl}/order`;
      }
      const { data } = await axios.get(url, config);
      dispatch({
        type: FETCH_ORDERS_SUCCESS,
        payload: data.msg,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_ORDERS_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

export const fetchOrderAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_ORDER_LOADING });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${backendBaseUrl}/order/${id}`, config);
    dispatch({
      type: FETCH_ORDER_SUCCESS,
      payload: data.msg,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_ORDER_ERROR,
      payload: error.response.data.msg,
    });
  }
};

export const fetchSellerOrderAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_SELLER_ORDER_LOADING });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${backendBaseUrl}/order/seller/${id}`,
      config
    );
    dispatch({
      type: FETCH_SELLER_ORDER_SUCCESS,
      payload: data.msg,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_SELLER_ORDER_ERROR,
      payload: error.response.data.msg,
    });
  }
};

export const payOrderAction = (details) => async (dispatch, getState) => {
  try {
    dispatch({ type: PAY_ORDER_LOADING });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${backendBaseUrl}/order/pay/${details.id}`,
      details,
      config
    );
    dispatch({
      type: PAY_ORDER_SUCCESS,
      payload: data.msg,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PAY_ORDER_ERROR,
      payload: error.response.data.msg,
    });
  }
};

export const orderInStockAction =
  (order, status) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_INSTOCK_LOADING });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${backendBaseUrl}/order/instock`,
        { status, order },
        config
      );
      dispatch({
        type: ORDER_INSTOCK_SUCCESS,
        payload: data.msg,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ORDER_INSTOCK_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

export const saveOrderPaymentAction =
  (details) => async (dispatch, getState) => {
    try {
      dispatch({ type: SAVE_ORDER_PAYMENT_LOADING });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${backendBaseUrl}/order/save-payment/${details.id}`,
        details,
        config
      );
      dispatch({
        type: SAVE_ORDER_PAYMENT_SUCCESS,
        payload: data.msg,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SAVE_ORDER_PAYMENT_ERROR,
        payload: error.response.data.msg,
      });
    }
  };
