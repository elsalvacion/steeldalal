import { Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ProfileDetailContainer from "../components/profile/ProfileDetailContainer";
const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const history = useHistory();
  useEffect(() => {
    if (!userInfo) history.push(`/login?redirect=profile`);
  }, [userInfo, history]);
  return (
    <Container>
      <br />
      <Typography variant="h5" component="h5">
        Profile
      </Typography>
      <br />
      {userInfo && <ProfileDetailContainer userInfo={userInfo} />}
    </Container>
  );
};

export default ProfileScreen;
