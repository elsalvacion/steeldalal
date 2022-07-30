import { Typography, Button, Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./ProductDescription.css";
import ProductSlider from "../product/ProductSlider";
import parse from "html-react-parser";
import { FaCartPlus, FaRupeeSign } from "react-icons/fa";
import ChangeQuantity from "../layout/ChangeQuantity";
import { addToCartAction } from "../../actions/cartAction";
import { useDispatch } from "react-redux";
import CustomSnack from "../layout/CustomSnack";
const ProductDescription = ({ details }) => {
  const [specValues, setSpecValues] = useState({});
  const [qtyError, setQtyError] = useState(false);
  const [moqError, setMoqError] = useState(false);
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

  const handleAddToCart = () => {
    dispatch(
      addToCartAction({
        ...details,
        specs: specValues,
      })
    );
  };

  const styles = {
    points: {
      fontWeight: "lighter",
      display: "flex",
      alignItems: "center",
      fontSize: 14,

      "& b": {
        marginLeft: 1,
      },
    },
    spec: {
      fontWeight: "lighter",
      display: "flex",
      alignItems: "center",
      fontSize: 15,
      margin: "10px 5px",
      "& b": {
        marginLeft: 1,
      },
    },
    verifiedSeller: {
      maxWidth: "100%",
      height: 40,
      objectFit: "scale-down",
      margin: "10px 3px",
    },
    title: {
      fontSize: 14,
    },
    addToCartContainer: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
    },
  };

  return (
    <>
      {qtyError && (
        <CustomSnack
          text="Please fill qty"
          type="error"
          handleClose={() => setQtyError(false)}
        />
      )}
      {moqError && (
        <CustomSnack
          text="Qty more than MOQ"
          type="error"
          handleClose={() => setMoqError(false)}
        />
      )}
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
            <Typography sx={{ ...styles.title }} variant="h6" component="h6">
              {details.title} {details.type} {details.brand} {details.grade}
            </Typography>
            {details.seller.isPremium === 1 && (
              <img
                style={{ ...styles.verifiedSeller }}
                src="/assets/verified-seller.png"
                alt="steeldalal.com"
              />
            )}
            <Typography
              sx={{
                ...styles.points,
              }}
            >
              Brand <b>{details.brand}</b>
            </Typography>
            <Typography
              sx={{
                ...styles.points,
              }}
            >
              Category:
              <b>{details.category} </b>
            </Typography>
            <Typography
              sx={{
                ...styles.points,
              }}
            >
              Type:
              <b>{details.type} </b>
            </Typography>
            <Typography
              sx={{
                ...styles.points,
              }}
            >
              Seller:
              <b>{details.seller.name} </b>
            </Typography>
            <Typography
              sx={{
                ...styles.points,
              }}
            >
              State:
              <b>{details.seller.state} </b>
            </Typography>
            <Typography
              sx={{
                ...styles.points,
              }}
            >
              City:
              <b>{details.seller.city} </b>
            </Typography>
          </div>
        </div>
        <div className="productDesDetails">
          <b>Details: </b>

          {parse(details.details)}
        </div>
        {details.isBlocked === 0 && Object.keys(specValues).length > 0 && (
          <div className="specs">
            {Object.keys(specValues).map((key) => (
              <div className="spec" key={key}>
                <div className="spec-left">
                  <Typography sx={{ ...styles.spec }}>
                    Thickness:
                    <b>
                      {specValues[key].thickness.toFixed(2)}{" "}
                      {specValues[key].t_uom}
                    </b>
                  </Typography>
                  {specValues[key].width && (
                    <Typography sx={{ ...styles.spec }}>
                      Width:
                      <b>
                        {specValues[key].width.toFixed(2)}{" "}
                        {specValues[key].w_uom}
                      </b>
                    </Typography>
                  )}
                  {specValues[key].length && (
                    <Typography sx={{ ...styles.spec }}>
                      Length:
                      <b>
                        {specValues[key].length.toFixed(2)}{" "}
                        {specValues[key].l_uom}
                      </b>
                    </Typography>
                  )}
                  <Typography sx={{ ...styles.spec }}>
                    Price per M/Tonne (Excl. 18% GST ):
                    <b>
                      <FaRupeeSign /> {specValues[key].price.toFixed(2)}
                    </b>
                  </Typography>
                </div>
                <div className="spec-right">
                  <Typography sx={{ fontSize: 11 }}>Qty (M/Tonne)</Typography>
                  <ChangeQuantity
                    handleChange={(e) =>
                      handleInputChange(e.target.value, specValues[key].id)
                    }
                    qty={specValues[key].yourQty}
                    countInStock={specValues[key].qty}
                  />

                  <small>MOQ: {specValues[key].moq}</small>
                </div>
              </div>
            ))}
          </div>
        )}
        {Object.keys(specValues).length > 0 && (
          <div style={{ ...styles.addToCartContainer }}>
            <Button
              onClick={() => handleAddToCart()}
              variant="contained"
              startIcon={<FaCartPlus />}
            >
              Add To Cart
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDescription;
