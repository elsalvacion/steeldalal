import { Typography } from "@mui/material";
import React from "react";
import "./ChangeQuantity.css";

const ChangeQuantity = ({ qty, handleChange, text }) => {
  return (
    <div className="changeQuantityContainer">
      {text && <Typography>{text}</Typography>}

      <input value={qty} onChange={handleChange} type="number" />
    </div>
  );
};

export default ChangeQuantity;
