import { Typography } from "@mui/material";
import React from "react";
import "./ManageYourProductContent.css";
import ProductDataGrid from "./ProductDataGrid";

const ManageYourProductContent = ({ products }) => {
  return (
    <div className="manageProductContainer">
      {products && products.length > 0 ? (
        <ProductDataGrid products={products} />
      ) : (
        <Typography variant="h6" component="h6">
          No Products
        </Typography>
      )}
    </div>
  );
};

export default ManageYourProductContent;
