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
import SingleScategoryScreen from "./screens/SingleScategoryScreen";

const App = () => {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId="31292816526-u02re3s8fr3fie9gu4j68st9oadp8sdu.apps.googleusercontent.com">
        <HashRouter>
          <Nav />
          <Switch>
            <div className="app">
              <Route exact path="/" component={HomeScreen} />
              <Route exact path="/product/:id" component={ProductScreen} />
              <Route exact path="/login" component={LoginScreen} />
              <Route exact path="/register" component={LoginScreen} />
              <Route exact path="/profile" component={ProfileScreen} />
              <Route exact path="/category" component={CategoryScreen} />
              <Route
                exact
                path="/category/:category"
                component={SingleScategoryScreen}
              />
              <Route exact path="/cart" component={CartScreen} />
            </div>
          </Switch>
          <MobileBottomFooter />
          <Footer />
        </HashRouter>
      </GoogleOAuthProvider>
    </Provider>
  );
};

export default App;
