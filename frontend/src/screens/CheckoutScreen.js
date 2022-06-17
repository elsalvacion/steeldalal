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

  const [activeStep, setActiveStep] = useState(0);
  const { shippingDetails } = useSelector((state) => state.getShippingInfo);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login?redirect=checkout");
    } else {
      dispatch(getBagAction());
    }
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
          {steps.map((label, i) => (
            <Step
              sx={{
                cursor: "pointer",
              }}
              onClick={() => setActiveStep(i)}
              key={label}
            >
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          {activeStep === 0 && (
            <ShippingDetails
              shippingDetails={
                shippingDetails ? shippingDetails : userInfo ? userInfo : {}
              }
            />
          )}
          {activeStep === 1 && <OrderSummary bagState={bagState} />}
          {activeStep === 2 && <Payment />}
        </div>
        <MobileStepper
          variant="progress"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              endIcon={<KeyboardArrowRight />}
            >
              {activeStep === 0
                ? "Next"
                : activeStep === 1
                ? "Place Order"
                : "Close"}
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
