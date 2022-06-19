import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  editProductAction,
  fetchSingleProductsAction,
} from "../actions/productAction";
import CreateProductContainer from "../components/product/CreateProductContainer";
import {
  Box,
  Button,
  Typography,
  Container,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";

import {
  ChevronLeftOutlined,
  ChevronRightOutlined,
  Save,
} from "@mui/icons-material";
import CreateProductDescription from "../components/product/CreateProductDescription";
import CreateProductFormRight from "../components/product/CreateProductFormRight";
import CustomAlert from "../components/layout/CustomAlert";
import {
  EDIT_PRODUCT_RESET,
  SINGLE_PRODUCT_RESET,
} from "../reducers/types/productTypes";
import CustomHelmet from "../components/layout/CustomHelmet";

const EditProductScreen = () => {
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { product, error } = useSelector((state) => state.singleProduct);
  const {
    loading: editProductLoading,
    success: editProductSuccess,
    error: editProductError,
  } = useSelector((state) => state.editProduct);
  const [values, setValues] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (!userInfo) {
      history.push("/login?redirect=manage-product");
    } else {
      dispatch(fetchSingleProductsAction(id));
    }
  }, [dispatch, userInfo, history, id]);
  useEffect(() => {
    if (editProductSuccess) {
      history.push(`/product/${id}`);
    }
    if (product) {
      setValues({
        ...product,
        details: {
          html: product.details,
          text: product.detailsText,
        },
        specs: product.specs
          ? product.specs.length > 0
            ? product.specs
            : [
                {
                  thickness: null,
                  t_uom: "m",
                  width: null,
                  w_uom: "m",
                  height: 0,
                  h_uom: "m",
                  price: null,
                  qty: null,
                },
              ]
          : [
              {
                thickness: null,
                t_uom: "m",
                width: null,
                w_uom: "m",
                height: 0,
                h_uom: "m",
                price: null,
                qty: null,
              },
            ],
      });
    }
  }, [editProductSuccess, history, id, product]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container>
      <CustomHelmet
        title="Edit Product"
        desc="You edit your product details in just 2 steps"
      />
      <br />
      <CreateProductContainer>
        <Typography variant="h5" component="h5">
          Edit Product
        </Typography>
        {editProductError && (
          <CustomAlert
            type="error"
            text={editProductError}
            handleClose={() => dispatch({ type: EDIT_PRODUCT_RESET })}
          />
        )}
        {error && (
          <CustomAlert
            type="error"
            text={error}
            handleClose={() => dispatch({ type: SINGLE_PRODUCT_RESET })}
          />
        )}
        {values && (
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>Edit Details</StepLabel>
              <StepContent>
                <CreateProductFormRight
                  handleChange={handleChange}
                  values={values}
                  setValues={(value) => setValues({ ...values, ...value })}
                />
                <Box sx={{ mb: 2, mt: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                      endIcon={<ChevronRightOutlined />}
                      disabled={Object.keys(values).find(
                        (key) =>
                          (key !== "detailsText" && values[key] === "") ||
                          values[key] === [] ||
                          values[key] === {}
                      )}
                    >
                      Continue
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>

            <Step>
              <StepLabel>Edit Description</StepLabel>
              <StepContent>
                <CreateProductDescription
                  handleDetails={(html, text) =>
                    setValues({
                      ...values,
                      details: {
                        html,
                        text,
                      },
                    })
                  }
                  values={values}
                />
                {editProductLoading && (
                  <Typography sx={{ mb: 2, mt: 2 }} color="gray">
                    editing... product
                  </Typography>
                )}

                <Box sx={{ mb: 2, mt: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                      startIcon={<ChevronLeftOutlined />}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ mt: 1, mr: 1 }}
                      color={"success"}
                      endIcon={<Save />}
                      onClick={() => dispatch(editProductAction(id, values))}
                    >
                      Save
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          </Stepper>
        )}
      </CreateProductContainer>
    </Container>
  );
};

export default EditProductScreen;
