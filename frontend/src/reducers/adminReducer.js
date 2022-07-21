import {
  FETCH_ADMIN_ORDERS_ERROR,
  FETCH_ADMIN_ORDERS_LOADING,
  FETCH_ADMIN_ORDERS_RESET,
  FETCH_ADMIN_ORDERS_SUCCESS,
  FETCH_ADMIN_ORDER_ERROR,
  FETCH_ADMIN_ORDER_LOADING,
  FETCH_ADMIN_ORDER_RESET,
  FETCH_ADMIN_ORDER_SUCCESS,
  UPDATE_ADMIN_ORDER_ERROR,
  UPDATE_ADMIN_ORDER_LOADING,
  UPDATE_ADMIN_ORDER_RESET,
  UPDATE_ADMIN_ORDER_SUCCESS,
} from "./types/adminTypes";

export const fetchAdminOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ADMIN_ORDERS_LOADING:
      return {
        loading: true,
      };
    case FETCH_ADMIN_ORDERS_SUCCESS:
      return action.payload;
    case FETCH_ADMIN_ORDERS_ERROR:
      return {
        error: action.payload,
      };
    case FETCH_ADMIN_ORDERS_RESET:
      return {};
    default:
      return state;
  }
};

export const fetchAdminOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ADMIN_ORDER_LOADING:
      return {
        loading: true,
      };
    case FETCH_ADMIN_ORDER_SUCCESS:
      return {
        order: action.payload,
      };
    case FETCH_ADMIN_ORDER_ERROR:
      return {
        error: action.payload,
      };
    case FETCH_ADMIN_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const updateAdminOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ADMIN_ORDER_LOADING:
      return {
        loading: true,
      };
    case UPDATE_ADMIN_ORDER_SUCCESS:
      return {
        success: true,
      };
    case UPDATE_ADMIN_ORDER_ERROR:
      return {
        error: action.payload,
      };
    case UPDATE_ADMIN_ORDER_RESET:
      return {};
    default:
      return state;
  }
};
