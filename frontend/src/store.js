import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { loginReducer, verifyEmailReducer } from "./reducers/authReducer";
import {
  latestProductReducer,
  singleProductReducer,
} from "./reducers/productReducer";
import { fetchCategoryReducer } from "./reducers/categoryReducer";
import {
  addToCartReducer,
  deleteCartReducer,
  editCartReducer,
  getCartReducer,
} from "./reducers/cartReducer";

const reducers = combineReducers({
  userLogin: loginReducer,
  verifyEmail: verifyEmailReducer,
  latestProduct: latestProductReducer,
  fetchCategories: fetchCategoryReducer,
  singleProduct: singleProductReducer,
  addCart: addToCartReducer,
  editCart: editCartReducer,
  deleteCart: deleteCartReducer,
  getCart: getCartReducer,
});

const middleware = [thunk];
const initialState = {
  userLogin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  getCart: {
    keys: localStorage.getItem("cart")
      ? Object.keys(JSON.parse(localStorage.getItem("cart")))
      : [],
    cart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {},
  },
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
