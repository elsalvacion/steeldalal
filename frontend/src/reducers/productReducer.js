import {
  ALL_PRODUCT_ERROR,
  ALL_PRODUCT_LOADING,
  ALL_PRODUCT_RESET,
  ALL_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  CREATE_PRODUCT_LOADING,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_LOADING,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  EDIT_PRODUCT_LOADING,
  EDIT_PRODUCT_RESET,
  EDIT_PRODUCT_SUCCESS,
  FETCH_SELLERS_ERROR,
  FETCH_SELLERS_LOADING,
  FETCH_SELLERS_RESET,
  FETCH_SELLERS_SUCCESS,
  LATEST_PRODUCT_ERROR,
  LATEST_PRODUCT_LOADING,
  LATEST_PRODUCT_RESET,
  LATEST_PRODUCT_SUCCESS,
  PRODUCT_UPLOAD_ERROR,
  PRODUCT_UPLOAD_LOADING,
  PRODUCT_UPLOAD_RESET,
  PRODUCT_UPLOAD_SUCCESS,
  SELLER_PRODUCTS_ERROR,
  SELLER_PRODUCTS_LOADING,
  SELLER_PRODUCTS_RESET,
  SELLER_PRODUCTS_SUCCESS,
  SINGLE_PRODUCT_ERROR,
  SINGLE_PRODUCT_LOADING,
  SINGLE_PRODUCT_RESET,
  SINGLE_PRODUCT_SUCCESS,
  YOUR_PRODUCT_ERROR,
  YOUR_PRODUCT_LOADING,
  YOUR_PRODUCT_RESET,
  YOUR_PRODUCT_SUCCESS,
} from "./types/productTypes";

export const latestProductReducer = (state = {}, action) => {
  switch (action.type) {
    case LATEST_PRODUCT_LOADING:
      return {
        loading: true,
      };
    case LATEST_PRODUCT_SUCCESS:
      return {
        products: action.payload,
      };
    case LATEST_PRODUCT_ERROR:
      return {
        error: action.payload,
      };
    case LATEST_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const allProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_PRODUCT_LOADING:
      return {
        loading: true,
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        products: action.payload,
      };
    case ALL_PRODUCT_ERROR:
      return {
        error: action.payload,
      };
    case ALL_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const yourProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case YOUR_PRODUCT_LOADING:
      return {
        loading: true,
      };
    case YOUR_PRODUCT_SUCCESS:
      return {
        products: action.payload,
      };
    case YOUR_PRODUCT_ERROR:
      return {
        error: action.payload,
      };
    case YOUR_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_PRODUCT_LOADING:
      return {
        loading: true,
      };
    case SINGLE_PRODUCT_SUCCESS:
      return {
        product: action.payload,
      };
    case SINGLE_PRODUCT_ERROR:
      return {
        error: action.payload,
      };
    case SINGLE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const editProductReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PRODUCT_LOADING:
      return {
        loading: true,
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        success: true,
      };
    case EDIT_PRODUCT_ERROR:
      return {
        error: action.payload,
      };
    case EDIT_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const productUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPLOAD_LOADING:
      return {
        loading: true,
      };
    case PRODUCT_UPLOAD_SUCCESS:
      return {
        images: action.payload,
      };
    case PRODUCT_UPLOAD_ERROR:
      return {
        error: action.payload,
      };
    case PRODUCT_UPLOAD_RESET:
      return {};
    default:
      return state;
  }
};

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_LOADING:
      return {
        loading: true,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        success: true,
      };
    case CREATE_PRODUCT_ERROR:
      return {
        error: action.payload,
      };
    case CREATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_LOADING:
      return {
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        success: true,
      };
    case DELETE_PRODUCT_ERROR:
      return {
        error: action.payload,
      };
    case DELETE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const fetchSellersReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SELLERS_LOADING:
      return {
        loading: true,
      };
    case FETCH_SELLERS_SUCCESS:
      return {
        sellers: action.payload,
      };
    case FETCH_SELLERS_ERROR:
      return {
        error: action.payload,
      };
    case FETCH_SELLERS_RESET:
      return {};
    default:
      return state;
  }
};

export const sellerProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case SELLER_PRODUCTS_LOADING:
      return {
        loading: true,
      };
    case SELLER_PRODUCTS_SUCCESS:
      return {
        products: action.payload,
      };
    case SELLER_PRODUCTS_ERROR:
      return {
        error: action.payload,
      };
    case SELLER_PRODUCTS_RESET:
      return {};
    default:
      return state;
  }
};
