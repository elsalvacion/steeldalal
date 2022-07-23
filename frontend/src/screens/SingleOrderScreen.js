import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchOrderAction, payOrderAction } from "../actions/orderAction";
import {
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CustomSnack from "../components/layout/CustomSnack";
import {
  FETCH_ORDER_RESET,
  PAY_ORDER_RESET,
} from "../reducers/types/orderTypes";
import { FaRupeeSign } from "react-icons/fa";
import Payment from "../components/checkout/Payment";
import CustomHelmet from "../components/layout/CustomHelmet";
import { useState } from "react";
const SingleOrderScreen = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, order } = useSelector((state) => state.fetchOrder);
  const { paymentData, error: fetchHashError } = useSelector(
    (state) => state.payOrder
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [razorError, setRazorError] = useState(null);

  useEffect(() => {
    if (!userInfo) history.push(`/login?redirect=order/${id}`);
    else {
      dispatch(fetchOrderAction(id));
    }

    // eslint-disable-next-line
  }, [id, userInfo, history, dispatch]);

  useEffect(() => {
    if (paymentData) {
      const options = {
        ...paymentData,
        amount: paymentData.amount * 100,
        key: "rzp_test_V2qpvtF3OCDN1v",
        name: "Steeldalal.com",
        description: "Order Payment",
        image: "/assets/logos/2.png",
        handler: function (response) {
          console.log(response);
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: order.name,
          email: order.email,
          contact: order.phone,
        },

        theme: {
          color: "#1565c0",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        setRazorError(response.error.description);
        dispatch({ type: PAY_ORDER_RESET });
      });
      rzp1.open();
    }
    // eslint-disable-next-line
  }, [paymentData]);

  return (
    <Container sx={{ py: 2 }}>
      {loading ? (
        <Typography>Loading ...</Typography>
      ) : error ? (
        <CustomSnack
          type="error"
          text={error}
          handleClose={() => dispatch({ type: FETCH_ORDER_RESET })}
        />
      ) : order ? (
        <>
          {razorError && (
            <CustomSnack
              type="error"
              text={razorError}
              handleClose={() => setRazorError(null)}
            />
          )}
          {fetchHashError && (
            <CustomSnack
              type="error"
              text={fetchHashError}
              handleClose={() => dispatch({ type: PAY_ORDER_RESET })}
            />
          )}
          <CustomHelmet title="Order" desc="Steeldalal order" />
          {order.isPaid === 0 && order.inStock === 1 && (
            <Card sx={{ my: 2 }}>
              <CardContent>
                <Typography sx={{ mb: 2, fontSize: 13 }}>
                  Your order is confirmed by seller. Click on the Razorpay logo
                  to do your payment and complete your order.
                </Typography>

                <Payment handlePay={() => dispatch(payOrderAction(order))} />
              </CardContent>
            </Card>
          )}
          <Typography sx={{ mb: 2 }} variant="h6">
            Order ID: {order.id}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography sx={{ mb: 2 }} variant="h6">
                    Status
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon sx={{ mr: 2 }}>
                        <b>Price</b>
                      </ListItemIcon>
                      <ListItemText sx={{ textAlign: "left" }}>
                        <FaRupeeSign /> {order.totalPrice}
                      </ListItemText>
                    </ListItem>

                    <ListItem>
                      <ListItemIcon sx={{ mr: 2 }}>
                        <b>Payment</b>
                      </ListItemIcon>
                      <ListItemText sx={{ textAlign: "left" }}>
                        <Chip
                          label={order.isPaid === 1 ? "Paid" : "UnPaid"}
                          color={order.isPaid === 0 ? "error" : "success"}
                        />
                      </ListItemText>
                    </ListItem>

                    <ListItem>
                      <ListItemIcon sx={{ mr: 2 }}>
                        <b>Delivery</b>
                      </ListItemIcon>
                      <ListItemText>
                        <Chip
                          label={
                            order.isDelivered === 1
                              ? "Delivered"
                              : "Not Delivered"
                          }
                          color={
                            order.isDelivered === 0 ? "warning" : "success"
                          }
                        />
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ mr: 2 }}>
                        <b>Payment Confimation</b>
                      </ListItemIcon>
                      <ListItemText>
                        <Chip
                          label={
                            order.isConfirmed === 1
                              ? "Confirmed"
                              : "Not Confirmed"
                          }
                          color={
                            order.isConfirmed === 0 ? "warning" : "success"
                          }
                        />
                      </ListItemText>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6">Shipping Details</Typography>
                  <List>
                    {["name", "state", "city", "address", "phone"].map(
                      (detailKey) => (
                        <ListItem key={detailKey}>
                          <ListItemText sx={{ textTransform: "capitalize" }}>
                            <b>{detailKey}</b>
                          </ListItemText>
                          <ListItemText>{order[detailKey]}</ListItemText>
                        </ListItem>
                      )
                    )}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Card sx={{ mt: 1, width: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Products
              </Typography>
              {order.products.map((product) => (
                <div
                  style={{
                    marginBottom: 15,
                  }}
                  key={product.id}
                >
                  <Grid spacing={2} container sx={{ mb: 2 }}>
                    <Grid item xs={4}>
                      <img
                        src={product.image}
                        alt="steeldalal.com"
                        style={{
                          display: "block",
                          margin: "0 auto",
                          width: 65,
                          height: 65,
                          borderRadius: "50%",
                        }}
                      />
                    </Grid>
                    <Grid item xs={8} alignSelf="center">
                      <Typography noWrap>{product.title}</Typography>
                    </Grid>
                  </Grid>
                  <TableContainer>
                    <Table
                      sx={{
                        overflow: "scroll",
                      }}
                      size="small"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Thickness</TableCell>
                          <TableCell>T. UoM</TableCell>
                          <TableCell>Width</TableCell>
                          <TableCell>W. UoM</TableCell>
                          <TableCell>Qty</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        {product.specs.map((spec) => (
                          <TableRow key={`spec-${spec.id}`}>
                            <TableCell>{spec.thickness}</TableCell>
                            <TableCell>{spec.t_uom}</TableCell>
                            <TableCell>{spec.width}</TableCell>
                            <TableCell>{spec.w_uom}</TableCell>
                            <TableCell>{spec.qty}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      ) : null}
    </Container>
  );
};

export default SingleOrderScreen;
