import {
  AccountCircle,
  Home,
  ShoppingCart,
  GridView,
} from "@mui/icons-material";
import { IconButton, Badge } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCartAction } from "../../actions/cartAction";
import { socket } from "../../utils/connectSocket";
import "./MobileBottomFooter.css";
const MobileBottomFooter = () => {
  const history = useHistory();
  const { cart } = useSelector((state) => state.getCart);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      socket.emit("join_room", userInfo.id);
    }
    dispatch(getCartAction());
  }, [userInfo, dispatch]);
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
          <Badge
            badgeContent={cart ? Object.keys(cart).length : 0}
            color="error"
          >
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
