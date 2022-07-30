import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  fetchSellerOrderAction,
  orderInStockAction,
} from "../actions/orderAction";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import CustomSnack from "../components/layout/CustomSnack";
import CustomHelmet from "../components/layout/CustomHelmet";
import {
  FETCH_SELLER_ORDER_RESET,
  ORDER_INSTOCK_RESET,
} from "../reducers/types/orderTypes";
import { useState } from "react";
const SingleSellerOrder = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    loading: inStockLoading,
    error: inStockError,
    success,
  } = useSelector((state) => state.orderInStock);
  const { loading, error, order } = useSelector(
    (state) => state.fetchSellerOrder
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [openStockModal, setOpenStockModal] = useState(false);
  const [openOutOfStockModal, setOpenOutOfStockModal] = useState(false);

  useEffect(() => {
    if (!userInfo) history.push(`/login?redirect=seller/order/${id}`);
    else {
      dispatch(fetchSellerOrderAction(id));
    }
  }, [id, userInfo, history, dispatch, success]);
  const handleStock = () => {
    if (openStockModal) {
      dispatch(orderInStockAction(order, 1));
    } else {
      dispatch(orderInStockAction(order, 0));
    }
  };
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
          handleClose={() => dispatch({ type: FETCH_SELLER_ORDER_RESET })}
        />
      ) : order ? (
        <>
          <CustomHelmet title="Seller Order" desc="Steeldalal seller order" />
          {inStockLoading && (
            <CustomSnack type="success" text="Please waiting ..." />
          )}
          {inStockError && (
            <CustomSnack
              type="error"
              text={error}
              handleClose={() => dispatch({ type: ORDER_INSTOCK_RESET })}
            />
          )}
          <Typography sx={{ mb: 2 }} variant="h6">
            Order Specifications
          </Typography>
          {(order.inStock === 1 || order.inStock === 0) && (
            <Card sx={{ mt: 1, width: "100%" }}>
              <CardContent>
                {order.inStock === 1 ? (
                  <Typography sx={{ color: "green" }}>
                    Order Confirmed. A message will be sent to your phone for
                    packing as soon the buyer's payment is prcocessed and
                    confirmed.
                  </Typography>
                ) : (
                  <Typography sx={{ color: "red" }}>
                    Order Confirmed. Please re-stock or delete the product from
                    your catalog if it is not available in your store.
                  </Typography>
                )}
              </CardContent>
            </Card>
          )}
          <Card sx={{ mt: 1, width: "100%" }}>
            <CardContent>
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
                          cursor: "pointer",
                        }}
                        onClick={() => history.push(`/product/${product.id}`)}
                      />
                    </Grid>
                    <Grid item xs={9} alignSelf="center">
                      <Typography noWrap>
                        {product.title} {product.type} {product.brand}{" "}
                        {product.grade}
                      </Typography>
                    </Grid>
                  </Grid>
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
              {order.inStock !== 1 || order.inStock !== 0 ? (
                <>
                  <Typography
                    sx={{
                      my: 4,
                      mx: 2,
                      fontSize: 14,
                    }}
                  >
                    Above are the order specification. If they in stock click on
                    the
                    <b>In Stock</b> button else click on <b>Out of Stock</b>{" "}
                    button.
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                      color="success"
                      variant="contained"
                      sx={{ mx: 1 }}
                      onClick={() => setOpenStockModal(true)}
                      disabled={inStockLoading}
                    >
                      In Stock
                    </Button>
                    <Button
                      onClick={() => setOpenOutOfStockModal(true)}
                      color="error"
                      variant="contained"
                      sx={{ mx: 1 }}
                      disabled={inStockLoading}
                    >
                      Out of Stock
                    </Button>
                  </Box>
                </>
              ) : null}

              <Dialog
                onClose={() => {
                  setOpenStockModal(false);
                  setOpenOutOfStockModal(false);
                }}
                open={openStockModal || openOutOfStockModal}
              >
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogContent>
                  Please cross check the order specifications, because this
                  process is irreversable. If you are sure then confirm.
                </DialogContent>
                <DialogActions>
                  <Button
                    autoFocus
                    onClick={() => {
                      setOpenStockModal(false);
                      setOpenOutOfStockModal(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleStock}>Confirm</Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </Card>
        </>
      ) : null}
    </Container>
  );
};

export default SingleSellerOrder;
