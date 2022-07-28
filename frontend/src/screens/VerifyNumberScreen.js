import { Phone, Send } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { verifyPhoneAction } from "../actions/authAction";
import CustomHelmet from "../components/layout/CustomHelmet";
import CustomSnack from "../components/layout/CustomSnack";
import {
  CONFIRM_OTP_RESET,
  VARIFY_PHONE_RESET,
} from "../reducers/types/authTypes";
const VerifyNumberScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, success, error } = useSelector((state) => state.verifyPhone);
  const {
    loading: confirmOtpLoading,
    success: confirmOtpSuccess,
    error: confirmOtpError,
  } = useSelector((state) => state.confirmOtp);
  const history = useHistory();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [opt, setOpt] = useState("");
  useEffect(() => {
    if (!userInfo) history.push(`/login?redirect=verify-number`);

    if (success) {
      setPhone("");
    }
    if (confirmOtpSuccess) history.push("/profile");
  }, [userInfo, history, success, confirmOtpSuccess]);

  const handleVerify = (e) => {
    e.preventDefault();
    // const indianNumRegex =
    //   /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;

    if (!success) {
      dispatch(verifyPhoneAction(phone));
    } else {
      dispatch(verifyPhoneAction(opt, true));
    }
  };

  return (
    <Container>
      <CustomHelmet
        title={`Verify whatsapp number`}
        desc="Steeldalal.com verify your whatsapp number"
      />
      {(loading || confirmOtpLoading) && (
        <CustomSnack
          type="success"
          text={loading ? "Sending... OTP" : "Confirming... OTP"}
        />
      )}
      {(error || confirmOtpError) && (
        <CustomSnack
          type="error"
          text={error || confirmOtpError}
          handleClose={() =>
            dispatch({ type: error ? VARIFY_PHONE_RESET : CONFIRM_OTP_RESET })
          }
        />
      )}

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography sx={{ my: 3, display: "flex", alignItems: "center" }}>
            Verify your phone <Phone sx={{ mx: 1 }} color="success" />
            number
          </Typography>
          <form onSubmit={handleVerify}>
            <TextField
              onChange={(e) =>
                success
                  ? setOpt(e.target.value.trim())
                  : setPhone(e.target.value.trim())
              }
              variant="outlined"
              sx={{
                width: "100%",
                height: "100%",
                my: 1,
              }}
              type="text"
              name="phone"
              value={success ? opt : phone}
              label={success ? "Enter OTP" : "Enter mobile Number"}
              disabled={loading}
            />
            <small
              style={{
                display: "block",
                marginBottom: 10,
                color: success ? "green" : "black",
              }}
            >
              {success
                ? "An 4 digit OTP is sent to your phone number"
                : "Format: +917412900222"}
            </small>

            <Button
              onClick={handleVerify}
              type="submit"
              variant="contained"
              endIcon={<Send />}
              color="success"
              disabled={loading || confirmOtpLoading}
            >
              {success ? "Verify OTP" : "Send OTP"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default VerifyNumberScreen;
