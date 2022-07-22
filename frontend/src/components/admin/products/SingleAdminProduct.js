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
                  <Typography color="red" sx={{ mb: 2 }}>
                    This product is now blocked. Buyers can only see details but
                    cannot add to cart.
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
                          <div>
                            <b>Thickness: </b>
                            <p>
                              {product.specs[key].thickness}{" "}
                              {product.specs[key].t_uom}
                            </p>
                          </div>
                          <div>
                            <b>Width: </b>
                            <p>
                              {product.specs[key].width}{" "}
                              {product.specs[key].w_uom}
                            </p>
                          </div>
                          <div>
                            <b>Price: </b>
                            <p>
                              <FaRupeeSign />{" "}
                              {product.specs[key].price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="spec-right">
                          <small>
                            Available in Stock: {product.specs[key].qty}
                          </small>
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
