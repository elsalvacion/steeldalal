import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  fetchOrderAction,
  payOrderAction,
  saveOrderPaymentAction,
} from "../actions/orderAction";
import {
  Button,
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
  TableRow,
  Typography,
} from "@mui/material";
import CustomSnack from "../components/layout/CustomSnack";
import {
  FETCH_ORDER_RESET,
  PAY_ORDER_RESET,
  SAVE_ORDER_PAYMENT_RESET,
} from "../reducers/types/orderTypes";
import { FaRupeeSign } from "react-icons/fa";
import Payment from "../components/checkout/Payment";
import CustomHelmet from "../components/layout/CustomHelmet";
import { useState } from "react";
import Loading from "../components/layout/Loading";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MainInvoice from "../components/invoice/MainInvoice";

const SingleOrderScreen = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, order } = useSelector((state) => state.fetchOrder);
  const { paymentData, error: fetchHashError } = useSelector(
    (state) => state.payOrder
  );
  const {
    loading: savePaymentLoading,
    error: savePaymentError,
    success: savePaymentSuccess,
  } = useSelector((state) => state.savePayment);
  const dispatch = useDispatch();
  const history = useHistory();
  const [razorError, setRazorError] = useState(null);
  useEffect(() => {
    if (!userInfo) history.push(`/login?redirect=order/${id}`);
    else {
      dispatch({ type: SAVE_ORDER_PAYMENT_RESET });
      dispatch(fetchOrderAction(id));
    }

    // eslint-disable-next-line
  }, [id, userInfo, history, dispatch, savePaymentSuccess]);

  useEffect(() => {
    if (paymentData) {
      const options = {
        ...paymentData,
        order_id: paymentData.id,
        amount: Number(paymentData.amount) * 100,
        key: "rzp_test_V2qpvtF3OCDN1v",
        name: "Steeldalal.com",
        description: "Order Payment",
        image: "/assets/logos/2.png",
        handler: function (response) {
          dispatch(
            saveOrderPaymentAction({
              ...response,
              id: order.id,
              userId: order.userId,
              name: order.name,
            })
          );
          dispatch({ type: PAY_ORDER_RESET });
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
  const styles = {
    title: {
      fontSize: 15,
      fontWeight: "lighter",
    },
  };
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
          <PDFDownloadLink
            document={<MainInvoice invoice={order} />}
            fileName={`invoice-order-${order.id}.pdf`}
          >
            {({ blob, url, loading, error }) => (
              <Button
                sx={{ mb: 1, mx: 1 }}
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Loading... Invoice" : "Download Invoice"}
              </Button>
            )}
          </PDFDownloadLink>
          {razorError && (
            <CustomSnack
              type="error"
              text={razorError}
              handleClose={() => setRazorError(null)}
            />
          )}
          {savePaymentSuccess && (
            <CustomSnack
              type="success"
              text="Your payment is verified. Your order will be processed as soon as it is confirmed."
            />
          )}

          {fetchHashError && (
            <CustomSnack
              type="error"
              text={fetchHashError}
              handleClose={() => dispatch({ type: PAY_ORDER_RESET })}
            />
          )}
          {savePaymentError && (
            <CustomSnack
              type="error"
              text={savePaymentError}
              handleClose={() => {
                dispatch({ type: SAVE_ORDER_PAYMENT_RESET });
                dispatch({ type: PAY_ORDER_RESET });
              }}
            />
          )}
          {savePaymentLoading && <Loading text="Verifying... Payment" />}
          <CustomHelmet title="Order" desc="Steeldalal order" />
          <Card sx={{ my: 2 }}>
            <CardContent>
              {order.isPaid === 0 && order.inStock === null && (
                <>
                  <Typography sx={{ fontSize: 14 }}>
                    Seller is yet to confirm if your other in stock or not.
                  </Typography>
                </>
              )}
              {order.isPaid === 0 && order.inStock === 1 && (
                <>
                  <Typography sx={{ mb: 2, fontSize: 14 }}>
                    Your order is confirmed by seller. Click on the Razorpay
                    logo to do your payment and complete your order.
                  </Typography>

                  <Payment handlePay={() => dispatch(payOrderAction(order))} />
                </>
              )}
              {order.isPaid === 1 &&
                order.inStock === 1 &&
                order.isConfirmed === 1 && (
                  <Typography sx={{ color: "green", fontSize: 14 }}>
                    Your payment is verfied and confirmed. Good news you package
                    is now being processed for delivery.
                  </Typography>
                )}
              {order.isPaid === 1 &&
                order.inStock === 1 &&
                order.isConfirmed === 0 && (
                  <Typography sx={{ fontSize: 14 }}>
                    Your payment is verfied and awaiting confirmation from
                    admin. Processing info is already sent to the seller.
                  </Typography>
                )}

              {order.isPaid === 1 &&
                order.inStock === 0 &&
                order.isConfirmed === 0 && (
                  <Typography sx={{ fontSize: 14 }}>
                    The seller is yet to verify if your order is in stock.
                  </Typography>
                )}
            </CardContent>
          </Card>
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
                    <Grid item xs={3}>
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
                    <Grid item xs={9} alignSelf="center">
                      <Typography noWrap>
                        {product.title} {product.type} {product.brand}{" "}
                        {product.grade}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography
                    variant="h6"
                    sx={{ my: 3, mx: 3, fontWeight: "lighter" }}
                  >
                    Specifications
                  </Typography>
                  <TableContainer>
                    <Table
                      sx={{
                        overflow: "scroll",
                      }}
                      size="small"
                    >
                      <TableBody
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        {product.specs.map((spec) => (
                          <div key={`spec-${spec.id}`}>
                            <TableRow>
                              <TableCell sx={{ ...styles.title }}>
                                <b>Thickness</b>
                              </TableCell>
                              <TableCell sx={{ ...styles.title }}>
                                <b>T. UoM</b>
                              </TableCell>
                              {spec.width && (
                                <TableCell sx={{ ...styles.title }}>
                                  <b>Width</b>
                                </TableCell>
                              )}
                              {spec.w_uom && (
                                <TableCell sx={{ ...styles.title }}>
                                  <b>W. UoM</b>
                                </TableCell>
                              )}
                              {spec.length && (
                                <TableCell sx={{ ...styles.title }}>
                                  <b>Length</b>
                                </TableCell>
                              )}
                              {spec.l_uom && (
                                <TableCell sx={{ ...styles.title }}>
                                  <b>L. UoM</b>
                                </TableCell>
                              )}
                              <TableCell sx={{ ...styles.title }}>
                                <b>Qty</b>
                              </TableCell>
                              <TableCell sx={{ ...styles.title }}>
                                <b>Price (M/T)</b>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ ...styles.title }}>
                                {spec.thickness.toFixed(2)}
                              </TableCell>
                              <TableCell sx={{ ...styles.title }}>
                                {spec.t_uom}
                              </TableCell>
                              {spec.width && (
                                <TableCell sx={{ ...styles.title }}>
                                  {spec.width.toFixed(2)}
                                </TableCell>
                              )}
                              {spec.w_uom && (
                                <TableCell sx={{ ...styles.title }}>
                                  {spec.w_uom}
                                </TableCell>
                              )}
                              {spec.length && (
                                <TableCell sx={{ ...styles.title }}>
                                  {spec.length.toFixed(2)}
                                </TableCell>
                              )}
                              {spec.l_uom && (
                                <TableCell sx={{ ...styles.title }}>
                                  {spec.l_uom}
                                </TableCell>
                              )}
                              <TableCell sx={{ ...styles.title }}>
                                {spec.qty}
                              </TableCell>
                              <TableCell sx={{ ...styles.title }}>
                                {spec.price.toFixed(2)}
                              </TableCell>
                            </TableRow>
                          </div>
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
