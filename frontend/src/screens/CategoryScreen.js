import React from "react";
import { Container } from "@mui/material";

import CategoryScreenContent from "../components/category/CategoryScreenContent";
import CustomHelmet from "../components/layout/CustomHelmet";
import { categories } from "../constants/category";

const CategoryScreen = () => {
  return (
    <Container>
      <CustomHelmet
        title="Categories"
        desc="You can find all steel and metal categories at steeldalal.com ranging from steels, alumunium, coils etc."
      />

      {categories && <CategoryScreenContent categories={categories} />}
    </Container>
  );
};

export default CategoryScreen;
