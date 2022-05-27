import React from "react";
import { Container, Typography } from "@mui/material";
import CartContent from "../components/cart/CartContent";
import { useSelector } from "react-redux";

const CartScreen = () => {
  const { cart, keys } = useSelector((state) => state.getCart);
  return (
    <Container>
      {keys.length > 0 ? (
        <CartContent keys={keys} cart={cart} />
      ) : (
        <Typography variant="h6">No Items in your cart</Typography>
      )}
    </Container>
  );
};

export default CartScreen;
