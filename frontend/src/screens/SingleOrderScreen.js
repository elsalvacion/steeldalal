import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchOrderAction } from "../actions/orderAction";
import {
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
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
import { FETCH_ORDER_RESET } from "../reducers/types/orderTypes";
import { FaRupeeSign } from "react-icons/fa";
import Payment from "../components/checkout/Payment";
const SingleOrderScreen = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, order } = useSelector((state) => state.fetchOrder);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!userInfo) history.push(`/login?redirect=order/${id}`);
    else {
      dispatch(fetchOrderAction(id));
    }
  }, [id, userInfo, history, dispatch]);
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
                      <ListItemText>
                        <b>Price</b>
                      </ListItemText>
                      <ListItemText sx={{ textAlign: "left" }}>
                        <FaRupeeSign /> {order.totalPrice}
                      </ListItemText>
                    </ListItem>

                    <ListItem>
                      <ListItemText>
                        <b>Payment</b>
                      </ListItemText>
                      <ListItemText sx={{ textAlign: "left" }}>
                        <Chip
                          label={order.isPaid === 1 ? "Paid" : "UnPaid"}
                          color={order.isPaid === 0 ? "error" : "success"}
                        />
                      </ListItemText>
                    </ListItem>

                    <ListItem>
                      <ListItemText>
                        <b>Delivery</b>
                      </ListItemText>
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
                  </List>
                  {order.isPaid === 0 && <Payment />}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6">Shipping Details</Typography>
                  <List>
                    {["name", "state", "city", "address", "phone", "email"].map(
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
