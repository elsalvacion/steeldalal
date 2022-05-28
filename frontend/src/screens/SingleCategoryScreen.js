import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import SingleCategoryContainer from "../components/category/SingleCategoryContainer";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProductsAction } from "../actions/productAction";
import AllProductItem from "../components/allproduct/AllProductItem";
import CustomAlert from "../components/layout/CustomAlert";

const SingleCategoryScreen = () => {
  const { category } = useParams();
  const { loading, error, products } = useSelector(
    (state) => state.allProducts
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProductsAction(category));
  }, [category, dispatch]);
  return (
    <Container>
      <br />
      <br />
      <SingleCategoryContainer>
        <Typography variant="h5" component="h5">
          {category}
        </Typography>
        {loading ? (
          <h3>Loading...</h3>
        ) : error ? (
          <CustomAlert />
        ) : products ? (
          <div className="allProductContent">
            {products.map((product) => (
              <AllProductItem key={product.id} product={product} />
            ))}
          </div>
        ) : null}
      </SingleCategoryContainer>
    </Container>
  );
};

export default SingleCategoryScreen;
