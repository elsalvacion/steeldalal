import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
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
import CustomSnack from "../../layout/CustomSnack";
import { FETCH_ORDER_RESET } from "../../../reducers/types/orderTypes";
import { FaRupeeSign } from "react-icons/fa";
import CustomHelmet from "../../layout/CustomHelmet";
import {
  ChevronLeftOutlined,
  CreditCard,
  CreditCardOff,
  DeliveryDining,
  LocalShipping,
} from "@mui/icons-material";
import {
  fetchAdminOrderAction,
  updateAdminOrderAction,
} from "../../../actions/adminAction";
import { UPDATE_ADMIN_ORDER_RESET } from "../../../reducers/types/adminTypes";
const SingleAdminOrderScreen = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, order } = useSelector((state) => state.adminOrder);
  const {
    loading: updateLoading,
    error: updateError,
    success,
  } = useSelector((state) => state.adminOrderUpdate);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!userInfo || userInfo.isAdmin === 0)
      history.push(`/login?redirect=admin-order/${id}`);
    else {
      dispatch(fetchAdminOrderAction(id));
    }
    // eslint-disable-next-line
  }, [id, userInfo, history, dispatch, success]);

  const styles = {
    title: {
      fontSize: 15,
      fontWeight: "lighter",
    },
  };
  return (
    <Container sx={{ py: 2 }}>
      {loading || updateLoading ? (
        <CustomSnack
          type="success"
          text={loading ? "loading..." : "updating..."}
        />
      ) : error || updateError ? (
        <CustomSnack
          type="error"
          text={error || updateError}
          handleClose={() => {
            dispatch({ type: FETCH_ORDER_RESET });
            dispatch({ type: UPDATE_ADMIN_ORDER_RESET });
          }}
        />
      ) : order ? (
        <>
          {success && (
            <CustomSnack
              type="success"
              text="Order Updated"
              handleClose={() => dispatch({ type: UPDATE_ADMIN_ORDER_RESET })}
            />
          )}
          <CustomHelmet title="Order" desc="Steeldalal user order" />
          <Card sx={{ my: 2 }}>
            <CardContent>
              <div className="ProfileDetailLeftHeader">
                <Button
                  startIcon={<ChevronLeftOutlined />}
                  onClick={() => history.push("/admin-panel")}
                >
                  Back
                </Button>
                <Typography variant="h6">Order ID: {order.id}</Typography>
              </div>

              {order.isPaid === 1 && order.isConfirmed === 0 && (
                <Button
                  disabled={updateLoading}
                  endIcon={<CreditCard />}
                  variant="contained"
                  sx={{ mx: 1, my: 1 }}
                  onClick={() =>
                    dispatch(
                      updateAdminOrderAction(id, {
                        isConfirmed: 1,
                      })
                    )
                  }
                >
                  Confirm Payment
                </Button>
              )}
              {order.isPaid === 1 && order.isConfirmed === 1 && (
                <Button
                  disabled={updateLoading}
                  endIcon={<CreditCardOff />}
                  variant="contained"
                  sx={{ mx: 1, my: 1 }}
                  onClick={() =>
                    dispatch(
                      updateAdminOrderAction(id, {
                        isConfirmed: 0,
                      })
                    )
                  }
                >
                  UnComfirm Payment
                </Button>
              )}
              {order.isPaid === 1 && order.isDelivered === 0 && (
                <Button
                  disabled={updateLoading}
                  endIcon={<LocalShipping />}
                  variant="contained"
                  sx={{ mx: 1, my: 1 }}
                  onClick={() =>
                    dispatch(
                      updateAdminOrderAction(id, {
                        isDelivered: 1,
                      })
                    )
                  }
                >
                  Mark As Delivered
                </Button>
              )}
              {order.isPaid === 1 && order.isDelivered === 1 && (
                <Button
                  disabled={updateLoading}
                  endIcon={<DeliveryDining />}
                  variant="contained"
                  sx={{ mx: 1, my: 1 }}
                  onClick={() =>
                    dispatch(
                      updateAdminOrderAction(id, {
                        isDelivered: 0,
                      })
                    )
                  }
                >
                  UnDelivered
                </Button>
              )}
            </CardContent>
          </Card>

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
                          <ListItemIcon
                            sx={{ mr: 2, textTransform: "capitalize" }}
                          >
                            <b>{detailKey}</b>
                          </ListItemIcon>
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

export default SingleAdminOrderScreen;
