import { Provider } from "react-redux";
import store from "./store";
import { HashRouter, Route, Switch } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProfileScreen from "./screens/ProfileScreen";
import MobileBottomFooter from "./components/layout/MobileBottomFooter";
import CategoryScreen from "./screens/CategoryScreen";
import CartScreen from "./screens/CartScreen";
import SingleCategoryScreen from "./screens/SingleCategoryScreen";
import AllProductScreen from "./screens/AllProductScreen";
import ScrollToTop from "./components/layout/ScrollToTop";
import CreateProductScreen from "./screens/CreateProductScreen";
import ManageProductScreen from "./screens/ManageProductScreen";
import EditProductScreen from "./screens/EditProductScreen";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_LOGIN}>
      <Provider store={store}>
        <div id="back-to-top-anchor"></div>
        <HashRouter>
          <Nav />
          <Switch>
            <div className="app" id="app">
              <Route exact path="/" component={HomeScreen} />
              <Route exact path="/products" component={AllProductScreen} />
              <Route
                exact
                path="/create-product"
                component={CreateProductScreen}
              />
              <Route
                exact
                path="/manage-product"
                component={ManageProductScreen}
              />
              <Route
                exact
                path="/edit-product/:id"
                component={EditProductScreen}
              />
              <Route exact path="/product/:id" component={ProductScreen} />
              <Route exact path="/login" component={LoginScreen} />
              <Route exact path="/register" component={LoginScreen} />
              <Route exact path="/profile" component={ProfileScreen} />
              <Route exact path="/category" component={CategoryScreen} />
              <Route
                exact
                path="/category/:category"
                component={SingleCategoryScreen}
              />
              <Route exact path="/cart" component={CartScreen} />
            </div>
          </Switch>
          <ScrollToTop />
          <MobileBottomFooter />
          <Footer />
        </HashRouter>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default App;
