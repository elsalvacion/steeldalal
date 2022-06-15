import { ChevronLeftOutlined, ChevronRightOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBagAction } from "../actions/cartAction";
import ShippingDetails from "../components/checkout/ShippingDetails";
const ChecoutScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.userLogin);
  // const { loading, bag, keys, error } = useSelector((state) => state.getBag);
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
  return (
    <Container>
      <Card sx={{ my: 5 }}>
        <CardContent>
          <Stepper orientation="vertical" activeStep={activeStep}>
            <Step>
              <StepLabel>Shipping Details</StepLabel>
              <StepContent>
                <ShippingDetails
                  shippingDetails={
                    shippingDetails ? shippingDetails : userInfo ? userInfo : {}
                  }
                />

                <Box sx={{ mb: 2, mt: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                      endIcon={<ChevronRightOutlined />}
                    >
                      Continue
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>

            <Step>
              <StepLabel>Order Summary</StepLabel>
              <StepContent>
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
                      color="success"
                      sx={{ mt: 1, mr: 1 }}
                      endIcon={<ChevronRightOutlined />}
                    >
                      Place Order
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>

            <Step>
              <StepLabel>Payment</StepLabel>
              <StepContent>
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
                    >
                      Confirm Order
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          </Stepper>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ChecoutScreen;
