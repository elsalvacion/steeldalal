import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProductsAction } from "../actions/productAction";
import ProductDetailSection from "../components/product/ProductDetailSection";
import CustomAlert from "../components/layout/CustomAlert";
import { EDIT_PRODUCT_RESET, SINGLE_PRODUCT_RESET } from "../reducers/types/productTypes";
import { getCartAction } from "../actions/cartAction";
import { ADD_CART_RESET } from "../reducers/types/cartTypes";
const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.singleProduct
  );
  const { success } = useSelector((state) => state.addCart);

  useEffect(() => {
    // if (!product || id !== product.id) {
    dispatch(fetchSingleProductsAction(id));
    dispatch({ type: ADD_CART_RESET });
    dispatch({type: EDIT_PRODUCT_RESET})
    // }
    // eslint-disable-next-line
  }, [id, dispatch]);
  useEffect(() => {
    if (success) {
      dispatch(getCartAction());
    }
  }, [success, dispatch]);
  return (
    <div>
      <Container>
        {loading ? (
          <h4>Loading ..</h4>
        ) : error ? (
          <CustomAlert
            text={error}
            type="danger"
            handleClose={() => dispatch({ type: SINGLE_PRODUCT_RESET })}
          />
        ) : product ? (
          <ProductDetailSection product={product} />
        ) : null}
      </Container>
    </div>
  );
};

export default ProductScreen;
