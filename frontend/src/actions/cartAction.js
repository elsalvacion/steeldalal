import {
  ADD_CART_ERROR,
  ADD_CART_LOADING,
  ADD_CART_SUCCESS,
  GET_CART_ERROR,
  GET_CART_LOADING,
  GET_CART_SUCCESS,
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
