import React, { useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import AllProductContainer from "../components/allproduct/AllProductContainer";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoryAction } from "../actions/categoryAction";
import AllProductContent from "../components/allproduct/AllProductContent";
const AllProductScreen = () => {
  const { loading, error, categories } = useSelector(
    (state) => state.fetchCategories
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!categories) dispatch(fetchCategoryAction());
  }, [categories, dispatch]);
  return (
    <Container>
      <br />
      <Typography variant="h5">All Products</Typography>
      <AllProductContainer>
        {categories &&
          categories.map((category, i) => (
            <AllProductContent
              key={category.title}
              idx={i}
              category={category.title}
            />
          ))}
      </AllProductContainer>
    </Container>
  );
};

export default AllProductScreen;
