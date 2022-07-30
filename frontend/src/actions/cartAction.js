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
    let cart = sessionStorage.getItem("cart")
      ? JSON.parse(sessionStorage.getItem("cart"))
      : {};
    const newDetails = { ...details, specs: {} };
    let moqError = false;
    let qtys = 0;
    if (cart[details.id]) {
      Object.keys(details.specs).forEach((key) => {
        if (
          details.specs[key].yourQty !== "" &&
          Number(details.specs[key].yourQty) > 0 &&
          Number(details.specs[key].yourQty) <= Number(details.specs[key].moq)
        ) {
          newDetails.specs[key] = details.specs[key];
          newDetails.specs[key].yourQty = Number(details.specs[key].yourQty);
          qtys++;
        } else if (
          Number(details.specs[key].yourQty) > Number(details.specs[key].moq)
        )
          moqError = true;
      });
    } else {
      Object.keys(cart).forEach((key) => {
        if (cart[key].seller.name !== details.seller.name) {
          delete cart[key];
        }
      });

      Object.keys(details.specs).forEach((key) => {
        if (
          details.specs[key].yourQty !== "" &&
          Number(details.specs[key].yourQty) > 0 &&
          Number(details.specs[key].yourQty) <= Number(details.specs[key].moq)
        ) {
          newDetails.specs[key] = details.specs[key];
          newDetails.specs[key].yourQty = Number(details.specs[key].yourQty);
          qtys++;
        }
        if (Number(details.specs[key].yourQty) > Number(details.specs[key].moq))
          moqError = true;
      });
    }
    if (moqError === true) {
      dispatch({
        type: ADD_CART_ERROR,
        payload: "Qty greater than MOQ",
      });
    } else if (qtys === 0) {
      dispatch({
        type: ADD_CART_ERROR,
        payload: "Fill Qty",
      });
    } else {
      cart[newDetails.id] = newDetails;
      sessionStorage.setItem("cart", JSON.stringify(cart));
      sessionStorage.setItem("bag", JSON.stringify(cart));
      dispatch({
        type: ADD_CART_SUCCESS,
      });
    }
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
    const cart = sessionStorage.getItem("cart")
      ? JSON.parse(sessionStorage.getItem("cart"))
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
    const cart = sessionStorage.getItem("cart")
      ? JSON.parse(sessionStorage.getItem("cart"))
      : {};
    if (Object.keys(cart[id].specs).length > 1) {
      delete cart[id].specs[specId];
    } else {
      delete cart[id];
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    sessionStorage.setItem("bag", JSON.stringify(cart));

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
    const cart = sessionStorage.getItem("cart")
      ? JSON.parse(sessionStorage.getItem("cart"))
      : {};
    cart[id].quantity = qty;
    sessionStorage.setItem("cart", JSON.stringify(cart));

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
    const cart = sessionStorage.getItem("cart")
      ? JSON.parse(sessionStorage.getItem("cart"))
      : {};
    cart[id].selected = choice;
    sessionStorage.setItem("cart", JSON.stringify(cart));
    if (choice) {
      sessionStorage.setItem("bag", JSON.stringify(cart));
      addToBagAction(cart[id]);
    } else {
      const bag = sessionStorage.getItem("bag")
        ? JSON.parse(sessionStorage.getItem("bag"))
        : {};
      delete bag[id];
      sessionStorage.setItem("bag", JSON.stringify(bag));
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
    const bag = sessionStorage.getItem("bag")
      ? JSON.parse(sessionStorage.getItem("bag"))
      : {};
    bag[details.id] = details;
    sessionStorage.setItem("bag", JSON.stringify(bag));
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
    const bag = sessionStorage.getItem("bag")
      ? JSON.parse(sessionStorage.getItem("bag"))
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
  sessionStorage.removeItem("bag");
  dispatch({
    type: GET_BAG_RESET,
  });
};
