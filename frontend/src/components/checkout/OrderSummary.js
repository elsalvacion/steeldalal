import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import "./OrderSummary.css";
import {
  Typography,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useRef } from "react";

const OrderSummary = ({ bagState }) => {
  const { loading, error, bag } = bagState;
  const subTotal = useRef(0);
  const history = useHistory();
  useEffect(() => {
    if (Object.keys(bag).length === 0) history.push("/cart");
    else {
      Object.keys(bag).forEach((key) => {
        subTotal.current =
          subTotal.current +
          Object.keys(bag[key].specs).reduce(
            (previousValue, currentValue) =>
              previousValue +
              bag[key].specs[currentValue].price *
                bag[key].specs[currentValue].yourQty,
            0
          );
      });
    }
  }, [history, bag]);

  return (
    <div className="orderSummaryContainer">
      <div className="orderSummaryLeft">
        <Typography>Order Items</Typography>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          Object.keys(bag).map((key) => (
            <div className="cartContentLeftContainer">
              <div className="cartContentLeftTop">
                <Link className="cartItemLink" to={`/product/${key}`}>
                  <img
                    className="cartItemImage"
                    src={bag[key].image}
                    alt={`steeldalal ${bag[key].title}`}
                  />
                </Link>
                <Link className="cartItemLink" to={`/product/${key}`}>
                  <p className="cartItemTitle">{bag[key].title}</p>
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
                    {Object.keys(bag[key].specs).map((specKey) => (
                      <div key={`spec-${key}-${specKey}`}>
                        <TableRow>
                          <TableCell>
                            <b>Thickness</b>
                          </TableCell>
                          <TableCell>
                            <b>T. UoM</b>
                          </TableCell>
                          {bag[key].specs[specKey].width && (
                            <TableCell>
                              <b>Width</b>
                            </TableCell>
                          )}
                          {bag[key].specs[specKey].w_uom && (
                            <TableCell>
                              <b>W. UoM</b>
                            </TableCell>
                          )}
                          {bag[key].specs[specKey].length && (
                            <TableCell>
                              <b>Length</b>
                            </TableCell>
                          )}
                          {bag[key].specs[specKey].l_uom && (
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
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            {bag[key].specs[specKey].thickness.toFixed(2)}
                          </TableCell>
                          <TableCell>{bag[key].specs[specKey].t_uom}</TableCell>
                          {bag[key].specs[specKey].width && (
                            <TableCell>
                              {bag[key].specs[specKey].width.toFixed(2)}
                            </TableCell>
                          )}
                          {bag[key].specs[specKey].w_uom && (
                            <TableCell>
                              {bag[key].specs[specKey].w_uom}
                            </TableCell>
                          )}
                          {bag[key].specs[specKey].length && (
                            <TableCell>
                              {bag[key].specs[specKey].length.toFixed(2)}
                            </TableCell>
                          )}
                          {bag[key].specs[specKey].l_uom && (
                            <TableCell>
                              {bag[key].specs[specKey].l_uom}
                            </TableCell>
                          )}
                          <TableCell>
                            {bag[key].specs[specKey].yourQty}
                          </TableCell>
                          <TableCell>
                            <FaRupeeSign />{" "}
                            {bag[key].specs[specKey].price.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      </div>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ))
        )}
      </div>
      <div className="orderSummaryRight">
        <Typography>Pricing Summary</Typography>
        <div className="cartContentSubTotal">
          <Typography>Sub Total</Typography>
          <Typography component="span">
            <FaRupeeSign />
            {subTotal.current === 0 ? 0 : subTotal.current.toFixed(2)}
          </Typography>
        </div>
        <div className="cartContentSubTotal">
          <Typography>Shipping Fee</Typography>
          <Typography component="span">
            <FaRupeeSign />
            {200}
          </Typography>
        </div>

        <div className="cartContentSubTotal">
          <Typography>Total</Typography>
          <Typography component="span">
            <FaRupeeSign />
            {(subTotal.current + 200).toFixed(2)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
