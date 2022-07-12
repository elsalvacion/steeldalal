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
  TableHead,
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
        order.inStock === 1 || order.inStock === 0 ? (
          <>
            <Card sx={{ mt: 1, width: "100%" }}>
              <CardContent>
                {order.inStock === 1 ? (
                  <Typography>
                    Thank you. A message will be sent to your whatsapp for
                    packing as soon the payment is confirmed.
                  </Typography>
                ) : (
                  <Typography>
                    Thank you. Please re-stock or delete the product from your
                    catalog.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
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
                            cursor: "pointer",
                          }}
                          onClick={() => history.push(`/product/${product.id}`)}
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
        )
      ) : null}
    </Container>
  );
};

export default SingleSellerOrder;
