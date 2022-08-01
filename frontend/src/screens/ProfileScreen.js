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

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CustomHelmet from "../components/layout/CustomHelmet";
import OrderSummary from "../components/profile/OrderSummary";
import ProfileDetailContainer from "../components/profile/ProfileDetailContainer";
import ViewImage from "../components/profile/ViewImage";
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
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
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
        <>
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
                        sx={{ cursor: "pointer" }}
                        onClick={() => openImageViewer(0)}
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
                        sx={{ cursor: "pointer" }}
                        onClick={() => openImageViewer(1)}
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
                        sx={{ cursor: "pointer" }}
                        onClick={() => openImageViewer(2)}
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
                        sx={{ cursor: "pointer" }}
                        onClick={() => openImageViewer(3)}
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
          <ViewImage
            isViewerOpen={isViewerOpen}
            closeImageViewer={closeImageViewer}
            currentImage={currentImage}
            images={[
              userInfo.yourBiz.gstCertificate,
              userInfo.yourBiz.panCard,
              userInfo.yourBiz.aadharCard,
              userInfo.yourBiz.cancelledCheque,
            ]}
          />
        </>
      )}
    </Container>
  );
};

export default ProfileScreen;
