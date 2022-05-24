import {
  AccountCircle,
  Home,
  ShoppingCart,
  GridView,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import "./MobileBottomFooter.css";
const MobileBottomFooter = () => {
  const history = useHistory();
  return (
    <div className="mobileBottomFooterContainer">
      <div className="mobileBottomFooterContent">
        <IconButton onClick={() => history.push("/")} color="primary">
          <Home />
        </IconButton>

        <IconButton color="primary" onClick={() => history.push("/category")}>
          <GridView />
        </IconButton>

        <IconButton onClick={() => history.push("/cart")} color="primary">
          <ShoppingCart />
        </IconButton>

        <IconButton onClick={() => history.push("/login")} color="primary">
          <AccountCircle />
        </IconButton>
      </div>
    </div>
  );
};

export default MobileBottomFooter;
