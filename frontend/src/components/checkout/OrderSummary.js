import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import "./OrderSummary.css";
import {
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";

const OrderSummary = ({ bagState }) => {
  const { loading, error, keys, bag } = bagState;
  const [subTotal, setSubTotal] = useState(0);
  const history = useHistory();
  useEffect(() => {
    if (keys.length === 0) history.push("/cart");
    else
      keys.forEach((key) => {
        setSubTotal(
          Object.keys(bag[key].specs).reduce(
            (previousValue, currentValue) =>
              previousValue +
              bag[key].specs[currentValue].price *
                bag[key].specs[currentValue].yourQty,
            0
          )
        );
      });
  }, [keys, history, bag]);

  return (
    <div className="orderSummaryContainer">
      <div className="orderSummaryLeft">
        <Typography>Order Items</Typography>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          keys.map((key) => (
            <div className="cartContentLeftContainer" key={key}>
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
                  <TableHead>
                    <TableRow>
                      <TableCell>Thickness</TableCell>
                      <TableCell>T. UoM</TableCell>
                      <TableCell>Width</TableCell>
                      <TableCell>W. UoM</TableCell>
                      <TableCell>Qty</TableCell>
                      <TableCell>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    {Object.keys(bag[key].specs).map((specKey) => (
                      <TableRow key={`spec-${key}-${specKey}`}>
                        <TableCell>
                          {bag[key].specs[specKey].thickness}
                        </TableCell>
                        <TableCell>{bag[key].specs[specKey].t_uom}</TableCell>
                        <TableCell>{bag[key].specs[specKey].width}</TableCell>
                        <TableCell>{bag[key].specs[specKey].w_uom}</TableCell>
                        <TableCell>{bag[key].specs[specKey].yourQty}</TableCell>
                        <TableCell>
                          <FaRupeeSign />{" "}
                          {(
                            bag[key].specs[specKey].yourQty *
                            bag[key].specs[specKey].price
                          ).toFixed(2)}
                        </TableCell>
                      </TableRow>
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
            {subTotal === 0 ? 0 : subTotal.toFixed(2)}
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
            {(subTotal + 200).toFixed(2)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
