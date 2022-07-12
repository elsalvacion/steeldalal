import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import CartContent from "../components/cart/CartContent";
import { useDispatch, useSelector } from "react-redux";
import { getCartAction } from "../actions/cartAction";
import CustomHelmet from "../components/layout/CustomHelmet";
import { PLACE_ORDER_RESET } from "../reducers/types/orderTypes";

const CartScreen = () => {
  const { cart } = useSelector((state) => state.getCart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartAction());
    dispatch({
      type: PLACE_ORDER_RESET,
    });
  }, [dispatch]);
  return (
    <Container>
      <CustomHelmet
        title="Cart"
        desc="We have an easy cart for you to save your favorite products for later use."
      />
      {Object.keys(cart).length > 0 ? (
        <CartContent cart={cart} />
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
