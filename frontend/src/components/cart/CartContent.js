import { Button, Grid, Hidden, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./CartContent.css";
import {
  ArrowBack,
  ChevronLeftOutlined,
  ChevronRightOutlined,
  Delete,
} from "@mui/icons-material";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQtyAction,
  deleteCartAction,
  getCartAction,
  selectCartAction,
} from "../../actions/cartAction";
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
      if (cart[key].selected) {
        selected++;
        total += cart[key].quantity * cart[key].price;
      }
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
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
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

          <div className="cartContentLeft">
            {keys.map((key) => (
              <Grid
                alignItems="center"
                container
                spacing={2}
                key={key}
                sx={{ marginBottom: 5 }}
              >
                <Grid item xs={2} sm={1}>
                  <input
                    type="checkbox"
                    checked={cart[key].selected}
                    onChange={() =>
                      dispatch(selectCartAction(key, !cart[key].selected))
                    }
                    className="cartItemCheck"
                  />
                </Grid>
                <Grid item xs={4} sm={2}>
                  <Link className="cartItemLink" to={`/product/${key}`}>
                    <img
                      className="cartItemImage"
                      src={cart[key].image}
                      alt={`steeldalal ${cart[key].title}`}
                    />
                  </Link>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Link className="cartItemLink" to={`/product/${key}`}>
                    <p className="cartItemTitle">{cart[key].title}</p>
                  </Link>
                </Grid>
                <Grid item xs={3} sm={2}>
                  <p className="cartItemPrice">
                    <FaRupeeSign />
                    {cart[key].price}
                  </p>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <div className="cartQuantityContainer">
                    <IconButton
                      disabled={cart[key].quantity === 1}
                      color="primary"
                      onClick={() =>
                        dispatch(
                          changeQtyAction(
                            key,
                            cart[key].quantity === 1
                              ? 1
                              : cart[key].quantity - 1
                          )
                        )
                      }
                    >
                      <ChevronLeftOutlined />
                    </IconButton>
                    <input disabled type="number" value={cart[key].quantity} />
                    <IconButton
                      disabled={cart[key].quantity === cart[key].qty}
                      color="primary"
                      onClick={() =>
                        dispatch(
                          changeQtyAction(
                            key,
                            cart[key].quantity === cart[key].qty
                              ? cart[key].quantity
                              : cart[key].quantity + 1
                          )
                        )
                      }
                    >
                      <ChevronRightOutlined />
                    </IconButton>
                  </div>
                </Grid>
                <Grid item xs={3} sm={1}>
                  <IconButton
                    onClick={() => dispatch(deleteCartAction(key))}
                    color="error"
                    className="cartItemDelete"
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <Hidden smDown>
            <div className="cartContentRight">
              <Typography variant="h6" component="h6">
                Order Summary
              </Typography>
              <div className="cartContentSubTotal">
                <Typography>Total items</Typography>
                <Typography component="span">{selectedTotal}</Typography>
              </div>

              <div className="cartContentTotal">
                <Typography>Total</Typography>
                <Typography component="span">
                  <FaRupeeSign />
                  {subTotal === 0 ? 0 : subTotal.toFixed(2)}
                </Typography>
              </div>
              <Button variant="contained" color="primary" fullWidth>
                Proceed To Checkout
              </Button>
            </div>
          </Hidden>
        </Grid>
      </Grid>

      <div className="fixedCartSummaryMainContainer">
        <div className="fixedCartSummary">
          <div className="fixedCartSummaryLeft">
            <div className="fixedCartSummaryLeftSubtotal">
              <Typography>Total items</Typography>
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
            <Button color="primary" variant="contained">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartContent;
