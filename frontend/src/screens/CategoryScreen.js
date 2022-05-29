import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoryAction } from "../actions/categoryAction";
import CategoryScreenShimmer from "../shimmers/category/CategoryScreenShimmer";
import CategoryScreenContent from "../components/category/CategoryScreenContent";
import CustomAlert from "../components/layout/CustomAlert";
import { FETCH_CATEGORY_RESET } from "../reducers/types/categoryTypes";
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
