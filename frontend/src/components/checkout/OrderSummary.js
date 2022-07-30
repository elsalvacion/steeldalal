import React, { useState } from "react";
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
import { useEffect } from "react";

const OrderSummary = ({ bagState }) => {
  const { loading, error, bag } = bagState;
  const [shippingFee] = useState(7500);
  const history = useHistory();
  useEffect(() => {
    if (Object.keys(bag).length === 0) history.push("/cart");
  }, [history, bag]);
  const styles = {
    title: {
      fontSize: 15,
      fontWeight: "lighter",
    },
  };

  return (
    <div className="orderSummaryContainer">
      <div className="orderSummaryLeft">
        <Typography sx={{ ...styles.title }}>Order Items</Typography>
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
                  <p className="cartItemTitle">
                    {bag[key].title} {bag[key].type} {bag[key].brand}{" "}
                    {bag[key].grade}
                  </p>
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
                          <TableCell sx={{ ...styles.title }}>
                            <b>Thickness</b>
                          </TableCell>
                          <TableCell sx={{ ...styles.title }}>
                            <b>T. UoM</b>
                          </TableCell>
                          {bag[key].specs[specKey].width && (
                            <TableCell sx={{ ...styles.title }}>
                              <b>Width</b>
                            </TableCell>
                          )}
                          {bag[key].specs[specKey].w_uom && (
                            <TableCell sx={{ ...styles.title }}>
                              <b>W. UoM</b>
                            </TableCell>
                          )}
                          {bag[key].specs[specKey].length && (
                            <TableCell sx={{ ...styles.title }}>
                              <b>Length</b>
                            </TableCell>
                          )}
                          {bag[key].specs[specKey].l_uom && (
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
                            {bag[key].specs[specKey].thickness.toFixed(2)}
                          </TableCell>
                          <TableCell sx={{ ...styles.title }}>
                            {bag[key].specs[specKey].t_uom}
                          </TableCell>
                          {bag[key].specs[specKey].width && (
                            <TableCell sx={{ ...styles.title }}>
                              {bag[key].specs[specKey].width.toFixed(2)}
                            </TableCell>
                          )}
                          {bag[key].specs[specKey].w_uom && (
                            <TableCell sx={{ ...styles.title }}>
                              {bag[key].specs[specKey].w_uom}
                            </TableCell>
                          )}
                          {bag[key].specs[specKey].length && (
                            <TableCell sx={{ ...styles.title }}>
                              {bag[key].specs[specKey].length.toFixed(2)}
                            </TableCell>
                          )}
                          {bag[key].specs[specKey].l_uom && (
                            <TableCell sx={{ ...styles.title }}>
                              {bag[key].specs[specKey].l_uom}
                            </TableCell>
                          )}
                          <TableCell sx={{ ...styles.title }}>
                            {bag[key].specs[specKey].yourQty}
                          </TableCell>
                          <TableCell sx={{ ...styles.title }}>
                            <FaRupeeSign sx={{ mr: 2 }} />{" "}
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
        <Typography variant="h6">Order Summary</Typography>
        <div className="cartContentSubTotal">
          <Typography sx={{ ...styles.title }}>Price</Typography>
          <Typography sx={{ ...styles.title }}>
            <FaRupeeSign sx={{ mr: 2 }} />
            {Object.keys(bag)
              .map((bagKey) =>
                Object.keys(bag[bagKey].specs).reduce(
                  (acc, specKey) =>
                    acc +
                    bag[bagKey].specs[specKey].yourQty *
                      bag[bagKey].specs[specKey].price,
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
            <FaRupeeSign sx={{ mr: 2 }} />
            {Object.keys(bag)
              .map((bagKey) =>
                Object.keys(bag[bagKey].specs).reduce(
                  (acc, specKey) =>
                    acc +
                    bag[bagKey].specs[specKey].yourQty *
                      bag[bagKey].specs[specKey].price,
                  0
                )
              )
              .reduce((acc, curr) => acc + curr, 0)
              .toFixed(2) * 0.18}
          </Typography>
        </div>
        <div className="cartContentSubTotal">
          <Typography sx={{ ...styles.title }}>Shipping Fees</Typography>
          <Typography sx={{ ...styles.title }}>
            <FaRupeeSign sx={{ mr: 2 }} />
            {shippingFee.toFixed(2)}
          </Typography>
        </div>
        <div className="cartContentSubTotal">
          <Typography sx={{ ...styles.title }}>
            Sub Total(Excl. delivery fees)
          </Typography>
          <Typography sx={{ ...styles.title }}>
            <FaRupeeSign sx={{ mr: 2 }} />
            {(
              Object.keys(bag)
                .map((bagKey) =>
                  Object.keys(bag[bagKey].specs).reduce(
                    (acc, specKey) =>
                      acc +
                      bag[bagKey].specs[specKey].yourQty *
                        bag[bagKey].specs[specKey].price,
                    0
                  )
                )
                .reduce((acc, curr) => acc + curr, 0) *
                0.18 +
              Object.keys(bag)
                .map((bagKey) =>
                  Object.keys(bag[bagKey].specs).reduce(
                    (acc, specKey) =>
                      acc +
                      bag[bagKey].specs[specKey].yourQty *
                        bag[bagKey].specs[specKey].price,
                    0
                  )
                )
                .reduce((acc, curr) => acc + curr, 0) +
              shippingFee
            ).toFixed(2)}
          </Typography>
        </div>

        <div className="cartContentSubTotal">
          <Typography sx={{ ...styles.title }}>
            Total Amount Due (Excl. delivery fees)
          </Typography>
          <Typography sx={{ ...styles.title }}>
            <FaRupeeSign sx={{ mr: 2 }} />
            {(
              Object.keys(bag)
                .map((bagKey) =>
                  Object.keys(bag[bagKey].specs).reduce(
                    (acc, specKey) =>
                      acc +
                      bag[bagKey].specs[specKey].yourQty *
                        bag[bagKey].specs[specKey].price,
                    0
                  )
                )
                .reduce((acc, curr) => acc + curr, 0) *
                0.18 +
              Object.keys(bag)
                .map((bagKey) =>
                  Object.keys(bag[bagKey].specs).reduce(
                    (acc, specKey) =>
                      acc +
                      bag[bagKey].specs[specKey].yourQty *
                        bag[bagKey].specs[specKey].price,
                    0
                  )
                )
                .reduce((acc, curr) => acc + curr, 0) +
              shippingFee
            ).toFixed(2)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
