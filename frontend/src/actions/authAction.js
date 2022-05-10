import {
    LOGIN_USER_ERROR,
    LOGIN_USER_LOADING,
    LOGIN_USER_RESET,
    LOGIN_USER_SUCCESS,
  } from "../reducers/types/authTypes";
  import axios from "axios";
  
  export const registerUser = (details) => async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_USER_LOADING,
      });
      const config = {
        "Content-Type": "application/json",
      };
      const { data } = await axios.post("/auth/register", details, config);
      localStorage.setItem("userInfo", JSON.stringify(data));
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
      const { data } = await axios.post("/auth/login", details, config);
      localStorage.setItem("userInfo", JSON.stringify(data));
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
  
  export const logoutUser = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({
      type: LOGIN_USER_RESET,
    });
    // window.location.href = "/";
  };