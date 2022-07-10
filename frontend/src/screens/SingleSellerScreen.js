import { ArrowBackOutlined } from "@mui/icons-material";
import { Button, Chip, Container, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchSellerProductsAction } from "../actions/productAction";
import AllProductItem from "../components/allproduct/AllProductItem";
import CustomHelmet from "../components/layout/CustomHelmet";
import CustomSnack from "../components/layout/CustomSnack";
import { SELLER_PRODUCTS_RESET } from "../reducers/types/productTypes";

const SingleSellerScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.sellerProducts
  );
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchSellerProductsAction(id));
  }, [id, dispatch]);
  return (
    <Container sx={{ py: 2 }}>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <CustomSnack
          type="error"
          text={error}
          handleClose={() => dispatch({ type: SELLER_PRODUCTS_RESET })}
        />
      ) : products ? (
        <>
          <CustomHelmet
            title={products.name || "Seller Order"}
            desc={`Steeldalal seller order ${products.name}`}
          />

          <Button
            onClick={() => history.push("/sellers")}
            startIcon={<ArrowBackOutlined />}
            variant="contained"
            sx={{ mb: 1 }}
          >
            Sellers
          </Button>

          <Container
            sx={{
              my: 2,
              py: 2,
              background: "#c8e6c9",
            }}
          >
            <Typography>
              <b>{products.name}</b>
            </Typography>
            <Typography sx={{ fontWeight: "lighter", fontSize: 12 }}>
              {products.address}
            </Typography>
            <Typography sx={{ fontWeight: "lighter", fontSize: 12 }}>
              {products.city}, {products.state}.
            </Typography>
            {products.categories.length > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Chip label="Deals in: " size="small" />
                {products.categories.map(({ category }) => (
                  <Chip
                    label={category}
                    key={category}
                    size="small"
                    color="success"
                    sx={{ mx: 1, my: 1 }}
                  />
                ))}
              </div>
            )}
          </Container>
          <Typography sx={{ my: 1 }}>Products</Typography>
          <div className="allProductContent">
            {products.products.map((product) => (
              <AllProductItem key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : null}
    </Container>
  );
};

export default SingleSellerScreen;
