import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import {
  createBizReducer,
  editBizReducer,
  editUserReducer,
  loginReducer,
  verifyEmailReducer,
} from "./reducers/authReducer";
import {
  allProductsReducer,
  createProductReducer,
  deleteProductReducer,
  editProductReducer,
  fetchSellersReducer,
  latestProductReducer,
  productUploadReducer,
  sellerProductsReducer,
  singleProductReducer,
  yourProductsReducer,
} from "./reducers/productReducer";
import { fetchCategoryReducer } from "./reducers/categoryReducer";
import {
  addShippingInfoReducer,
  addToBagReducer,
  addToCartReducer,
  changeQtyReducer,
  deleteCartReducer,
  getBagReducer,
  getCartReducer,
  getShippingInfoReducer,
  selectCartReducer,
} from "./reducers/cartReducer";
import { loadMessagesReducer, socketReducer } from "./reducers/chatReducer";
import {
  fetchOrderReducer,
  fetchOrdersReducer,
  payOrderReducer,
  placeOrderReducer,
} from "./reducers/orderReducer";
import { searchReducer, searchValueReducer } from "./reducers/searchReducer";

const reducers = combineReducers({
  userLogin: loginReducer,
  editUser: editUserReducer,
  verifyEmail: verifyEmailReducer,
  latestProduct: latestProductReducer,
  fetchCategories: fetchCategoryReducer,
  singleProduct: singleProductReducer,
  allProducts: allProductsReducer,
  addCart: addToCartReducer,
  changeQty: changeQtyReducer,
  deleteCart: deleteCartReducer,
  getCart: getCartReducer,
  selectCart: selectCartReducer,
  getBag: getBagReducer,
  addBag: addToBagReducer,
  uploadProduct: productUploadReducer,
  createProduct: createProductReducer,
  yourProduct: yourProductsReducer,
  deleteProduct: deleteProductReducer,
  editProduct: editProductReducer,
  getShippingInfo: getShippingInfoReducer,
  addShippingInfo: addShippingInfoReducer,
  socket: socketReducer,
  loadMessages: loadMessagesReducer,
  payOrder: payOrderReducer,
  placeOrder: placeOrderReducer,
  fetchOrders: fetchOrdersReducer,
  fetchOrder: fetchOrderReducer,
  search: searchReducer,
  searchValue: searchValueReducer,
  createBiz: createBizReducer,
  editBiz: editBizReducer,
  fetchSellers: fetchSellersReducer,
  sellerProducts: sellerProductsReducer,
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
  getShippingInfo: {
    shippingDetails: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {},
  },
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
