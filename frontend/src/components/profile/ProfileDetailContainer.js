import { Card, CardContent } from "@material-ui/core";
import React from "react";
import "./ProfileDetailContainer.css";
import ProfileDetailLeft from "./ProfileDetailLeft";
import ProfileDetailRight from "./ProfileDetailRight";

const ProfileDetailContainer = ({ userInfo }) => {
  return (
    <div className="profileDetailContainer">
      <div className="profileDetailLeft">
        <Card sx={{ width: "100%", height: "100%" }} elevation={1}>
          <CardContent>
            <ProfileDetailLeft userInfo={userInfo} />
          </CardContent>
        </Card>
      </div>
      <div className="profileDetailRight">
        <Card sx={{ width: "100%", height: "100%" }} elevation={1}>
          <CardContent>
            <ProfileDetailRight />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileDetailContainer;
