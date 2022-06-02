import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
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
      {/* <br /> */}
      <AllProductContainer>
        <Typography variant="h5">All Steels & Metals</Typography>
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
