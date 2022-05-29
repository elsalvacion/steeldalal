import { ShoppingCart, LocalMall } from "@material-ui/icons";
import { Button, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
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
        <ProductSlider image={details.image} />
        <div className="productDesContentTopRight">
          <Typography variant="h6" component="h6">
            {details.title}
          </Typography>
          <br />
          <div className="productDesPrice">
            <sup>
              <FaRupeeSign />
            </sup>
            <Typography>{details.price}</Typography>
          </div>
          <br />
          <Rating
            name="read-only"
            value={details.rating}
            readOnly
            size="large"
          />
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
        </div>
      </div>
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
