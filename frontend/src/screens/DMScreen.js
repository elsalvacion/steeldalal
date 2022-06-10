import { Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DmContent from "../components/dm/DmContent";

const DMScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push(`/login?redirect=dm`);
    }
  }, [userInfo, history]);
  return (
    <Container>
      {userInfo && (
        <>
          <Typography
            sx={{
              mt: 2,
            }}
            variant="h6"
          >
            Your DM
          </Typography>
          <DmContent userInfo={userInfo} />
        </>
      )}
    </Container>
  );
};

export default DMScreen;
