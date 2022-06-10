import { Container, Fab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProductsAction } from "../actions/productAction";
import ProductDetailSection from "../components/product/ProductDetailSection";
import CustomAlert from "../components/layout/CustomAlert";
import {
  EDIT_PRODUCT_RESET,
  SINGLE_PRODUCT_RESET,
} from "../reducers/types/productTypes";
import { getCartAction } from "../actions/cartAction";
import { ADD_CART_RESET } from "../reducers/types/cartTypes";
import ChatBox from "../components/product/ChatBox";
import { ChatBubble, Close } from "@mui/icons-material";
import { Rotate, Zoom } from "react-reveal";

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.singleProduct
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.addCart);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    dispatch(fetchSingleProductsAction(id));
    dispatch({ type: ADD_CART_RESET });
    dispatch({ type: EDIT_PRODUCT_RESET });
    // eslint-disable-next-line
  }, [id, dispatch]);
  useEffect(() => {
    if (success) {
      dispatch(getCartAction());
    }
  }, [success, dispatch]);
  return (
    <div>
      <Container>
        {loading ? (
          <h4>Loading ..</h4>
        ) : error ? (
          <CustomAlert
            text={error}
            type="danger"
            handleClose={() => dispatch({ type: SINGLE_PRODUCT_RESET })}
          />
        ) : product ? (
          <ProductDetailSection product={product} />
        ) : null}
        {(userInfo && product && userInfo.id !== product.user) ||
        (!userInfo && product) ? (
          <>
            {open && product && <ChatBox product={id} to={product.user} />}
            <div className="ChatBoxBottom">
              {!open ? (
                <Zoom>
                  <Fab
                    size="medium"
                    onClick={() => setOpen(!open)}
                    aria-label="make a deal"
                    color="primary"
                  >
                    <ChatBubble />
                  </Fab>
                </Zoom>
              ) : (
                <Rotate>
                  <Fab
                    size="large"
                    onClick={() => setOpen(!open)}
                    aria-label="make a deal"
                    color="primary"
                  >
                    <Close />
                  </Fab>
                </Rotate>
              )}
            </div>
          </>
        ) : null}
      </Container>
    </div>
  );
};

export default ProductScreen;
