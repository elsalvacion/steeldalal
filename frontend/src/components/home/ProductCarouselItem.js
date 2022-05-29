import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
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
        <Typography component="p" noWrap>
          <FaRupeeSign />
          {product.price}
        </Typography>
      </div>
    </Link>
  );
};

export default ProductCarouselItem;
