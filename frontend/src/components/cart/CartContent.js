import {
  Button,
  IconButton,
  Typography,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import "./CartContent.css";
import { ArrowBack, Delete } from "@mui/icons-material";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartAction, getCartAction } from "../../actions/cartAction";
import {
  CHANGE_QTY_RESET,
  DELETE_CART_RESET,
  SELECT_CART_ITEM_RESET,
} from "../../reducers/types/cartTypes";
import CustomAlert from "../layout/CustomAlert";
import { FaRupeeSign } from "react-icons/fa";

const CartContent = ({ cart }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { success: deleteSuccess, error: deleteError } = useSelector(
    (state) => state.deleteCart
  );
  const { success: changeQtySuccess, error: changeQtyError } = useSelector(
    (state) => state.changeQty
  );

  const { success: selectCartSuccess, error: selectCartError } = useSelector(
    (state) => state.selectCart
  );
  const subTotal = useRef(0);
  const selectedTotal = useRef(0);

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(getCartAction());
      dispatch({ type: DELETE_CART_RESET });
    }
    if (changeQtySuccess) {
      dispatch(getCartAction());
      dispatch({ type: CHANGE_QTY_RESET });
    }
    if (selectCartSuccess) {
      dispatch(getCartAction());
      dispatch({ type: SELECT_CART_ITEM_RESET });
    }
  }, [deleteSuccess, dispatch, changeQtySuccess, selectCartSuccess]);
  const styles = {
    title: {
      fontSize: 15,
      fontWeight: "lighter",
    },
  };

  return (
    <div className="cartContentContainer">
      <br />
      <Button
        onClick={() => history.push("/products")}
        color="primary"
        variant="contained"
        startIcon={<ArrowBack />}
      >
        Products
      </Button>
      <br />
      <br />

      <Typography variant="h5" component="h5">
        Your Cart
      </Typography>
      <br />

      <div className="cartContentMainContainer">
        <div className="cartContentLeft">
          {deleteError && (
            <CustomAlert
              text={deleteError}
              type="error"
              handleClose={() => dispatch({ type: DELETE_CART_RESET })}
            />
          )}
          {changeQtyError && (
            <CustomAlert
              text={changeQtyError}
              type="error"
              handleClose={() => dispatch({ type: CHANGE_QTY_RESET })}
            />
          )}

          {selectCartError && (
            <CustomAlert
              text={changeQtyError}
              type="error"
              handleClose={() => dispatch({ type: SELECT_CART_ITEM_RESET })}
            />
          )}

          {Object.keys(cart).map((key) => (
            <div className="cartContentLeftContainer">
              <div className="cartContentLeftTop">
                <Link className="cartItemLink" to={`/product/${key}`}>
                  <img
                    className="cartItemImage"
                    src={cart[key].image}
                    alt={`steeldalal ${cart[key].title}`}
                  />
                </Link>
                <Link className="cartItemLink" to={`/product/${key}`}>
                  <Typography sx={{ ...styles.title }}>
                    {cart[key].title} {cart[key].type} {cart[key].brand}{" "}
                    {cart[key].grade}
                  </Typography>
                </Link>
              </div>
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
                    {Object.keys(cart[key].specs).map((specKey) => (
                      <div key={`spec-${key}-${specKey}`}>
                        <TableRow>
                          <TableCell sx={{ ...styles.title }}>
                            <b>Thickness</b>
                          </TableCell>
                          <TableCell sx={{ ...styles.title }}>
                            <b>T. UoM</b>
                          </TableCell>
                          {cart[key].specs[specKey].width && (
                            <TableCell sx={{ ...styles.title }}>
                              <b>Width</b>
                            </TableCell>
                          )}
                          {cart[key].specs[specKey].w_uom && (
                            <TableCell sx={{ ...styles.title }}>
                              <b>W. UoM</b>
                            </TableCell>
                          )}
                          {cart[key].specs[specKey].length && (
                            <TableCell sx={{ ...styles.title }}>
                              <b>Length</b>
                            </TableCell>
                          )}
                          {cart[key].specs[specKey].l_uom && (
                            <TableCell sx={{ ...styles.title }}>
                              <b>L. UoM</b>
                            </TableCell>
                          )}
                          <TableCell sx={{ ...styles.title }}>
                            <b>Qty</b>
                          </TableCell>
                          <TableCell sx={{ ...styles.title }}>
                            <b>Price</b>
                          </TableCell>
                          <TableCell sx={{ ...styles.title }}></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ ...styles.title }}>
                            {cart[key].specs[specKey].thickness.toFixed(2)}
                          </TableCell>
                          <TableCell sx={{ ...styles.title }}>
                            {cart[key].specs[specKey].t_uom}
                          </TableCell>
                          {cart[key].specs[specKey].width && (
                            <TableCell sx={{ ...styles.title }}>
                              {cart[key].specs[specKey].width.toFixed(2)}
                            </TableCell>
                          )}
                          {cart[key].specs[specKey].w_uom && (
                            <TableCell sx={{ ...styles.title }}>
                              {cart[key].specs[specKey].w_uom}
                            </TableCell>
                          )}
                          {cart[key].specs[specKey].length && (
                            <TableCell sx={{ ...styles.title }}>
                              {cart[key].specs[specKey].length.toFixed(2)}
                            </TableCell>
                          )}
                          {cart[key].specs[specKey].l_uom && (
                            <TableCell sx={{ ...styles.title }}>
                              {cart[key].specs[specKey].l_uom}
                            </TableCell>
                          )}
                          <TableCell sx={{ ...styles.title }}>
                            {cart[key].specs[specKey].yourQty}
                          </TableCell>
                          <TableCell sx={{ ...styles.title }}>
                            <FaRupeeSign />{" "}
                            {cart[key].specs[specKey].price.toFixed(2)}
                          </TableCell>
                          <TableCell sx={{ ...styles.title }}>
                            <IconButton
                              onClick={() => {
                                selectedTotal.current = 0;
                                subTotal.current = 0;
                                dispatch(deleteCartAction(key, specKey));
                              }}
                              color="error"
                              className="cartItemDelete"
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      </div>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ))}
        </div>

        <div className="cartContentRight">
          <Typography sx={{ mb: 2 }} variant="h6" component="h6">
            Summary
          </Typography>
          <div className="cartContentSubTotal">
            <Typography sx={{ ...styles.title }}>Price</Typography>
            <Typography sx={{ ...styles.title }}>
              <FaRupeeSign />
              {Object.keys(cart)
                .map((cartKey) =>
                  Object.keys(cart[cartKey].specs).reduce(
                    (acc, specKey) =>
                      acc +
                      cart[cartKey].specs[specKey].yourQty *
                        cart[cartKey].specs[specKey].price,
                    0
                  )
                )
                .reduce((acc, curr) => acc + curr, 0)
                .toFixed(2)}
            </Typography>
          </div>
          <div className="cartContentSubTotal">
            <Typography sx={{ ...styles.title }}>Taxes</Typography>
            <Typography sx={{ ...styles.title }}>
              <FaRupeeSign />
              {Object.keys(cart)
                .map((cartKey) =>
                  Object.keys(cart[cartKey].specs).reduce(
                    (acc, specKey) =>
                      acc +
                      cart[cartKey].specs[specKey].yourQty *
                        cart[cartKey].specs[specKey].price,
                    0
                  )
                )
                .reduce((acc, curr) => acc + curr, 0)
                .toFixed(2) * 0.18}
            </Typography>
          </div>
          <div className="cartContentSubTotal">
            <Typography sx={{ ...styles.title }}>
              Sub Total(Excl. delivery fees)
            </Typography>
            <Typography sx={{ ...styles.title }}>
              <FaRupeeSign />
              {(
                Object.keys(cart)
                  .map((cartKey) =>
                    Object.keys(cart[cartKey].specs).reduce(
                      (acc, specKey) =>
                        acc +
                        cart[cartKey].specs[specKey].yourQty *
                          cart[cartKey].specs[specKey].price,
                      0
                    )
                  )
                  .reduce((acc, curr) => acc + curr, 0) *
                  0.18 +
                Object.keys(cart)
                  .map((cartKey) =>
                    Object.keys(cart[cartKey].specs).reduce(
                      (acc, specKey) =>
                        acc +
                        cart[cartKey].specs[specKey].yourQty *
                          cart[cartKey].specs[specKey].price,
                      0
                    )
                  )
                  .reduce((acc, curr) => acc + curr, 0)
              ).toFixed(2)}
            </Typography>
          </div>
          <div className="cartContentSubTotal">
            <Typography sx={{ ...styles.title }}>
              Total Amount Due (Excl. delivery fees)
            </Typography>
            <Typography sx={{ ...styles.title }}>
              <FaRupeeSign />
              {(
                Object.keys(cart)
                  .map((cartKey) =>
                    Object.keys(cart[cartKey].specs).reduce(
                      (acc, specKey) =>
                        acc +
                        cart[cartKey].specs[specKey].yourQty *
                          cart[cartKey].specs[specKey].price,
                      0
                    )
                  )
                  .reduce((acc, curr) => acc + curr, 0) *
                  0.18 +
                Object.keys(cart)
                  .map((cartKey) =>
                    Object.keys(cart[cartKey].specs).reduce(
                      (acc, specKey) =>
                        acc +
                        cart[cartKey].specs[specKey].yourQty *
                          cart[cartKey].specs[specKey].price,
                      0
                    )
                  )
                  .reduce((acc, curr) => acc + curr, 0)
              ).toFixed(2)}
            </Typography>
          </div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => history.push("/checkout")}
          >
            Proceed To Checkout
          </Button>
        </div>
      </div>

      <div className="fixedCartSummaryMainContainer">
        <div className="fixedCartSummary">
          <div className="fixedCartSummaryLeft">
            <div className="fixedCartSummaryLeftSubtotal">
              <Typography sx={{ ...styles.title }}>Price</Typography>
              <Typography sx={{ ...styles.title }}>
                <FaRupeeSign sx={{ marginRight: 0.5, marginLeft: 3 }} />
                {Object.keys(cart)
                  .map((cartKey) =>
                    Object.keys(cart[cartKey].specs).reduce(
                      (acc, specKey) =>
                        acc +
                        cart[cartKey].specs[specKey].yourQty *
                          cart[cartKey].specs[specKey].price,
                      0
                    )
                  )
                  .reduce((acc, curr) => acc + curr, 0)
                  .toFixed(2)}
              </Typography>
            </div>
            <div className="fixedCartSummaryLeftSubtotal">
              <Typography sx={{ ...styles.title }}>Taxes</Typography>
              <Typography sx={{ ...styles.title }}>
                <FaRupeeSign sx={{ marginRight: 0.5, marginLeft: 3 }} />
                {Object.keys(cart)
                  .map((cartKey) =>
                    Object.keys(cart[cartKey].specs).reduce(
                      (acc, specKey) =>
                        acc +
                        cart[cartKey].specs[specKey].yourQty *
                          cart[cartKey].specs[specKey].price,
                      0
                    )
                  )
                  .reduce((acc, curr) => acc + curr, 0)
                  .toFixed(2) * 0.18}
              </Typography>
            </div>
            <div className="fixedCartSummaryLeftSubtotal">
              <Typography sx={{ ...styles.title }}>
                Sub Total (Excl. delivery fees)
              </Typography>
              <Typography sx={{ ...styles.title }}>
                <FaRupeeSign sx={{ marginRight: 0.5, marginLeft: 3 }} />
                {(
                  Object.keys(cart)
                    .map((cartKey) =>
                      Object.keys(cart[cartKey].specs).reduce(
                        (acc, specKey) =>
                          acc +
                          cart[cartKey].specs[specKey].yourQty *
                            cart[cartKey].specs[specKey].price,
                        0
                      )
                    )
                    .reduce((acc, curr) => acc + curr, 0) *
                    0.18 +
                  Object.keys(cart)
                    .map((cartKey) =>
                      Object.keys(cart[cartKey].specs).reduce(
                        (acc, specKey) =>
                          acc +
                          cart[cartKey].specs[specKey].yourQty *
                            cart[cartKey].specs[specKey].price,
                        0
                      )
                    )
                    .reduce((acc, curr) => acc + curr, 0)
                ).toFixed(2)}
              </Typography>
            </div>
            <div className="fixedCartSummaryLeftSubtotal">
              <Typography sx={{ ...styles.title }}>
                Total Amount Due (Excl. delivery fees)
              </Typography>
              <Typography sx={{ ...styles.title }}>
                <FaRupeeSign sx={{ marginRight: 0.5, marginLeft: 3 }} />
                {(
                  Object.keys(cart)
                    .map((cartKey) =>
                      Object.keys(cart[cartKey].specs).reduce(
                        (acc, specKey) =>
                          acc +
                          cart[cartKey].specs[specKey].yourQty *
                            cart[cartKey].specs[specKey].price,
                        0
                      )
                    )
                    .reduce((acc, curr) => acc + curr, 0) *
                    0.18 +
                  Object.keys(cart)
                    .map((cartKey) =>
                      Object.keys(cart[cartKey].specs).reduce(
                        (acc, specKey) =>
                          acc +
                          cart[cartKey].specs[specKey].yourQty *
                            cart[cartKey].specs[specKey].price,
                        0
                      )
                    )
                    .reduce((acc, curr) => acc + curr, 0)
                ).toFixed(2)}
              </Typography>
            </div>
          </div>
          <div className="fixedCartSummaryRight">
            <Button
              color="primary"
              variant="contained"
              onClick={() => history.push("/checkout")}
            >
              Proceed To Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartContent;
