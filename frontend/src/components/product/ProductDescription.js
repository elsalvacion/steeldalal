import { ShoppingCart, LocalMall } from "@mui/icons-material";
import { Button, Typography, Rating } from "@mui/material";
import React, { useState } from "react";
import "./ProductDescription.css";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../../actions/cartAction";
import ChangeQuantity from "../layout/ChangeQuantity";
// import { products } from "../../constants/products";
import ProductSlider from "../product/ProductSlider";
import { FaRupeeSign } from "react-icons/fa";

const ProductDescription = ({ details }) => {
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const countInStock = details.qty;
  const handleChange = (e) => {
    const value = Number(e.target.value);
    setQty(value < 1 ? 1 : value > countInStock ? countInStock : value);
  };
  const handleDecrement = () => setQty(qty === 1 ? 1 : qty - 1);
  const handleIncrement = () =>
    setQty(qty === countInStock ? countInStock : qty + 1);

  return (
    <div className="productDesContainer">
      <div className="productDesContentTop">
        <ProductSlider images={details.images} />
        <div className="productDesContentTopRight">
          <Typography variant="h6" component="h6">
            {details.title}
          </Typography>
          <div className="productDesPrice">
            <sup>
              <FaRupeeSign fontSize={22} />
            </sup>
            <p>{details.price}</p>
          </div>
          <Rating
            name="read-only"
            value={details.rating}
            readOnly
            size="large"
          />

          <p>
            <b>Brand: </b>
            {details.brand}
          </p>
          <p>
            <b>Category: </b>
            {details.category}
          </p>
          <p>
            <b>Type: </b>
            {details.type}
          </p>
        </div>
      </div>
      <p>
        <b>Description: </b>
        {details.details}
      </p>
      <div className="productDesQty">
        <p>
          <b>Quantity: </b>
        </p>
        <ChangeQuantity
          handleChange={handleChange}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          qty={qty}
          countInStock={countInStock}
        />
      </div>
      <br />
      <br />
      <div className="productDesAction">
        <Button variant="contained" color="primary" endIcon={<LocalMall />}>
          BUY NOW
        </Button>
        <Button
          onClick={() =>
            dispatch(
              addToCartAction({
                ...details,
                quantity: qty,
                selected: false,
              })
            )
          }
          endIcon={<ShoppingCart />}
          variant="contained"
          color="inherit"
        >
          ADD TO CART
        </Button>
      </div>
      <br />
    </div>
  );
};

export default ProductDescription;
