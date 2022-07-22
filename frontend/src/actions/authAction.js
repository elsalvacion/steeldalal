import {
  CONFIRM_OTP_ERROR,
  CONFIRM_OTP_LOADING,
  CONFIRM_OTP_SUCCESS,
  CREATE_BIZ_ERROR,
  CREATE_BIZ_LOADING,
  CREATE_BIZ_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_LOADING,
  LOGIN_USER_RESET,
  LOGIN_USER_SUCCESS,
  UPDATE_BIZ_ERROR,
  UPDATE_BIZ_LOADING,
  UPDATE_BIZ_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESS,
  VARIFY_PHONE_ERROR,
  VARIFY_PHONE_LOADING,
  VARIFY_PHONE_RESET,
  VARIFY_PHONE_SUCCESS,
} from "../reducers/types/authTypes";
import axios from "axios";
import { backendBaseUrl } from "../constants/url";
import { GET_SHIPPING_INFO_SUCCESS } from "../reducers/types/cartTypes";

export const verifyPhoneAction =
  (phone, confirm = null) =>
  async (dispatch, getState) => {
    try {
      if (confirm) {
        dispatch({
          type: CONFIRM_OTP_LOADING,
        });
      } else {
        dispatch({
          type: VARIFY_PHONE_LOADING,
        });
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
      let url;
      if (!confirm) {
        url = `${backendBaseUrl}/auth/verify-phone`;
      } else {
        url = `${backendBaseUrl}/auth/check-otp`;
      }
      const { data } = await axios.post(url, { phone }, config);
      dispatch({
        type: VARIFY_PHONE_SUCCESS,
        payload: data.msg,
      });
      if (confirm) {
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: {
            ...userInfo,
            isVerified: 1,
          },
        });
        sessionStorage.setItem(
          "userInfo",
          JSON.stringify({
            ...userInfo,
            isVerified: 1,
          })
        );
        dispatch({
          type: CONFIRM_OTP_SUCCESS,
          payload: data.msg,
        });
      } else {
        dispatch({
          type: VARIFY_PHONE_SUCCESS,
          payload: data.msg,
        });
      }
    } catch (err) {
      console.log(err.response);
      const message = err.response.data.msg || err.response.data;
      if (confirm) {
        dispatch({
          type: CONFIRM_OTP_ERROR,
          payload: message,
        });
      } else {
        dispatch({
          type: VARIFY_PHONE_ERROR,
          payload: message,
        });
      }
    }
  };

export const registerUser = (details) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_USER_LOADING,
    });
    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.post(
      `${backendBaseUrl}/auth/register`,
      details,
      config
    );
    sessionStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({
      type: GET_SHIPPING_INFO_SUCCESS,
      payload: data,
    });
    dispatch({
      type: VARIFY_PHONE_RESET,
    });
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err.response);
    const message = err.response.data.msg || err.response.data;
    dispatch({
      type: LOGIN_USER_ERROR,
      payload: message,
    });
  }
};

export const loginUser = (details) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_USER_LOADING,
    });
    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.post(
      `${backendBaseUrl}/auth/login`,
      details,
      config
    );
    sessionStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({
      type: GET_SHIPPING_INFO_SUCCESS,
      payload: data,
    });
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err.response);
    const message = err.response.data.msg || err.response.data;
    dispatch({
      type: LOGIN_USER_ERROR,
      payload: message,
    });
  }
};

export const editUser = (details) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_USER_LOADING,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`${backendBaseUrl}/auth`, details, config);

    const newUserInfo = {
      ...userInfo,
      ...details,
    };
    dispatch({
      type: GET_SHIPPING_INFO_SUCCESS,
      payload: newUserInfo,
    });
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: newUserInfo,
    });
    sessionStorage.setItem("userInfo", JSON.stringify(newUserInfo));

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err.response);
    const message = err.response.data.msg || err.response.data;
    dispatch({
      type: UPDATE_USER_ERROR,
      payload: message,
    });
  }
};

export const createBiz = (details) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_BIZ_LOADING,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${backendBaseUrl}/auth/create-biz`,
      details,
      config
    );
    const newUserInfo = {
      ...userInfo,
      yourBiz: data.msg,
    };
    dispatch({
      type: GET_SHIPPING_INFO_SUCCESS,
      payload: newUserInfo,
    });
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: newUserInfo,
    });
    sessionStorage.setItem("userInfo", JSON.stringify(newUserInfo));

    dispatch({
      type: CREATE_BIZ_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err.response);
    const message = err.response.data.msg || err.response.data;
    dispatch({
      type: CREATE_BIZ_ERROR,
      payload: message,
    });
  }
};

export const editBiz = (details) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_BIZ_LOADING,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${backendBaseUrl}/auth/edit-biz`,
      details,
      config
    );
    const newUserInfo = {
      ...userInfo,
      yourBiz: data.msg,
    };
    dispatch({
      type: GET_SHIPPING_INFO_SUCCESS,
      payload: newUserInfo,
    });
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: newUserInfo,
    });
    sessionStorage.setItem("userInfo", JSON.stringify(newUserInfo));

    dispatch({
      type: UPDATE_BIZ_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err.response);
    const message = err.response.data.msg || err.response.data;
    dispatch({
      type: UPDATE_BIZ_ERROR,
      payload: message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  sessionStorage.removeItem("userInfo");
  dispatch({
    type: LOGIN_USER_RESET,
  });
  window.location.href = "/";
};
