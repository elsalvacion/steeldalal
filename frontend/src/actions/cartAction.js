import {
  ADD_CART_ERROR,
  ADD_CART_LOADING,
  ADD_CART_SUCCESS,
  CHANGE_QTY_ERROR,
  CHANGE_QTY_LOADING,
  CHANGE_QTY_SUCCESS,
  DELETE_CART_ERROR,
  DELETE_CART_LOADING,
  DELETE_CART_SUCCESS,
  GET_CART_ERROR,
  GET_CART_LOADING,
  GET_CART_SUCCESS,
  SELECT_CART_ITEM_ERROR,
  SELECT_CART_ITEM_LOADING,
  SELECT_CART_ITEM_SUCCESS,
} from "../reducers/types/cartTypes";

export const addToCartAction = (details) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_CART_LOADING });
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {};
    cart[details.id] = details;
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: ADD_CART_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_CART_ERROR,
      payload: error.response.data,
    });
  }
};

export const getCartAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_LOADING });
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {};
    const keys = Object.keys(cart);
    dispatch({
      type: GET_CART_SUCCESS,
      payload: {
        cart: cart,
        keys: keys,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_CART_ERROR,
      payload: error.response.data,
    });
  }
};

export const deleteCartAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CART_LOADING });
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {};
    delete cart[id];
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: DELETE_CART_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_CART_ERROR,
      payload: error.response.data,
    });
  }
};

export const changeQtyAction = (id, qty) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_QTY_LOADING });
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {};
    cart[id].quantity = qty;
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: CHANGE_QTY_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CHANGE_QTY_ERROR,
      payload: error.response.data,
    });
  }
};

export const selectCartAction = (id, choice) => async (dispatch) => {
  try {
    dispatch({ type: SELECT_CART_ITEM_LOADING });
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {};
    cart[id].selected = choice;
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: SELECT_CART_ITEM_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SELECT_CART_ITEM_ERROR,
      payload: error.response.data,
    });
  }
};
