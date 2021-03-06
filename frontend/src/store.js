import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import {
  confirmOtpReducer,
  createBizReducer,
  editBizReducer,
  editUserReducer,
  loginReducer,
  verifyPhoneReducer,
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
  fetchSellerOrderReducer,
  orderInStockReducer,
  payOrderReducer,
  placeOrderReducer,
  saveOrderPaymentReducer,
} from "./reducers/orderReducer";
import { searchReducer, searchValueReducer } from "./reducers/searchReducer";
import {
  fetchAdminOrderReducer,
  fetchAdminOrdersReducer,
  fetchAdminProductReducer,
  fetchAdminProductsReducer,
  fetchAdminUserReducer,
  fetchAdminUsersReducer,
  updateAdminOrderReducer,
  updateAdminProductReducer,
  updateAdminUserReducer,
} from "./reducers/adminReducer";

const reducers = combineReducers({
  userLogin: loginReducer,
  editUser: editUserReducer,
  verifyPhone: verifyPhoneReducer,
  confirmOtp: confirmOtpReducer,
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
  savePayment: saveOrderPaymentReducer,
  placeOrder: placeOrderReducer,
  fetchOrders: fetchOrdersReducer,
  fetchOrder: fetchOrderReducer,
  orderInStock: orderInStockReducer,
  fetchSellerOrder: fetchSellerOrderReducer,
  search: searchReducer,
  searchValue: searchValueReducer,
  createBiz: createBizReducer,
  editBiz: editBizReducer,
  fetchSellers: fetchSellersReducer,
  sellerProducts: sellerProductsReducer,
  adminOrders: fetchAdminOrdersReducer,
  adminOrder: fetchAdminOrderReducer,
  adminOrderUpdate: updateAdminOrderReducer,
  adminUsers: fetchAdminUsersReducer,
  adminUser: fetchAdminUserReducer,
  adminUserUpdate: updateAdminUserReducer,
  adminProducts: fetchAdminProductsReducer,
  adminProduct: fetchAdminProductReducer,
  adminProductUpdate: updateAdminProductReducer,
});

const middleware = [thunk];
const initialState = {
  userLogin: {
    userInfo: sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
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
