import { Container } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchYourProductsAction } from "../actions/productAction";
import ManageYourProductContent from "../components/allproduct/ManageYourProductContent";
import { Typography } from "@material-ui/core";
import CustomAlert from "../components/layout/CustomAlert";
import {
  DELETE_PRODUCT_RESET,
  SINGLE_PRODUCT_RESET,
  YOUR_PRODUCT_RESET,
} from "../reducers/types/productTypes";
import { useHistory } from "react-router-dom";
const ManageProductScreen = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(
    (state) => state.yourProduct
  );

  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: deleteProductSuccess } = useSelector(
    (state) => state.deleteProduct
  );

  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login?redirect=manage-product");
    } else {
      dispatch(fetchYourProductsAction());
      dispatch({ type: SINGLE_PRODUCT_RESET });
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, userInfo, history, deleteProductSuccess]);
  return (
    <Container>
      <br />
      <Typography component="h6" variant="h6">
        Your Products
      </Typography>

      {loading ? (
        <p>loading....</p>
      ) : error ? (
        <CustomAlert
          type="error"
          text={error}
          handleClose={() => dispatch({ type: YOUR_PRODUCT_RESET })}
        />
      ) : (
        <ManageYourProductContent products={products} />
      )}
    </Container>
  );
};

export default ManageProductScreen;
