import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchOrdersAction } from "../actions/orderAction";
import CustomSnack from "../components/layout/CustomSnack";
import { FETCH_ORDERS_RESET } from "../reducers/types/orderTypes";
import { ChevronRightOutlined } from "@mui/icons-material";
import CustomHelmet from "../components/layout/CustomHelmet";
const SellerOrders = () => {
  const { error, orders } = useSelector((state) => state.fetchOrders);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!userInfo) history.push("/login?redirect=order");
    else {
      dispatch(fetchOrdersAction());
    }
  }, [dispatch, userInfo, history]);
  return (
    <Container>
      <CustomHelmet title={"Seller Order"} desc={`Steeldalal seller order`} />
      <Typography variant="h6" sx={{ my: 2 }}>
        Orders
      </Typography>
      {error ? (
        <CustomSnack
          type="error"
          text={error}
          handleClose={() => dispatch({ type: FETCH_ORDERS_RESET })}
        />
      ) : orders && orders.length > 0 ? (
        <Card>
          <CardContent>
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
          </CardContent>
        </Card>
      ) : null}
    </Container>
  );
};

export default SellerOrders;
