import React, { useState } from "react";
import "./GoogleLoginBtn.css";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";

const GoogleLoginBtn = ({ text }) => {
  const [error, setError] = useState(null);
  const handleSuccess = (response) => {
    setError(null);
    console.log(response);
  };
  const handleError = () => {
    setError(
      "Google login not available at the moment. Try other login methods"
    );
  };
  const LoginUI = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return (
    <div className="googleLoginContainer">
      <button onClick={() => LoginUI()} className="googleLoginBtn">
        <FaGoogle fontSize={20} /> <span>{text} with google</span>
      </button>
      {error && <small className="googleLoginError">{error}</small>}
    </div>
  );
};

export default GoogleLoginBtn;
