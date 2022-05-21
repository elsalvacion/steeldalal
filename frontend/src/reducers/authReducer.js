import {
  LOGIN_USER_ERROR,
  LOGIN_USER_LOADING,
  LOGIN_USER_RESET,
  LOGIN_USER_SUCCESS,
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


export const verifyEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case VARIFY_EMAIL_LOADING:
      return { loading: 'Verifying... email' };
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