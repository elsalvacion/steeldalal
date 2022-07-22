import {
  FETCH_ADMIN_ORDERS_ERROR,
  FETCH_ADMIN_ORDERS_LOADING,
  FETCH_ADMIN_ORDERS_RESET,
  FETCH_ADMIN_ORDERS_SUCCESS,
  FETCH_ADMIN_ORDER_ERROR,
  FETCH_ADMIN_ORDER_LOADING,
  FETCH_ADMIN_ORDER_RESET,
  FETCH_ADMIN_ORDER_SUCCESS,
  FETCH_ADMIN_PRODUCTS_ERROR,
  FETCH_ADMIN_PRODUCTS_LOADING,
  FETCH_ADMIN_PRODUCTS_RESET,
  FETCH_ADMIN_PRODUCTS_SUCCESS,
  FETCH_ADMIN_PRODUCT_ERROR,
  FETCH_ADMIN_PRODUCT_LOADING,
  FETCH_ADMIN_PRODUCT_RESET,
  FETCH_ADMIN_PRODUCT_SUCCESS,
  FETCH_ADMIN_USERS_ERROR,
  FETCH_ADMIN_USERS_LOADING,
  FETCH_ADMIN_USERS_RESET,
  FETCH_ADMIN_USERS_SUCCESS,
  FETCH_ADMIN_USER_ERROR,
  FETCH_ADMIN_USER_LOADING,
  FETCH_ADMIN_USER_RESET,
  FETCH_ADMIN_USER_SUCCESS,
  UPDATE_ADMIN_ORDER_ERROR,
  UPDATE_ADMIN_ORDER_LOADING,
  UPDATE_ADMIN_ORDER_RESET,
  UPDATE_ADMIN_ORDER_SUCCESS,
  UPDATE_ADMIN_PRODUCT_ERROR,
  UPDATE_ADMIN_PRODUCT_LOADING,
  UPDATE_ADMIN_PRODUCT_RESET,
  UPDATE_ADMIN_PRODUCT_SUCCESS,
  UPDATE_ADMIN_USER_ERROR,
  UPDATE_ADMIN_USER_LOADING,
  UPDATE_ADMIN_USER_RESET,
  UPDATE_ADMIN_USER_SUCCESS,
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

export const fetchAdminUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ADMIN_USERS_LOADING:
      return {
        loading: true,
      };
    case FETCH_ADMIN_USERS_SUCCESS:
      return action.payload;
    case FETCH_ADMIN_USERS_ERROR:
      return {
        error: action.payload,
      };
    case FETCH_ADMIN_USERS_RESET:
      return {};
    default:
      return state;
  }
};

export const fetchAdminUserReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ADMIN_USER_LOADING:
      return {
        loading: true,
      };
    case FETCH_ADMIN_USER_SUCCESS:
      return {
        user: action.payload,
      };
    case FETCH_ADMIN_USER_ERROR:
      return {
        error: action.payload,
      };
    case FETCH_ADMIN_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const updateAdminUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ADMIN_USER_LOADING:
      return {
        loading: true,
      };
    case UPDATE_ADMIN_USER_SUCCESS:
      return {
        success: true,
      };
    case UPDATE_ADMIN_USER_ERROR:
      return {
        error: action.payload,
      };
    case UPDATE_ADMIN_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const fetchAdminProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ADMIN_PRODUCTS_LOADING:
      return {
        loading: true,
      };
    case FETCH_ADMIN_PRODUCTS_SUCCESS:
      return action.payload;
    case FETCH_ADMIN_PRODUCTS_ERROR:
      return {
        error: action.payload,
      };
    case FETCH_ADMIN_PRODUCTS_RESET:
      return {};
    default:
      return state;
  }
};

export const fetchAdminProductReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ADMIN_PRODUCT_LOADING:
      return {
        loading: true,
      };
    case FETCH_ADMIN_PRODUCT_SUCCESS:
      return {
        product: action.payload,
      };
    case FETCH_ADMIN_PRODUCT_ERROR:
      return {
        error: action.payload,
      };
    case FETCH_ADMIN_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const updateAdminProductReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ADMIN_PRODUCT_LOADING:
      return {
        loading: true,
      };
    case UPDATE_ADMIN_PRODUCT_SUCCESS:
      return {
        success: true,
      };
    case UPDATE_ADMIN_PRODUCT_ERROR:
      return {
        error: action.payload,
      };
    case UPDATE_ADMIN_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};
