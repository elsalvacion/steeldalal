import {
  AccountCircle,
  Home,
  ShoppingCart,
  GridView,
} from "@mui/icons-material";
import { IconButton, Badge } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./MobileBottomFooter.css";
const MobileBottomFooter = () => {
  const history = useHistory();
  const { keys } = useSelector((state) => state.getCart);
  const { userInfo } = useSelector((state) => state.userLogin);
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
          <Badge badgeContent={keys ? keys.length : 0} color="primary">
            <ShoppingCart />
          </Badge>
        </IconButton>

        <IconButton
          onClick={() => history.push(userInfo ? "/profile" : "/login")}
          color="primary"
        >
          <AccountCircle />
        </IconButton>
      </div>
    </div>
  );
};

export default MobileBottomFooter;
