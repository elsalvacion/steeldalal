import {
  ADD_BAG_ERROR,
  ADD_BAG_LOADING,
  ADD_BAG_SUCCESS,
  ADD_CART_ERROR,
  ADD_CART_LOADING,
  ADD_CART_SUCCESS,
  CHANGE_QTY_ERROR,
  CHANGE_QTY_LOADING,
  CHANGE_QTY_SUCCESS,
  DELETE_CART_ERROR,
  DELETE_CART_LOADING,
  DELETE_CART_SUCCESS,
  GET_BAG_ERROR,
  GET_BAG_LOADING,
  GET_BAG_RESET,
  GET_BAG_SUCCESS,
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
    let cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {};

    if (cart[details.id]) {
      cart[details.id].specs[details.specs.id] = details.specs;
    } else {
      if (Object.keys.length > 0) {
        Object.keys(cart).forEach((key) => {
          if (cart[key].seller.name !== details.seller.name) {
            delete cart[key];
          }
        });
      }

      cart[details.id] = {
        ...details,
        specs: {
          [details.specs.id]: details.specs,
        },
      };
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("bag", JSON.stringify(cart));
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

    dispatch({
      type: GET_CART_SUCCESS,
      payload: cart,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_CART_ERROR,
      payload: error.response.data,
    });
  }
};

export const deleteCartAction = (id, specId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CART_LOADING });
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {};
    if (Object.keys(cart[id].specs).length > 1) {
      delete cart[id].specs[specId];
    } else {
      delete cart[id];
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("bag", JSON.stringify(cart));

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
    if (choice) {
      localStorage.setItem("bag", JSON.stringify(cart));
      addToBagAction(cart[id]);
    } else {
      const bag = localStorage.getItem("bag")
        ? JSON.parse(localStorage.getItem("bag"))
        : {};
      delete bag[id];
      localStorage.setItem("bag", JSON.stringify(bag));
    }
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

export const addToBagAction = (details) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_BAG_LOADING });
    const bag = localStorage.getItem("bag")
      ? JSON.parse(localStorage.getItem("bag"))
      : {};
    bag[details.id] = details;
    localStorage.setItem("bag", JSON.stringify(bag));
    dispatch({
      type: ADD_BAG_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_BAG_ERROR,
      payload: error.response.data,
    });
  }
};

export const getBagAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_BAG_LOADING });
    const bag = localStorage.getItem("bag")
      ? JSON.parse(localStorage.getItem("bag"))
      : {};
    dispatch({
      type: GET_BAG_SUCCESS,
      payload: bag,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_BAG_ERROR,
      payload: error.response.data,
    });
  }
};

export const resetBagAction = () => (dispatch) => {
  localStorage.removeItem("bag");
  dispatch({
    type: GET_BAG_RESET,
  });
};
