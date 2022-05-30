import React from "react";
import "./ProfileDetailContainer.css";
import ProfileDetailLeft from "./ProfileDetailLeft";
import ProfileDetailRight from "./ProfileDetailRight";

const ProfileDetailContainer = ({ userInfo }) => {
  return (
    <div className="profileDetailContainer">
      <div className="profileDetailLeft">
        <ProfileDetailLeft userInfo={userInfo} />
      </div>
      <div className="profileDetailRight">
        <ProfileDetailRight />
      </div>
    </div>
  );
};

export default ProfileDetailContainer;
