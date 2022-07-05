import { Button, Chip, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchSellersAction } from "../actions/productAction";
import CustomHelmet from "../components/layout/CustomHelmet";
import CustomSnack from "../components/layout/CustomSnack";
import { FETCH_SELLERS_RESET } from "../reducers/types/productTypes";

const SellersScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, sellers } = useSelector(
    (state) => state.fetchSellers
  );
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchSellersAction());
  }, [dispatch]);
  const colors = ["#fafafa", "#c8e6c9"];
  return (
    <Container>
      <CustomHelmet title="Sellers" desc="Steeldalal sellers" />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <CustomSnack
          type="error"
          text={error}
          handleClose={() => dispatch({ type: FETCH_SELLERS_RESET })}
        />
      ) : sellers ? (
        <>
          <Typography variant="h6" sx={{ my: 2 }}>
            Sellers
          </Typography>

          {sellers.map((seller, i) => (
            <Container
              sx={{
                my: 2,
                py: 2,
                background: i % 2 === 0 ? colors[0] : colors[1],
              }}
              key={"seller" + i}
            >
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  <Typography>
                    <b>{seller.name}</b>
                  </Typography>
                  <Typography sx={{ fontWeight: "lighter", fontSize: 12 }}>
                    {seller.address}
                  </Typography>
                  <Typography sx={{ fontWeight: "lighter", fontSize: 12 }}>
                    {seller.city}, {seller.state}.
                  </Typography>
                  {seller.categories.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Chip label="Deals in: " size="small" />
                      {seller.categories.map(({ category }) => (
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
                </Grid>
                <Grid item xs={3} align="center">
                  <Button
                    onClick={() => history.push(`/seller/${seller.id}`)}
                    variant="contained"
                    color="primary"
                  >
                    view
                  </Button>
                </Grid>
              </Grid>
            </Container>
          ))}
        </>
      ) : null}
    </Container>
  );
};

export default SellersScreen;
