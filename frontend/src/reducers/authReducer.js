import {
  CREATE_BIZ_ERROR,
  CREATE_BIZ_LOADING,
  CREATE_BIZ_RESET,
  CREATE_BIZ_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_LOADING,
  LOGIN_USER_RESET,
  LOGIN_USER_SUCCESS,
  UPDATE_BIZ_ERROR,
  UPDATE_BIZ_LOADING,
  UPDATE_BIZ_RESET,
  UPDATE_BIZ_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_LOADING,
  UPDATE_USER_RESET,
  UPDATE_USER_SUCCESS,
  VARIFY_EMAIL_ERROR,
  VARIFY_EMAIL_LOADING,
  VARIFY_EMAIL_RESET,
  VARIFY_EMAIL_SUCCESS,
} from "./types/authTypes";

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_LOADING:
      return { loading: true };
    case LOGIN_USER_SUCCESS:
      return { userInfo: action.payload };
    case LOGIN_USER_ERROR:
      return {
        error: action.payload,
      };
    case LOGIN_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const editUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_LOADING:
      return { loading: true };
    case UPDATE_USER_SUCCESS:
      return { success: true };
    case UPDATE_USER_ERROR:
      return {
        error: action.payload,
      };
    case UPDATE_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const verifyEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case VARIFY_EMAIL_LOADING:
      return { loading: "Verifying... email" };
    case VARIFY_EMAIL_SUCCESS:
      return { success: action.payload };
    case VARIFY_EMAIL_ERROR:
      return {
        error: action.payload,
      };
    case VARIFY_EMAIL_RESET:
      return {};
    default:
      return state;
  }
};

export const createBizReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BIZ_LOADING:
      return { loading: true };
    case CREATE_BIZ_SUCCESS:
      return { success: true };
    case CREATE_BIZ_ERROR:
      return {
        error: action.payload,
      };
    case CREATE_BIZ_RESET:
      return {};
    default:
      return state;
  }
};

export const editBizReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BIZ_LOADING:
      return { loading: true };
    case UPDATE_BIZ_SUCCESS:
      return { success: true };
    case UPDATE_BIZ_ERROR:
      return {
        error: action.payload,
      };
    case UPDATE_BIZ_RESET:
      return {};
    default:
      return state;
  }
};
