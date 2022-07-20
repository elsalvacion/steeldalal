import axios from "axios";
import {
  FETCH_ADMIN_ORDERS_ERROR,
  FETCH_ADMIN_ORDERS_LOADING,
  FETCH_ADMIN_ORDERS_SUCCESS,
} from "../reducers/types/adminTypes";
import { backendBaseUrl } from "../constants/url";

export const fetchAdminOrdersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_ADMIN_ORDERS_LOADING });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const url = `${backendBaseUrl}/admin/orders`;

    const { data } = await axios.get(url, config);
    dispatch({
      type: FETCH_ADMIN_ORDERS_SUCCESS,
      payload: data.msg,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_ADMIN_ORDERS_ERROR,
      payload: error.response.data.msg,
    });
  }
};
