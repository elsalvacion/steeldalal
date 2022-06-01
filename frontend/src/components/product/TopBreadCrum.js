import React from "react";
import "./TopBreadCrum.css";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";
const TopBreadCrum = ({ product, category }) => {
  const breadcrumbs = [
    <Link to="/products" className="topBreadCrumLink">
      Products
    </Link>,
    <Link to={`/category/${category}`} className="topBreadCrumLink">
      {category}
    </Link>,
  ];
  return (
    <div className="topBreadCrumContainer">
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
};

export default TopBreadCrum;
