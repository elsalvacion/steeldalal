import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchSingleProductsAction } from "../actions/productAction";

const EditProductScreen = () => {
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { product, loading, error } = useSelector(
    (state) => state.singleProduct
  );
  const [values, setValues] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (!userInfo) {
      history.push("/login?redirect=manage-product");
    } else {
      if (!product) {
        dispatch(fetchSingleProductsAction(id));
      } else {
        setValues(product);
      }
    }
  }, [dispatch, userInfo, history, id, product]);
  return <div>EditProductScreen</div>;
};

export default EditProductScreen;
