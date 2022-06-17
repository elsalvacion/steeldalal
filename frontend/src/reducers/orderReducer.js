import {
  PAY_ORDER_ERROR,
  PAY_ORDER_LOADING,
  PAY_ORDER_RESET,
  PAY_ORDER_SUCCESS,
  PLACE_ORDER_ERROR,
  PLACE_ORDER_LOADING,
  PLACE_ORDER_RESET,
  PLACE_ORDER_SUCCESS,
} from "./types/orderTypes";

export const placeOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case PLACE_ORDER_LOADING:
      return {
        loading: true,
      };
    case PLACE_ORDER_SUCCESS:
      return {
        order: action.payload,
      };
    case PLACE_ORDER_ERROR:
      return {
        error: action.payload,
      };
    case PLACE_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const payOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case PAY_ORDER_LOADING:
      return {
        loading: true,
      };
    case PAY_ORDER_SUCCESS:
      return {
        success: true,
      };
    case PAY_ORDER_ERROR:
      return {
        error: action.payload,
      };
    case PAY_ORDER_RESET:
      return {};
    default:
      return state;
  }
};
