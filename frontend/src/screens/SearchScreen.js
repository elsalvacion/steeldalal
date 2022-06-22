import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Container } from "@mui/material";
import AllProductItem from "../components/allproduct/AllProductItem";
import CustomAlert from "../components/layout/CustomAlert";
import { SEARCH_RESET } from "../reducers/types/searchTypes";
import SingleCategoryContainer from "../components/category/SingleCategoryContainer";

const SearchScreen = () => {
  const dispatch = useDispatch();
  const { loading, result, error } = useSelector((state) => state.search);
  const { value } = useSelector((state) => state.searchValue);

  return (
    <Container>
      <SingleCategoryContainer>
        {loading ? (
          <Typography variant="h5">Searching...</Typography>
        ) : error ? (
          <CustomAlert
            error={error}
            handleClose={() => dispatch({ type: SEARCH_RESET })}
          />
        ) : result ? (
          result.length > 0 ? (
            <>
              <Typography variant="h5" sx={{ ml: 2 }}>
                {`'${value}'`} Results
              </Typography>
              <div className="allProductContent">
                {result.map((product) => (
                  <AllProductItem key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <Typography>No Product Found</Typography>
          )
        ) : (
          <Typography variant="h5">Search Something</Typography>
        )}
      </SingleCategoryContainer>
    </Container>
  );
};

export default SearchScreen;
