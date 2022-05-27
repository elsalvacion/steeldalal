import { Button, IconButton, Typography } from "@mui/material";
import React from "react";
import "./CartContent.css";
import {
  ChevronLeftOutlined,
  ChevronRightOutlined,
  CurrencyRupee,
  Delete,
} from "@mui/icons-material";
const CartContent = ({ keys, cart }) => {
  return (
    <div className="cartContentContainer">
      <Typography variant="h5" component="h5">
        Your Cart
      </Typography>
      <div className="cartContentItems">
        <div className="cartContentItemsLeft">
          {keys.map((key) => (
            <div className="cartItem" key={key}>
              <input type="checkbox" className="cartItemCheck" />
              <img
                src={cart[key].image}
                alt={`steeldalal ${cart[key].title}`}
              />
              <Typography className="cartItemTitle">
                {cart[key].title}
              </Typography>
              <Typography className="cartItemPrice">
                <CurrencyRupee />
                {cart[key].price}
              </Typography>
              <div className="cartQuantityContainer">
                <IconButton
                  disabled={cart[key].quantity === 1}
                  // onClick={handleDecrement}
                  color="primary"
                >
                  <ChevronLeftOutlined />
                </IconButton>
                <input disabled type="number" value={cart[key].quantity} />
                <IconButton
                  disabled={cart[key].quantity === cart[key].qty}
                  color="primary"
                >
                  <ChevronRightOutlined />
                </IconButton>
              </div>
              <IconButton color="error" className="cartItemDelete">
                <Delete />
              </IconButton>
            </div>
          ))}
        </div>
        <div className="cartContentItemsRight">
          <Typography variant="h6" component="h6">
            Order Summary
          </Typography>
          <div className="cartContentSubTotal">
            <Typography>Subtotal (0 items)</Typography>
            <Typography component="span">
              <CurrencyRupee />
              0.0
            </Typography>
          </div>
          <div className="cartContentTotal">
            <Typography>Total</Typography>
            <Typography component="span">
              <CurrencyRupee />
              0.0
            </Typography>
          </div>
          <Button variant="contained" color="primary" fullWidth>
            Proceed To Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartContent;
