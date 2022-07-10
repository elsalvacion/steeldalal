import {
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import "./OrderSummary.css";
import { useSelector, useDispatch } from "react-redux";
import CustomSnack from "../layout/CustomSnack";
import { FETCH_ORDERS_RESET } from "../../reducers/types/orderTypes";
import { fetchOrdersAction } from "../../actions/orderAction";
import { ChevronRightOutlined } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
const OrderSummary = () => {
  const dispatch = useDispatch();
  const { error, orders } = useSelector((state) => state.fetchOrders);
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchOrdersAction(4));
  }, [dispatch]);
  return error ? (
    <CustomSnack
      type="error"
      text={error}
      handleClose={() => dispatch({ type: FETCH_ORDERS_RESET })}
    />
  ) : orders ? (
    orders.length > 0 ? (
      <Card sx={{ m: 2 }}>
        <CardContent>
          <div className="ProfileDetailRightHeader">
            <Typography variant="h6" component="h6">
              Recent Purchase Orders
            </Typography>
          </div>
          <Grid sx={{ my: 2 }} container spacing={2}>
            <Grid item xs={2}>
              ID
            </Grid>
            <Grid item xs={3}>
              Paid
            </Grid>
            <Grid item xs={3}>
              Delivered
            </Grid>
            <Grid item xs={4}>
              Action
            </Grid>
          </Grid>
          {orders.map((order) => (
            <Grid container sx={{ my: 1 }} spacing={2} key={order.id}>
              <Grid item xs={2}>
                {order.id}
              </Grid>
              <Grid item xs={3}>
                <Chip
                  label={order.isPaid === 1 ? "Paid" : "UnPaid"}
                  color={order.isPaid === 0 ? "error" : "success"}
                />
              </Grid>
              <Grid item xs={3}>
                <Chip
                  label={
                    order.isDelivered === 1 ? "Delivered" : "Not Delivered"
                  }
                  color={order.isDelivered === 0 ? "warning" : "success"}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={() => history.push(`/order/${order.id}`)}
                  endIcon={<ChevronRightOutlined />}
                >
                  More
                </Button>
              </Grid>
            </Grid>
          ))}
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            endIcon={<ChevronRightOutlined />}
            onClick={() => history.push("/order")}
          >
            Orders
          </Button>
        </CardContent>
      </Card>
    ) : null
  ) : null;
};

export default OrderSummary;
