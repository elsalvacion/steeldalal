import React from "react";
import { Container, Typography } from "@mui/material";
import AllProductContainer from "../components/allproduct/AllProductContainer";

import AllProductContent from "../components/allproduct/AllProductContent";
import CustomHelmet from "../components/layout/CustomHelmet";
import { categories } from "../constants/category";
const AllProductScreen = () => {
  return (
    <Container>
      <CustomHelmet
        title="Products"
        desc="We have all sort of steel and metal products on sell at our platform"
      />
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
