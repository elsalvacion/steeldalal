import React, { useState } from "react";
import "./GoogleLoginBtn.css";
import { useGoogleLogin } from "@react-oauth/google";
import { Google } from "@mui/icons-material";
import CustomAlert from "../layout/CustomAlert";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../actions/authAction";
const GoogleLoginBtn = ({ text }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const handleSuccess = ({ access_token }) => {
    fetchUserProfile(access_token);
    setError(null);
  };
  const handleError = (err) => {
    console.log(err);
    setError("Google login not available at the moment.");
  };

  const LoginUI = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const fetchUserProfile = async (token) => {
    try {
      const { data } =
        await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}

      `);
      if (text === "login") {
        dispatch(
          loginUser({
            email: data.email,
            name: data.name,
            type: "google",
          })
        );
      } else {
        dispatch(
          registerUser({
            email: data.email,
            name: data.name,
            type: "google",
          })
        );
      }
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Google login not available at the moment.");
    }
  };
  return (
    <div className="googleLoginContainer">
      {error ? (
        <CustomAlert
          type="error"
          text={error}
          handleClose={() => setError(null)}
        />
      ) : (
        <button onClick={() => LoginUI()} className="googleLoginBtn">
          <Google /> <span>{text} with google</span>
        </button>
      )}
    </div>
  );
};

export default GoogleLoginBtn;
