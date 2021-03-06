import { Button } from "@mui/material";
import React from "react";
import "./Payment.css";

const Payment = ({ handlePay }) => {
  return (
    <Button onClick={handlePay} className="paymentContainer">
      <img src="/assets/Razorpay_logo.svg.webp" alt="steeldalal payment" />
    </Button>
  );
};

export default Payment;
