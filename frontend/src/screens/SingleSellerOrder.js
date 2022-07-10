import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchSellerOrderAction } from "../actions/orderAction";
import {
  Card,
  CardContent,
  Container,
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
import { FETCH_SELLER_ORDER_RESET } from "../reducers/types/orderTypes";
const SingleSellerOrder = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, order } = useSelector(
    (state) => state.fetchSellerOrder
  );
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!userInfo) history.push(`/login?redirect=seller/order/${id}`);
    else {
      dispatch(fetchSellerOrderAction(id));
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
          handleClose={() => dispatch({ type: FETCH_SELLER_ORDER_RESET })}
        />
      ) : order ? (
        <>
          <CustomHelmet title="Seller Order" desc="Steeldalal seller order" />
          <Typography sx={{ mb: 2 }} variant="h6">
            Seller Order
          </Typography>
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

export default SingleSellerOrder;
