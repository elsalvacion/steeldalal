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
import { placeOrderAction } from "../actions/orderAction";
import OrderSummary from "../components/checkout/OrderSummary";
import ShippingDetails from "../components/checkout/ShippingDetails";
import CustomSnack from "../components/layout/CustomSnack";
import { PLACE_ORDER_RESET } from "../reducers/types/orderTypes";

const ChecoutScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, order } = useSelector((state) => state.placeOrder);

  const bagState = useSelector((state) => state.getBag);

  const [activeStep, setActiveStep] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const { shippingDetails } = useSelector((state) => state.getShippingInfo);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login?redirect=checkout");
    } else {
      if (!bagState.bag) {
        dispatch(getBagAction());
      }
    }
    if (activeStep === 1 && bagState.bag) {
      bagState.keys.forEach((key) => {
        setSubTotal(
          Object.keys(bagState.bag[key].specs).reduce(
            (previousValue, currentValue) =>
              previousValue +
              bagState.bag[key].specs[currentValue].price *
                bagState.bag[key].specs[currentValue].yourQty,
            0
          )
        );
      });
    }
    if (order) {
      history.push(`/order/${order.id}`);
    }
    if (activeStep === 2 && !order) setActiveStep(1);
    if (activeStep === steps.length) history.push("/profile");
    // eslint-disable-next-line
  }, [userInfo, history, dispatch, bagState, activeStep, order]);

  const handleNext = () => {
    if (activeStep === 1 && !order) {
      dispatch(
        placeOrderAction({
          bag: bagState.bag,
          totalPrice: subTotal,
          shippingPrice: 200,
          ...shippingDetails,
        })
      );
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const steps = ["Shipping Info", "Confirm Order"];
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
        </div>
        {error && (
          <CustomSnack
            type="error"
            text={error}
            handleClose={() => dispatch({ type: PLACE_ORDER_RESET })}
          />
        )}
        {loading && <CustomSnack type="success" text="Placing... order" />}
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
              disabled={loading || activeStep === steps.length}
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
              disabled={activeStep === 0 || loading || order}
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
