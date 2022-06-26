import axios from "axios";
import { backendBaseUrl } from "../constants/url";
import {} from "../reducers/orderReducer";
import {
  PAY_ORDER_ERROR,
  PAY_ORDER_LOADING,
  PAY_ORDER_SUCCESS,
  PLACE_ORDER_ERROR,
  PLACE_ORDER_LOADING,
  PLACE_ORDER_SUCCESS,
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
      `${backendBaseUrl}/order/pay`,
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
