import React from "react";
import "./AllProductItem.css";
import { Link } from "react-router-dom";

import { CurrencyRupee } from "@mui/icons-material";

const AllProductItem = ({ product }) => {
  return (
    <Link className="allProductItemContainer" to={`/product/${product.id}`}>
      <img
        src={product.image}
        className="allProductItemImage"
        alt={`steeldalal.com ${product.title}`}
      />
      <p className="allProductItemTitle">{product.title}</p>
      <p className="allProductItemPrice">
        <CurrencyRupee /> <span>{product.price}</span>
      </p>
    </Link>
  );
};

export default AllProductItem;
