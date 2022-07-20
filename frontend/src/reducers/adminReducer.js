import {
  FETCH_ADMIN_ORDERS_ERROR,
  FETCH_ADMIN_ORDERS_LOADING,
  FETCH_ADMIN_ORDERS_RESET,
  FETCH_ADMIN_ORDERS_SUCCESS,
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
