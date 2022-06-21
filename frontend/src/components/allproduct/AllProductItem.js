import React from "react";
import "./AllProductItem.css";
import { Link } from "react-router-dom";

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
        <b>{product.type}</b>
      </p>
    </Link>
  );
};

export default AllProductItem;
