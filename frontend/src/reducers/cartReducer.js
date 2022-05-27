import {
  ADD_CART_ERROR,
  ADD_CART_LOADING,
  ADD_CART_RESET,
  ADD_CART_SUCCESS,
  CHANGE_QTY_ERROR,
  CHANGE_QTY_LOADING,
  CHANGE_QTY_RESET,
  CHANGE_QTY_SUCCESS,
  DELETE_CART_ERROR,
  DELETE_CART_LOADING,
  DELETE_CART_RESET,
  DELETE_CART_SUCCESS,
  GET_CART_ERROR,
  GET_CART_LOADING,
  GET_CART_RESET,
  GET_CART_SUCCESS,
  SELECT_CART_ITEM_ERROR,
  SELECT_CART_ITEM_LOADING,
  SELECT_CART_ITEM_RESET,
  SELECT_CART_ITEM_SUCCESS,
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

export const changeQtyReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_QTY_LOADING:
      return {
        loading: true,
      };
    case CHANGE_QTY_SUCCESS:
      return {
        success: true,
      };
    case CHANGE_QTY_ERROR:
      return {
        error: action.payload,
      };
    case CHANGE_QTY_RESET:
      return {};
    default:
      return state;
  }
};

export const selectCartReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_CART_ITEM_LOADING:
      return {
        loading: true,
      };
    case SELECT_CART_ITEM_SUCCESS:
      return {
        success: true,
      };
    case SELECT_CART_ITEM_ERROR:
      return {
        error: action.payload,
      };
    case SELECT_CART_ITEM_RESET:
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
