import { CurrencyRupee } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import "./OrderSummary.css";
const OrderSummary = ({ bagState }) => {
  const { loading, error, keys, bag } = bagState;
  const [subTotal] = useState(
    keys.reduce(
      (previousValue, currentValue) =>
        previousValue + bag[currentValue].price * bag[currentValue].qty,
      0
    )
  );

  return (
    <div className="orderSummaryContainer">
      <div className="orderSummaryLeft">
        <Typography>Order Items</Typography>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          keys.map((key) => (
            <div key={key} className="orderSummaryBagItem">
              <img src={bag[key].image} alt={bag[key].title} />
              <Typography>Qty: {bag[key].qty}</Typography>
              <Typography>
                <FaRupeeSign sx={{ mr: 1 }} />
                {(bag[key].qty * bag[key].price).toFixed(2)}
              </Typography>
            </div>
          ))
        )}
      </div>
      <div className="orderSummaryRight">
        <Typography>Pricing Summary</Typography>
        <div className="cartContentTotal">
          <Typography>Sub Total</Typography>
          <Typography component="span">
            <FaRupeeSign />
            {subTotal === 0 ? 0 : subTotal.toFixed(2)}
          </Typography>
        </div>
        <div className="cartContentTotal">
          <Typography>Shipping Fee</Typography>
          <Typography component="span">
            <FaRupeeSign />
            {200}
          </Typography>
        </div>

        <div className="cartContentTotal">
          <Typography>Total</Typography>
          <Typography component="span">
            <FaRupeeSign />
            {subTotal + 200}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
