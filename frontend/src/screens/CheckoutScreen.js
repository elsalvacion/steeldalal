import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import {
  Button,
  Container,
  MobileStepper,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBagAction } from "../actions/cartAction";
import OrderSummary from "../components/checkout/OrderSummary";
import Payment from "../components/checkout/Payment";
import ShippingDetails from "../components/checkout/ShippingDetails";
const ChecoutScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.userLogin);
  const bagState = useSelector((state) => state.getBag);
  // const {
  //   loading: addToBagLoading,
  //   success,
  //   error: addToBagError,
  // } = useSelector((state) => state.getBag);
  const [activeStep, setActiveStep] = useState(0);
  const { shippingDetails } = useSelector((state) => state.getShippingInfo);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login?redirect=checkout");
    } else {
      dispatch(getBagAction());
    }

    // return () => {
    //   dispatch(resetBagAction());
    // };
  }, [userInfo, history, dispatch]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const steps = ["Shipping Info", "Confirm Order", "Payment"];
  const maxSteps = steps.length;

  return (
    <>
      <br />
      <Container
        sx={{
          background: "white",
          py: 3,
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <ShippingDetails
            shippingDetails={
              shippingDetails ? shippingDetails : userInfo ? userInfo : {}
            }
          />
        )}
        {activeStep === 1 && <OrderSummary bagState={bagState} />}
        {activeStep === 2 && <Payment />}
        <MobileStepper
          variant="progress"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              endIcon={<KeyboardArrowRight />}
            >
              Next
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              startIcon={<KeyboardArrowLeft />}
            >
              Back
            </Button>
          }
        />
      </Container>
    </>
  );
};

export default ChecoutScreen;
