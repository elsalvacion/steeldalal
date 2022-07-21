import axios from "axios";
import {
  FETCH_ADMIN_ORDERS_ERROR,
  FETCH_ADMIN_ORDERS_LOADING,
  FETCH_ADMIN_ORDERS_SUCCESS,
  FETCH_ADMIN_ORDER_ERROR,
  FETCH_ADMIN_ORDER_LOADING,
  FETCH_ADMIN_ORDER_SUCCESS,
  FETCH_ADMIN_USERS_ERROR,
  FETCH_ADMIN_USERS_LOADING,
  FETCH_ADMIN_USERS_SUCCESS,
  FETCH_ADMIN_USER_ERROR,
  FETCH_ADMIN_USER_LOADING,
  FETCH_ADMIN_USER_SUCCESS,
  UPDATE_ADMIN_ORDER_ERROR,
  UPDATE_ADMIN_ORDER_LOADING,
  UPDATE_ADMIN_ORDER_SUCCESS,
  UPDATE_ADMIN_USER_ERROR,
  UPDATE_ADMIN_USER_LOADING,
  UPDATE_ADMIN_USER_SUCCESS,
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

export const fetchAdminOrderAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_ADMIN_ORDER_LOADING });
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
      `${backendBaseUrl}/admin/order/${id}`,
      config
    );
    dispatch({
      type: FETCH_ADMIN_ORDER_SUCCESS,
      payload: data.msg,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_ADMIN_ORDER_ERROR,
      payload: error.response.data.msg,
    });
  }
};

export const updateAdminOrderAction =
  (id, details) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_ADMIN_ORDER_LOADING });
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
        `${backendBaseUrl}/admin/order/${id}`,
        details,
        config
      );
      dispatch({
        type: UPDATE_ADMIN_ORDER_SUCCESS,
        payload: data.msg,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_ADMIN_ORDER_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

export const fetchAdminUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_ADMIN_USERS_LOADING });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const url = `${backendBaseUrl}/admin/users`;

    const { data } = await axios.get(url, config);
    dispatch({
      type: FETCH_ADMIN_USERS_SUCCESS,
      payload: data.msg,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_ADMIN_USERS_ERROR,
      payload: error.response.data.msg,
    });
  }
};

export const fetchAdminUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_ADMIN_USER_LOADING });
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
      `${backendBaseUrl}/admin/user/${id}`,
      config
    );
    dispatch({
      type: FETCH_ADMIN_USER_SUCCESS,
      payload: data.msg,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_ADMIN_USER_ERROR,
      payload: error.response.data.msg,
    });
  }
};

export const updateAdminUserAction =
  (id, details) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_ADMIN_USER_LOADING });
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
        `${backendBaseUrl}/admin/user/${id}`,
        details,
        config
      );
      dispatch({
        type: UPDATE_ADMIN_USER_SUCCESS,
        payload: data.msg,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_ADMIN_USER_ERROR,
        payload: error.response.data.msg,
      });
    }
  };
