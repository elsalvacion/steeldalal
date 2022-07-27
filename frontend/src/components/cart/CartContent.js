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

    Object.keys(cart).forEach((key) => {
      selectedTotal.current =
        selectedTotal.current + Object.keys(cart[key].specs).length;
      subTotal.current =
        subTotal.current +
        Object.keys(cart[key].specs).reduce(
          (previousValue, currentValue) =>
            previousValue +
            cart[key].specs[currentValue].price *
              cart[key].specs[currentValue].yourQty,
          0
        );
    });
  }, [deleteSuccess, dispatch, changeQtySuccess, selectCartSuccess, cart]);
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
                  <p className="cartItemTitle">{cart[key].title}</p>
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
                          <TableCell>
                            <b>Thickness</b>
                          </TableCell>
                          <TableCell>
                            <b>T. UoM</b>
                          </TableCell>
                          {cart[key].specs[specKey].width && (
                            <TableCell>
                              <b>Width</b>
                            </TableCell>
                          )}
                          {cart[key].specs[specKey].w_uom && (
                            <TableCell>
                              <b>W. UoM</b>
                            </TableCell>
                          )}
                          {cart[key].specs[specKey].length && (
                            <TableCell>
                              <b>Length</b>
                            </TableCell>
                          )}
                          {cart[key].specs[specKey].l_uom && (
                            <TableCell>
                              <b>L. UoM</b>
                            </TableCell>
                          )}
                          <TableCell>
                            <b>Qty</b>
                          </TableCell>
                          <TableCell>
                            <b>Price</b>
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            {cart[key].specs[specKey].thickness.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            {cart[key].specs[specKey].t_uom}
                          </TableCell>
                          {cart[key].specs[specKey].width && (
                            <TableCell>
                              {cart[key].specs[specKey].width.toFixed(2)}
                            </TableCell>
                          )}
                          {cart[key].specs[specKey].w_uom && (
                            <TableCell>
                              {cart[key].specs[specKey].w_uom}
                            </TableCell>
                          )}
                          {cart[key].specs[specKey].length && (
                            <TableCell>
                              {cart[key].specs[specKey].length.toFixed(2)}
                            </TableCell>
                          )}
                          {cart[key].specs[specKey].l_uom && (
                            <TableCell>
                              {cart[key].specs[specKey].l_uom}
                            </TableCell>
                          )}
                          <TableCell>
                            {cart[key].specs[specKey].yourQty}
                          </TableCell>
                          <TableCell>
                            <FaRupeeSign />{" "}
                            {cart[key].specs[specKey].price.toFixed(2)}
                          </TableCell>
                          <TableCell>
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
          <Typography variant="h6" component="h6">
            Summary
          </Typography>
          <br />
          <div className="cartContentSubTotal">
            <Typography>Total</Typography>
            <span>
              <FaRupeeSign />
              {subTotal.current === 0 ? 0 : subTotal.current.toFixed(2)}
            </span>
          </div>
          <Button
            disabled={selectedTotal.current === 0}
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => history.push("/checkout")}
          >
            {selectedTotal.current === 0
              ? "No Product to checkout"
              : "Proceed To Checkout"}
          </Button>
        </div>
      </div>

      <div className="fixedCartSummaryMainContainer">
        <div className="fixedCartSummary">
          <div className="fixedCartSummaryLeft">
            <div className="fixedCartSummaryLeftSubtotal">
              <Typography>Total</Typography>
              <Typography className="fixedCartSummaryPrice">
                <FaRupeeSign sx={{ marginRight: 0.5, marginLeft: 3 }} />
                {subTotal.current === 0
                  ? (0).toFixed(2)
                  : subTotal.current.toFixed(2)}
              </Typography>
            </div>
          </div>
          <div className="fixedCartSummaryRight">
            <Button
              disabled={selectedTotal.current === 0}
              color="primary"
              variant="contained"
              onClick={() => history.push("/checkout")}
            >
              {selectedTotal.current === 0
                ? "No Product to checkout"
                : "Proceed To Checkout"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartContent;
