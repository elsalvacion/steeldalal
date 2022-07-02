import { Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import "./OrderSummary.css";
import { useSelector, useDispatch } from "react-redux";
import CustomSnack from "../layout/CustomSnack";
import { FETCH_ORDERS_RESET } from "../../reducers/types/orderTypes";
import { fetchOrdersAction } from "../../actions/orderAction";
const OrderSummary = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.fetchOrders);
  useEffect(() => {
    dispatch(fetchOrdersAction(4));
  }, [dispatch]);
  return loading ? (
    <Typography>loading...</Typography>
  ) : error ? (
    <CustomSnack
      type="error"
      text={error}
      handleClose={() => dispatch({ type: FETCH_ORDERS_RESET })}
    />
  ) : orders ? (
    <Card sx={{ m: 2 }}>
      <CardContent>
        <div className="ProfileDetailRightHeader">
          <Typography variant="h6" component="h6">
            Order Summary
          </Typography>
        </div>

        <Grid container spacing={2}>
          {orders.map((order) => (
            <Grid item key={order.id}></Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  ) : null;
};

export default OrderSummary;
