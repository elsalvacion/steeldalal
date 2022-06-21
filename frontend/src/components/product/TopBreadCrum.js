import React from "react";
import "./TopBreadCrum.css";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";
const TopBreadCrum = ({ product, category }) => {
  return (
    <div className="topBreadCrumContainer">
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link to="/products" className="topBreadCrumLink">
          Products
        </Link>
        <Link to={`/category/${category}`} className="topBreadCrumLink">
          {category}
        </Link>
        ,
      </Breadcrumbs>
    </div>
  );
};

export default TopBreadCrum;
