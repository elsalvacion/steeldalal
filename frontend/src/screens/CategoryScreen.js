import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoryAction } from "../actions/categoryAction";
import CategoryScreenShimmer from "../shimmers/category/CategoryScreenShimmer";
import CategoryScreenContent from "../components/category/CategoryScreenContent";
import CustomAlert from "../components/layout/CustomAlert";
import { FETCH_CATEGORY_RESET } from "../reducers/types/categoryTypes";
import CustomHelmet from "../components/layout/CustomHelmet";
const CategoryScreen = () => {
  const dispatch = useDispatch();
  const { loading, categories, error } = useSelector(
    (state) => state.fetchCategories
  );
  useEffect(() => {
    dispatch(fetchCategoryAction());
  }, [dispatch]);
  return (
    <Container>
      <CustomHelmet
        title="Categories"
        desc="You can find all steel and metal categories at steeldalal.com ranging from steels, alumunium, coils etc."
      />
      {loading ? (
        <CategoryScreenShimmer />
      ) : error ? (
        <CustomAlert
          text={error}
          type="error"
          handleClose={() => dispatch({ type: FETCH_CATEGORY_RESET })}
        />
      ) : (
        categories && <CategoryScreenContent categories={categories} />
      )}
    </Container>
  );
};

export default CategoryScreen;
