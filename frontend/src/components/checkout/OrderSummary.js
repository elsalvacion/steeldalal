import { CurrencyRupee, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import "./OrderSummary.css";
const OrderSummary = ({ bagState }) => {
  const { loading, error, keys, bag } = bagState;
  return (
    <div className="orderSummaryContainer">
      <div className="orderSummaryLeft">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          keys.map((key) => (
            <div key={key} className="orderSummaryBagItem">
              <img src={bag[key].image} alt={bag[key].title} />
              <p>Qty: {bag[key].qty}</p>
              <p>
                <CurrencyRupee sx={{ mr: 1 }} />
                {(bag[key].qty * bag[key].price).toFixed(2)}
              </p>
              <div>
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="orderSummaryRight"></div>
    </div>
  );
};

export default OrderSummary;
