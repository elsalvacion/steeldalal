import { Typography, Button, Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./ProductDescription.css";
import ProductSlider from "../product/ProductSlider";
import parse from "html-react-parser";
import { FaCartPlus, FaRupeeSign } from "react-icons/fa";
import ChangeQuantity from "../layout/ChangeQuantity";
import { addToCartAction } from "../../actions/cartAction";
import { useDispatch } from "react-redux";
const ProductDescription = ({ details }) => {
  const [specValues, setSpecValues] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const specs = {};
    details.specs.forEach((spec) => {
      specs[spec.id] = {
        ...spec,
        yourQty: "",
      };
    });
    setSpecValues(specs);
  }, [details]);
  const handleInputChange = (newValue, id) => {
    setSpecValues({
      ...specValues,
      [id]: {
        ...specValues[id],
        yourQty: newValue,
      },
    });
  };

  const handleAddToCart = (id) => {
    const spec = specValues[id];
    if (Number(spec.yourQty) > 0)
      dispatch(
        addToCartAction({
          ...details,
          specs: spec,
        })
      );
  };

  return (
    <>
      {details.isBlocked === 1 && (
        <Card sx={{ my: 3 }}>
          <CardContent>
            <Typography color="red">
              This product is blocked by admin. if you are the seller contact
              the admin else please find a similar product.
            </Typography>
          </CardContent>
        </Card>
      )}
      <div className="productDesContainer">
        <div className="productDesContentTop">
          <ProductSlider images={details.images} />
          <div className="productDesContentTopRight">
            <Typography variant="h6" component="h6">
              {details.title}
            </Typography>

            <p>
              <b>Brand: </b>
              {details.brand}
            </p>
            <p>
              <b>Category: </b>
              {details.category}
            </p>
            <p>
              <b>Type: </b>
              {details.type}
            </p>
            <p>
              <b>Seller: </b>
              {details.seller.name}
            </p>
            <p>
              <b>State: </b>
              {details.seller.state}
            </p>
            <p>
              <b>City: </b>
              {details.seller.city}
            </p>
          </div>
        </div>
        <div className="productDesDetails">
          <b>Details: </b>
          <br />

          {parse(details.details)}
        </div>
        {details.isBlocked === 0 && Object.keys(specValues).length > 0 && (
          <div className="specs">
            {Object.keys(specValues).map((key, i) => (
              <div className="spec" key={key}>
                <div className="spec-left">
                  <div>
                    <b>Thickness: </b>
                    <p>
                      {specValues[key].thickness.toFixed(2)}{" "}
                      {specValues[key].t_uom}
                    </p>
                  </div>
                  {specValues[key].width && (
                    <div>
                      <b>Width: </b>
                      <p>
                        {specValues[key].width.toFixed(2)}{" "}
                        {specValues[key].w_uom}
                      </p>
                    </div>
                  )}
                  {specValues[key].length && (
                    <div>
                      <b>Length: </b>
                      <p>
                        {specValues[key].length.toFixed(2)}{" "}
                        {specValues[key].l_uom}
                      </p>
                    </div>
                  )}
                  <div>
                    <b>Price: </b>
                    <p>
                      <FaRupeeSign /> {specValues[key].price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="spec-right">
                  <Typography>Qty (per piece)</Typography>
                  <ChangeQuantity
                    handleChange={(e) =>
                      handleInputChange(e.target.value, specValues[key].id)
                    }
                    qty={specValues[key].yourQty}
                    countInStock={specValues[key].qty}
                  />

                  <small>Available in Stock: {specValues[key].qty}</small>

                  <Button
                    onClick={() => handleAddToCart(specValues[key].id)}
                    variant="contained"
                    startIcon={<FaCartPlus />}
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDescription;
