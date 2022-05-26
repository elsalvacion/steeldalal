import {
  ADD_CART_ERROR,
  ADD_CART_LOADING,
  ADD_CART_RESET,
  ADD_CART_SUCCESS,
  DELETE_CART_ERROR,
  DELETE_CART_LOADING,
  DELETE_CART_RESET,
  DELETE_CART_SUCCESS,
  EDIT_CART_ERROR,
  EDIT_CART_LOADING,
  EDIT_CART_RESET,
  EDIT_CART_SUCCESS,
  GET_CART_ERROR,
  GET_CART_LOADING,
  GET_CART_RESET,
  GET_CART_SUCCESS,
} from "./types/cartTypes";

export const getCartReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CART_LOADING:
      return {
        loading: true,
      };
    case GET_CART_SUCCESS:
      return action.payload;
    case GET_CART_ERROR:
      return {
        error: action.payload,
      };
    case GET_CART_RESET:
      return {};
    default:
      return state;
  }
};

export const addToCartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CART_LOADING:
      return {
        loading: true,
      };
    case ADD_CART_SUCCESS:
      return {
        success: true,
      };
    case ADD_CART_ERROR:
      return {
        error: action.payload,
      };
    case ADD_CART_RESET:
      return {};
    default:
      return state;
  }
};

export const editCartReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_CART_LOADING:
      return {
        loading: true,
      };
    case EDIT_CART_SUCCESS:
      return {
        success: true,
      };
    case EDIT_CART_ERROR:
      return {
        error: action.payload,
      };
    case EDIT_CART_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteCartReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CART_LOADING:
      return {
        loading: true,
      };
    case DELETE_CART_SUCCESS:
      return {
        success: true,
      };
    case DELETE_CART_ERROR:
      return {
        error: action.payload,
      };
    case DELETE_CART_RESET:
      return {};
    default:
      return state;
  }
};
