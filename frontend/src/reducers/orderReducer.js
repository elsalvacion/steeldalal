import {
  FETCH_ORDERS_ERROR,
  FETCH_ORDERS_LOADING,
  FETCH_ORDERS_RESET,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDER_ERROR,
  FETCH_ORDER_LOADING,
  FETCH_ORDER_RESET,
  FETCH_ORDER_SUCCESS,
  FETCH_SELLER_ORDER_ERROR,
  FETCH_SELLER_ORDER_LOADING,
  FETCH_SELLER_ORDER_RESET,
  FETCH_SELLER_ORDER_SUCCESS,
  ORDER_INSTOCK_ERROR,
  ORDER_INSTOCK_LOADING,
  ORDER_INSTOCK_RESET,
  ORDER_INSTOCK_SUCCESS,
  PAY_ORDER_ERROR,
  PAY_ORDER_LOADING,
  PAY_ORDER_RESET,
  PAY_ORDER_SUCCESS,
  PLACE_ORDER_ERROR,
  PLACE_ORDER_LOADING,
  PLACE_ORDER_RESET,
  PLACE_ORDER_SUCCESS,
  SAVE_ORDER_PAYMENT_ERROR,
  SAVE_ORDER_PAYMENT_LOADING,
  SAVE_ORDER_PAYMENT_RESET,
  SAVE_ORDER_PAYMENT_SUCCESS,
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

export const fetchOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ORDERS_LOADING:
      return {
        loading: true,
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        orders: action.payload,
      };
    case FETCH_ORDERS_ERROR:
      return {
        error: action.payload,
      };
    case FETCH_ORDERS_RESET:
      return {};
    default:
      return state;
  }
};

export const fetchOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ORDER_LOADING:
      return {
        loading: true,
      };
    case FETCH_ORDER_SUCCESS:
      return {
        order: action.payload,
      };
    case FETCH_ORDER_ERROR:
      return {
        error: action.payload,
      };
    case FETCH_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const fetchSellerOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SELLER_ORDER_LOADING:
      return {
        loading: true,
      };
    case FETCH_SELLER_ORDER_SUCCESS:
      return {
        order: action.payload,
      };
    case FETCH_SELLER_ORDER_ERROR:
      return {
        error: action.payload,
      };
    case FETCH_SELLER_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderInStockReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_INSTOCK_LOADING:
      return {
        loading: true,
      };
    case ORDER_INSTOCK_SUCCESS:
      return {
        success: true,
      };
    case ORDER_INSTOCK_ERROR:
      return {
        error: action.payload,
      };
    case ORDER_INSTOCK_RESET:
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
        paymentData: action.payload,
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

export const saveOrderPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_ORDER_PAYMENT_LOADING:
      return {
        loading: true,
      };
    case SAVE_ORDER_PAYMENT_SUCCESS:
      return {
        success: action.payload,
      };
    case SAVE_ORDER_PAYMENT_ERROR:
      return {
        error: action.payload,
      };
    case SAVE_ORDER_PAYMENT_RESET:
      return {};
    default:
      return state;
  }
};
