import { Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CreateProductContainer from "../components/product/CreateProductContainer";
import CreateProductForm from "../components/product/CreateProductForm";

const CreateProductScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const history = useHistory();
  useEffect(() => {
    if (!userInfo) history("/login");
  }, [userInfo, history]);
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
