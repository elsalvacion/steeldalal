import { Button, Card, CardContent, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  fetchAdminProductAction,
  updateAdminProductAction,
} from "../../../actions/adminAction";

import {
  FETCH_ADMIN_PRODUCT_RESET,
  UPDATE_ADMIN_PRODUCT_RESET,
} from "../../../reducers/types/adminTypes";
import parse from "html-react-parser";
import CustomSnack from "../../layout/CustomSnack";
import ProductSlider from "../../product/ProductSlider";
import { Block, ChevronLeftOutlined } from "@mui/icons-material";

const SingleAdminProduct = () => {
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.adminProduct
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    loading: updateLoading,
    success,
    error: updateProductError,
  } = useSelector((state) => state.adminProductUpdate);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!userInfo || userInfo.isAdmin === 0)
      history.push(`/login?redirect=admin-product/${id}`);
    else dispatch(fetchAdminProductAction(id));

    // eslint-disable-next-line
  }, [id, dispatch, success]);

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
    <Container>
      {updateProductError && (
        <CustomSnack
          type="error"
          text={updateProductError}
          handleClose={() => dispatch({ type: UPDATE_ADMIN_PRODUCT_RESET })}
        />
      )}
      {error && (
        <CustomSnack
          type="error"
          text={error}
          handleClose={() => dispatch({ type: FETCH_ADMIN_PRODUCT_RESET })}
        />
      )}
      {success && (
        <CustomSnack
          type="success"
          text="product updated"
          handleClose={() => dispatch({ type: UPDATE_ADMIN_PRODUCT_RESET })}
        />
      )}
      {loading && (
        <CustomSnack
          type="success"
          text="fetching... product"
          handleClose={() => dispatch({ type: FETCH_ADMIN_PRODUCT_RESET })}
        />
      )}
      {updateLoading && (
        <CustomSnack
          type="success"
          text="updating..."
          handleClose={() => dispatch({ type: UPDATE_ADMIN_PRODUCT_RESET })}
        />
      )}
      {product && (
        <>
          <Card sx={{ my: 2 }}>
            <CardContent>
              <div className="ProfileDetailLeftHeader">
                <Button
                  startIcon={<ChevronLeftOutlined />}
                  onClick={() => history.push("/admin-panel")}
                >
                  Back
                </Button>
                <>
                  {product.isBlocked === 0 && (
                    <Button
                      onClick={() =>
                        dispatch(
                          updateAdminProductAction(product.id, {
                            isBlocked: 1,
                          })
                        )
                      }
                      variant="contained"
                      color="primary"
                      endIcon={<Block />}
                    >
                      Block Product
                    </Button>
                  )}

                  {product.isBlocked === 1 && (
                    <Button
                      onClick={() =>
                        dispatch(
                          updateAdminProductAction(product.id, {
                            isBlocked: 0,
                          })
                        )
                      }
                      variant="contained"
                      color="primary"
                      endIcon={<Block />}
                    >
                      Un-Block Product
                    </Button>
                  )}
                </>
              </div>
            </CardContent>
          </Card>

          <Card sx={{ my: 2 }}>
            <CardContent>
              <div className="productDesContainer">
                {product.isBlocked === 1 && (
                  <Typography color="red" sx={{ mb: 3, fontWeight: "lighter" }}>
                    This product is now blocked. Buyers can only see details but
                    cannot add to cart.
                  </Typography>
                )}
                {product.isDeleted === 1 && (
                  <Typography color="red" sx={{ mb: 3, fontWeight: "lighter" }}>
                    This product has been deleted by the seller. It is kept here
                    for reference and records but no visible on sellers product
                    catalog for editing or any other action.
                  </Typography>
                )}
                <div className="productDesContentTop">
                  <ProductSlider images={product.images} />
                  <div className="productDesContentTopRight">
                    <Typography variant="h6" component="h6">
                      {product.title}
                    </Typography>

                    <p>
                      <b>Brand: </b>
                      {product.brand}
                    </p>
                    <p>
                      <b>Category: </b>
                      {product.category}
                    </p>
                    <p>
                      <b>Type: </b>
                      {product.type}
                    </p>
                    <p>
                      <b>Seller: </b>
                      {product.seller.name}
                    </p>
                    <p>
                      <b>State: </b>
                      {product.seller.state}
                    </p>
                    <p>
                      <b>City: </b>
                      {product.seller.city}
                    </p>
                  </div>
                </div>
                <div className="productDesproduct">
                  <b>product: </b>
                  <br />

                  {parse(product.details)}
                </div>
                {Object.keys(product.specs).length > 0 && (
                  <div className="specs">
                    {Object.keys(product.specs).map((key) => (
                      <div className="spec" key={key}>
                        <div className="spec-left">
                          <Typography sx={{ ...styles.spec }}>
                            Thickness:
                            <b>
                              {product.specs[key].thickness.toFixed(2)}{" "}
                              {product.specs[key].t_uom}
                            </b>
                          </Typography>
                          {product.specs[key].width && (
                            <Typography sx={{ ...styles.spec }}>
                              Width:
                              <b>
                                {product.specs[key].width.toFixed(2)}{" "}
                                {product.specs[key].w_uom}
                              </b>
                            </Typography>
                          )}
                          {product.specs[key].length && (
                            <Typography sx={{ ...styles.spec }}>
                              Length:
                              <b>
                                {product.specs[key].length.toFixed(2)}{" "}
                                {product.specs[key].l_uom}
                              </b>
                            </Typography>
                          )}
                          <Typography sx={{ ...styles.spec }}>
                            Price per M/Tonne (Excl. 18% GST ):
                            <b>
                              <FaRupeeSign />{" "}
                              {product.specs[key].price.toFixed(2)}
                            </b>
                          </Typography>
                        </div>
                        <div className="spec-right">
                          <Typography sx={{ fontSize: 11 }}>
                            Qty (M/Tonne)
                          </Typography>

                          <small>MOQ: {product.specs[key].moq}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </Container>
  );
};

export default SingleAdminProduct;
