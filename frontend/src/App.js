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
import DMScreen from "./screens/DMScreen";
import TermsAndConditionScreen from "./screens/TermsAndConditionScreen";
import WhoAreWeScreen from "./screens/WhoAreWeScreen";
import CompanyScreen from "./screens/CompanyScreen";
import FaqScreen from "./screens/FaqScreen";
import PricingPolicyScreen from "./screens/PricingPolicyScreen";
import RefundPolicyScreen from "./screens/RefundPolicyScreen";
import AcceptancePolicyScreen from "./screens/AcceptancePolicyScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import SearchScreen from "./screens/SearchScreen";
import PrivacyPolicyScreen from "./screens/PrivacyPolicyScreen";
import CreateBizScreen from "./screens/CreateBizScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import EditBizScreen from "./screens/EditBizScreen";
import SingleOrderScreen from "./screens/SingleOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import SellersScreen from "./screens/SellersScreen";
import SingleSellerScreen from "./screens/SingleSellerScreen";
import VerifyNumberScreen from "./screens/VerifyNumberScreen";
import SellerOrders from "./screens/SellerOrders";
import SingleSellerOrder from "./screens/SingleSellerOrder";
import AdminPanelScreen from "./screens/AdminPanelScreen";
import SingleAdminOrderScreen from "./components/admin/order/SingleAdminOrderScreen";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="31292816526-u02re3s8fr3fie9gu4j68st9oadp8sdu.apps.googleusercontent.com">
      <Provider store={store}>
        <div id="back-to-top-anchor"></div>
        <HashRouter>
          <Nav />
          <Switch>
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
            <Route exact path="/create-biz" component={CreateBizScreen} />
            <Route exact path="/edit-biz" component={EditBizScreen} />
            <Route exact path="/register" component={LoginScreen} />
            <Route exact path="/profile" component={ProfileScreen} />
            <Route exact path="/category" component={CategoryScreen} />
            <Route
              exact
              path="/category/:category"
              component={SingleCategoryScreen}
            />
            <Route exact path="/cart" component={CartScreen} />
            <Route exact path="/dm" component={DMScreen} />
            <Route
              exact
              path="/terms-and-conditions"
              component={TermsAndConditionScreen}
            />

            <Route exact path="/who-we-are" component={WhoAreWeScreen} />
            <Route exact path="/company" component={CompanyScreen} />
            <Route exact path="/faq" component={FaqScreen} />
            <Route
              exact
              path="/pricing-policy"
              component={PricingPolicyScreen}
            />
            <Route exact path="/refund-policy" component={RefundPolicyScreen} />
            <Route
              exact
              path="/privacy-policy"
              component={PrivacyPolicyScreen}
            />
            <Route
              exact
              path="/acceptance-policy"
              component={AcceptancePolicyScreen}
            />

            <Route exact path="/checkout" component={CheckoutScreen} />
            <Route exact path="/search" component={SearchScreen} />
            <Route exact path="/order/:id" component={SingleOrderScreen} />
            <Route exact path="/order" component={OrderScreen} />
            <Route exact path="/sellers" component={SellersScreen} />
            <Route exact path="/seller/:id" component={SingleSellerScreen} />
            <Route
              exact
              path="/seller/order/:id"
              component={SingleSellerOrder}
            />
            <Route exact path="/seller/order" component={SellerOrders} />
            <Route exact path="/verify-number" component={VerifyNumberScreen} />
            <Route exact path="/admin-panel" component={AdminPanelScreen} />
            <Route
              exact
              path="/admin-order/:id"
              component={SingleAdminOrderScreen}
            />
            <Route path="*">
              <NotFoundScreen />
            </Route>
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
