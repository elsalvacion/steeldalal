import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { loginReducer } from "./reducers/authReducer";
import {latestProductReducer} from './reducers/productReducer'
import { fetchCategoryReducer } from "./reducers/categoryReducer";

const reducers = combineReducers({
  userLogin: loginReducer,
  latestProduct: latestProductReducer,
  fetchCategory: fetchCategoryReducer
});

const middleware = [thunk];
const initialState = {
  userLogin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;