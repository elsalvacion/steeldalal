import { ChevronLeftOutlined, ChevronRightOutlined } from "@material-ui/icons";
import { IconButton, Typography } from "@material-ui/core";
import React from "react";
import "./ChangeQuantity.css";

const ChangeQuantity = ({
  qty,
  handleDecrement,
  handleIncrement,
  handleChange,
  countInStock,
  text,
}) => {
  return (
    <div className="changeQuantityContainer">
      {text && <Typography>{text}</Typography>}
      <IconButton
        disabled={qty === 1}
        onClick={handleDecrement}
        color="primary"
      >
        <ChevronLeftOutlined />
      </IconButton>
      <input value={qty} onChange={handleChange} type="number" />
      <IconButton
        disabled={qty === countInStock}
        onClick={handleIncrement}
        color="primary"
      >
        <ChevronRightOutlined />
      </IconButton>
    </div>
  );
};

export default ChangeQuantity;
