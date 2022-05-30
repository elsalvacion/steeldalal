import { Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CreateProductContainer from "../components/product/CreateProductContainer";
import CreateProductForm from "../components/product/CreateProductForm";
import { PRODUCT_UPLOAD_RESET } from "../reducers/types/productTypes";

const CreateProductScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) history("/login");
    dispatch({ type: PRODUCT_UPLOAD_RESET });
  }, [userInfo, history, dispatch]);
  return (
    <Container>
      <br />
      <CreateProductContainer>
        <Typography variant="h6" component="h6">
          Create Product
        </Typography>
        <CreateProductForm />
      </CreateProductContainer>
    </Container>
  );
};

export default CreateProductScreen;
