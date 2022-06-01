import React, { useState } from "react";
import "./GoogleLoginBtn.css";
import { useGoogleLogin } from "@react-oauth/google";
import { Google } from "@mui/icons-material";
import CustomAlert from "../layout/CustomAlert";

const GoogleLoginBtn = ({ text }) => {
  const [error, setError] = useState(null);

  const handleSuccess = (response) => {
    console.log(response);
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
