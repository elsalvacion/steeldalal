import { AdminPanelSettings, Edit } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CustomHelmet from "../components/layout/CustomHelmet";
import OrderSummary from "../components/profile/OrderSummary";
import ProfileDetailContainer from "../components/profile/ProfileDetailContainer";
import {
  CREATE_BIZ_RESET,
  UPDATE_BIZ_RESET,
} from "../reducers/types/authTypes";
import { PLACE_ORDER_RESET } from "../reducers/types/orderTypes";
const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const history = useHistory();
  const dispatch = useDispatch();
  const { success: createBizSuccess } = useSelector((state) => state.createBiz);
  const { success: editBizSuccess } = useSelector((state) => state.editBiz);
  useEffect(() => {
    dispatch({ type: PLACE_ORDER_RESET });
    if (!userInfo) history.push(`/login?redirect=profile`);
    else {
      if (!userInfo.isVerified || userInfo.isVerified === 0)
        history.push("/verify-number");
    }
    if (createBizSuccess) {
      dispatch({ type: CREATE_BIZ_RESET });
    }
    if (editBizSuccess) {
      dispatch({ type: UPDATE_BIZ_RESET });
    }
  }, [userInfo, history, createBizSuccess, editBizSuccess, dispatch]);
  return (
    <Container>
      <CustomHelmet
        title={`Profile - ${userInfo.name || null}`}
        desc="Your Profile"
      />
      <br />
      <div className="ProfileDetailRightHeader">
        <Typography variant="h5" component="h5">
          Profile
        </Typography>
        {userInfo && userInfo.isAdmin === 1 && (
          <Button
            onClick={() => history.push("/admin-panel")}
            color="primary"
            variant="contained"
            startIcon={<AdminPanelSettings />}
          >
            Admin Panel
          </Button>
        )}
      </div>
      <br />
      {userInfo && <ProfileDetailContainer userInfo={userInfo} />}
      <OrderSummary />
      {userInfo && userInfo.yourBiz && (
        <Card sx={{ m: 2 }}>
          <CardContent>
            <div className="ProfileDetailRightHeader">
              <Typography variant="h6" component="h6">
                Business Credentails
              </Typography>
              <IconButton
                onClick={() => history.push("/edit-biz")}
                color="primary"
              >
                <Edit />
              </IconButton>
            </div>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card elevation={0}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 15 }}
                      color="text.primary"
                      gutterBottom
                    >
                      GST Certificate
                    </Typography>
                    <CardMedia
                      component="img"
                      height="194"
                      image={userInfo.yourBiz.gstCertificate}
                      alt="Steeldalal.com"
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card elevation={0}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 15 }}
                      color="text.primary"
                      gutterBottom
                    >
                      Pan Card
                    </Typography>
                    <CardMedia
                      component="img"
                      height="194"
                      image={userInfo.yourBiz.panCard}
                      alt="Steeldalal.com"
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card elevation={0}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 15 }}
                      color="text.primary"
                      gutterBottom
                    >
                      Aadhar Card
                    </Typography>
                    <CardMedia
                      component="img"
                      height="194"
                      image={userInfo.yourBiz.aadharCard}
                      alt="Steeldalal.com"
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card elevation={0}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 15 }}
                      color="text.primary"
                      gutterBottom
                    >
                      Cancelled Cheque
                    </Typography>
                    <CardMedia
                      component="img"
                      height="194"
                      image={userInfo.yourBiz.cancelledCheque}
                      alt="Steeldalal.com"
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ProfileScreen;
