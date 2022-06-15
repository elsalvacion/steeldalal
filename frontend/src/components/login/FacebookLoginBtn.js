import React from "react";
import "./FacebookLoginBtn.css";
import FacebookLogin from "react-facebook-login";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../actions/authAction";
const FacebookLoginBtn = ({ text }) => {
  const dispatch = useDispatch();
  const responseFacebook = ({ name, userID }) => {
    if (text === "login") {
      dispatch(
        loginUser({
          id: userID,
          type: "facebook",
        })
      );
    } else {
      dispatch(
        registerUser({
          id: userID,
          email: "",
          name,
          type: "facebook",
        })
      );
    }
  };
  return (
    <div className="facebookLoginContainer">
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_LOGIN}
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="facebookLoginBtn"
        textButton={`${text} with facebook`}
        icon={<FacebookIcon className="facebookLoginIcon" />}
      />
    </div>
  );
};

export default FacebookLoginBtn;
