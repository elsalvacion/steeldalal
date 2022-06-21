import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
const ProductCarouselItem = ({ product }) => {
  const handleDragStart = (e) => e.preventDefault();
  return (
    <Link to={`/product/${product.id}`} className="carouselProduct">
      <img
        onDragStart={handleDragStart}
        src={product.image}
        className="carouselProductImage"
        alt={product.title}
      />
      <div className="carouselProductDesc">
        <Typography component="h4" noWrap>
          {product.title}
        </Typography>
        <p className="allProductItemPrice">
          <b>{product.type}</b>
        </p>
      </div>
    </Link>
  );
};

export default ProductCarouselItem;
