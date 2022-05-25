import React from "react";
import ProductDescription from "./ProductDescription";
import "./ProductDetailSection.css";
import ProductSlider from "./ProductSlider";
import TopBreadCrum from "./TopBreadCrum";
const ProductDetailSection = ({ product }) => {
  return (
    <div>
      <TopBreadCrum product={product} />
      <div className="productDetailContainer">
        <ProductSlider image={product.image} />
        <ProductDescription details={product} />
      </div>
    </div>
  );
};

export default ProductDetailSection;
