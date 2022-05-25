import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProductsAction } from "../actions/productAction";
import ProductDetailSection from "../components/product/ProductDetailSection";
import CustomAlert from "../components/layout/CustomAlert";
import { SINGLE_PRODUCT_RESET } from "../reducers/types/productTypes";
const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.singleProduct
  );
  useEffect(() => {
    dispatch(fetchSingleProductsAction(id));
  }, [id, dispatch]);
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
