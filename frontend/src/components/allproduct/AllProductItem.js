import React from "react";
import "./AllProductItem.css";
import { Link } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";

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
        <FaRupeeSign /> <span>{product.price}</span>
      </p>
    </Link>
  );
};

export default AllProductItem;
