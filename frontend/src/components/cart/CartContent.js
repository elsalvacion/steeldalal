import {
  Button,
  IconButton,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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

const CartContent = ({ keys, cart }) => {
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
  const [subTotal, setSubTotal] = useState(0);
  const [selectedTotal, setSelectedTotal] = useState(0);

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

    let total = 0;
    let selected = 0;
    keys.forEach((key, i) => {
      const specsKeys = Object.keys(cart[key].specs);
      const specs = cart[key].specs;
      specsKeys.forEach((specKey) => {
        selected++;
        total += specs[specKey].qty * specs[specKey].price;
      });
      // if (i === key.length - 1) {
      // }
    });
    setSubTotal(total);
    setSelectedTotal(selected);
  }, [
    deleteSuccess,
    dispatch,
    changeQtySuccess,
    selectCartSuccess,
    cart,
    keys,
  ]);
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
          {keys.map((key) => (
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
                  <TableHead>
                    <TableRow>
                      <TableCell>Thickness</TableCell>
                      <TableCell>T. UoM</TableCell>
                      <TableCell>Width</TableCell>
                      <TableCell>W. UoM</TableCell>
                      <TableCell>Qty</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    {Object.keys(cart[key].specs).map((specKey) => (
                      <TableRow
                        key={`spec-${key}-${specKey}`}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>
                          {cart[key].specs[specKey].thickness}
                        </TableCell>
                        <TableCell>{cart[key].specs[specKey].t_uom}</TableCell>
                        <TableCell>{cart[key].specs[specKey].width}</TableCell>
                        <TableCell>{cart[key].specs[specKey].w_uom}</TableCell>
                        <TableCell>
                          {cart[key].specs[specKey].yourQty}
                        </TableCell>
                        <TableCell>
                          <FaRupeeSign />{" "}
                          {(
                            cart[key].specs[specKey].yourQty *
                            cart[key].specs[specKey].price
                          ).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() =>
                              dispatch(deleteCartAction(key, specKey))
                            }
                            color="error"
                            className="cartItemDelete"
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
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
          <div className="cartContentSubTotal">
            <p>Total Specs</p>
            <span>{selectedTotal}</span>
          </div>

          <div className="cartContentSubTotal">
            <Typography>Total</Typography>
            <span>
              <FaRupeeSign />
              {subTotal === 0 ? 0 : subTotal.toFixed(2)}
            </span>
          </div>
          <Button
            disabled={selectedTotal === 0}
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => history.push("/checkout")}
          >
            {selectedTotal === 0
              ? "No Product to checkout"
              : "Proceed To Checkout"}
          </Button>
        </div>
      </div>

      <div className="fixedCartSummaryMainContainer">
        <div className="fixedCartSummary">
          <div className="fixedCartSummaryLeft">
            <div className="fixedCartSummaryLeftSubtotal">
              <Typography>Total specs</Typography>
              <Typography className="fixedCartSummaryPrice">
                {selectedTotal}
              </Typography>
            </div>

            <div className="fixedCartSummaryLeftSubtotal">
              <Typography>Total</Typography>
              <Typography className="fixedCartSummaryPrice">
                <FaRupeeSign sx={{ marginRight: 0.5, marginLeft: 3 }} />
                {subTotal === 0 ? (0).toFixed(2) : subTotal.toFixed(2)}
              </Typography>
            </div>
          </div>
          <div className="fixedCartSummaryRight">
            <Button
              disabled={selectedTotal === 0}
              color="primary"
              variant="contained"
              onClick={() => history.push("/checkout")}
            >
              {selectedTotal === 0
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
