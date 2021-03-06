import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProductAction } from "../../actions/productAction";
import {
  CREATE_PRODUCT_RESET,
  PRODUCT_UPLOAD_RESET,
} from "../../reducers/types/productTypes";
import CustomSnack from "../layout/CustomSnack";
import CreateProductDescription from "./CreateProductDescription";
import "./CreateProductForm.css";
import CreateProductFormLeft from "./CreateProductFormLeft";
import CreateProductFormRight from "./CreateProductFormRight";
import { Box, Button, Typography } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import {
  AddBox,
  ChevronLeftOutlined,
  ChevronRightOutlined,
  RestartAlt,
} from "@mui/icons-material";
import { returnCategorySpec } from "../../constants/specs";

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const {
    error: createProductError,
    success,
    loading: createProductLoading,
  } = useSelector((state) => state.createProduct);
  const { images } = useSelector((state) => state.uploadProduct);
  const [activeStep, setActiveStep] = useState(0);
  const [values, setValues] = useState({
    title: "",
    type: "",
    category: "",
    brand: "",
    grade: "",
    price: 0,
    qty: 1,
    details: {
      text: "",
      html: "",
    },
    discount: 0,
    specs: [],
  });

  useEffect(() => {
    if (images)
      setValues({
        ...values,
        images,
      });
    // eslint-disable-next-line
  }, [images]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setValues({
        ...values,
        [name]: value,
        specs: [returnCategorySpec(value)],
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };
  const handleCreate = () => {
    dispatch(createProductAction(values));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Upload Images</StepLabel>
          <StepContent>
            <CreateProductFormLeft />
            <Box sx={{ mb: 2 }}>
              {/* {images && (
                <div> */}
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<ChevronRightOutlined />}
                sx={{ mt: 1, mr: 1 }}
              >
                Continue
              </Button>
              {/* </div>
              )} */}
            </Box>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Fill Details</StepLabel>
          <StepContent>
            <CreateProductFormRight
              handleChange={handleChange}
              values={values}
              setValues={(value) => setValues({ ...values, ...value })}
            />
            <Box sx={{ mb: 2 }}>
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
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                  endIcon={<ChevronRightOutlined />}
                  disabled={
                    values.brand.trim() === "" ||
                    values.title.trim() === "" ||
                    values.category.trim() === "" ||
                    values.type.trim() === "" ||
                    values.grade.trim() === "" ||
                    values.specs.find(
                      (spec) =>
                        spec.qty === "" ||
                        spec.price === "" ||
                        spec.moq === "" ||
                        (spec.width && spec.width === "") ||
                        (spec.length && spec.length === "") ||
                        spec.thickness === ""
                    )
                  }
                >
                  Continue
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Product Description</StepLabel>
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

            {createProductLoading && (
              <Typography sx={{ mb: 2, mt: 2 }} color="gray">
                Creating... product
              </Typography>
            )}

            {success && (
              <CustomSnack
                type="success"
                text="Product Created"
                handleClose={() => {
                  handleReset();
                  dispatch({ type: CREATE_PRODUCT_RESET });
                  dispatch({ type: PRODUCT_UPLOAD_RESET });
                }}
              />
            )}
            {createProductError && (
              <CustomSnack
                type="error"
                text={createProductError}
                handleClose={() => dispatch({ type: CREATE_PRODUCT_RESET })}
              />
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
                  onClick={
                    success
                      ? () => {
                          handleReset();
                          dispatch({
                            type: CREATE_PRODUCT_RESET,
                          });
                          dispatch({
                            type: PRODUCT_UPLOAD_RESET,
                          });
                        }
                      : handleCreate
                  }
                  sx={{ mt: 1, mr: 1 }}
                  endIcon={success ? <RestartAlt /> : <AddBox />}
                  disabled={
                    createProductLoading || values.details.html.trim() === ""
                  }
                >
                  {success ? "New Product" : "Create"}
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>
      </Stepper>
    </>
  );
};

export default CreateProductForm;
