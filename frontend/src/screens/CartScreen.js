import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import CartContent from "../components/cart/CartContent";
import { useDispatch, useSelector } from "react-redux";
import { getCartAction } from "../actions/cartAction";

const CartScreen = () => {
  const { cart, keys } = useSelector((state) => state.getCart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartAction());
  }, [dispatch]);
  return (
    <Container>
      {keys && keys.length > 0 ? (
        <CartContent keys={keys} cart={cart} />
      ) : (
        <>
          <br />
          <Typography variant="h6">No Items in your cart</Typography>
          <br />
        </>
      )}
    </Container>
  );
};

export default CartScreen;
