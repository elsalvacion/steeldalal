import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_CART_RESET } from "../../reducers/types/cartTypes";
import CustomSnack from "../layout/CustomSnack";
import ProductDescription from "./ProductDescription";
import "./ProductDetailSection.css";
import ProductSlider from "./ProductSlider";
import TopBreadCrum from "./TopBreadCrum";
const ProductDetailSection = ({ product }) => {
  const { error: addCartError, success } = useSelector(
    (state) => state.addCart
  );
  const dispatch = useDispatch();
  return (
    <div>
      <TopBreadCrum product={product} />
      {addCartError && (
        <CustomSnack
          type="error"
          text={addCartError}
          handleClose={() => dispatch({ type: ADD_CART_RESET })}
        />
      )}
      {success && (
        <CustomSnack
          type="success"
          text="Product added to your cart"
          handleClose={() => dispatch({ type: ADD_CART_RESET })}
        />
      )}
      <div className="productDetailContainer">
        <ProductSlider image={product.image} />
        <ProductDescription details={product} />
      </div>
    </div>
  );
};

export default ProductDetailSection;
