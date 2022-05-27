import {
  CurrencyRupeeSharp,
  ShoppingCartCheckout,
  ShoppingBag,
} from "@mui/icons-material";
import { Button, Rating, Typography } from "@mui/material";
import React, { useState } from "react";
import "./ProductDescription.css";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../../actions/cartAction";
import ChangeQuantity from "../layout/ChangeQuantity";

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
      <Typography variant="h5" component="h5">
        {details.title}
      </Typography>
      <br />
      <br />
      <div className="productDesPrice">
        <sup>
          <CurrencyRupeeSharp />
        </sup>
        <Typography>{details.price}</Typography>
      </div>
      <br />
      <Rating name="read-only" value={details.rating} readOnly size="large" />
      <br />
      <br />
      <Typography>
        <b>Brand: </b>
        {details.brand}
      </Typography>
      <br />
      <Typography>
        <b>Category: </b>
        {details.category}
      </Typography>
      <br />
      <Typography>
        <b>Type: </b>
        {details.type}
      </Typography>
      <br />
      <Typography>
        <b>Description: </b>
        {details.details}
      </Typography>
      <br />
      <div className="productDesQty">
        <Typography>
          <b>Quantity: </b>
        </Typography>
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
        <Button variant="contained" color="primary" endIcon={<ShoppingBag />}>
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
          endIcon={<ShoppingCartCheckout />}
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
