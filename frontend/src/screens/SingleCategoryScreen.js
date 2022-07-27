import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";

import { useParams } from "react-router-dom";
import SingleCategoryContainer from "../components/category/SingleCategoryContainer";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProductsAction } from "../actions/productAction";
import AllProductItem from "../components/allproduct/AllProductItem";
import CustomAlert from "../components/layout/CustomAlert";
import CustomHelmet from "../components/layout/CustomHelmet";

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
      <CustomHelmet
        title={category || "Category"}
        desc={category || "Category"}
      />
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
        ) : products && products.length > 0 ? (
          <div className="allProductContent">
            {products.map((product) => (
              <AllProductItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Typography>No products are on sell in the category yet.</Typography>
        )}
      </SingleCategoryContainer>
    </Container>
  );
};

export default SingleCategoryScreen;
