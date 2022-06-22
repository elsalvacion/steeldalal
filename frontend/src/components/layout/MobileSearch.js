import React from "react";
import "./MobileSearch.css";
import Search from "./Search";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Fade, Zoom } from "react-reveal";
import { useDispatch, useSelector } from "react-redux";
import AllProductItem from "../allproduct/AllProductItem";
import CustomAlert from "../layout/CustomAlert";
import { SEARCH_RESET } from "../../reducers/types/searchTypes";
import SingleCategoryContainer from "../category/SingleCategoryContainer";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const MobileSearch = ({ handleClose }) => {
  const dispatch = useDispatch();

  const { loading, result, error } = useSelector((state) => state.search);
  const { value } = useSelector((state) => state.searchValue);
  const { pathname } = useLocation();
  return pathname !== "/search" ? null : (
    <Fade>
      <div className="mobileSearchContainer">
        <div className="mobileSearchBarContainer">
          <Zoom>
            <div className="mobileSearchInputContainer">
              <Search />
            </div>
          </Zoom>
          <IconButton color="primary" onClick={handleClose}>
            <Close />
          </IconButton>
        </div>
        <SingleCategoryContainer>
          {loading ? (
            <Typography variant="h6">Searching...</Typography>
          ) : error ? (
            <CustomAlert
              error={error}
              handleClose={() => dispatch({ type: SEARCH_RESET })}
            />
          ) : result ? (
            result.length > 0 ? (
              <>
                <Typography variant="h6" sx={{ ml: 2 }}>
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
            <Typography variant="h6">Search Something</Typography>
          )}
        </SingleCategoryContainer>
      </div>
    </Fade>
  );
};

export default MobileSearch;
