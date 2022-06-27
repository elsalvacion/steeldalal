import { Business } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CustomHelmet from "../components/layout/CustomHelmet";
import ProfileDetailContainer from "../components/profile/ProfileDetailContainer";
import {
  CREATE_BIZ_RESET,
  UPDATE_BIZ_RESET,
} from "../reducers/types/authTypes";
const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const history = useHistory();
  const dispatch = useDispatch();
  const { success: createBizSuccess } = useSelector((state) => state.createBiz);
  const { success: editBizSuccess } = useSelector((state) => state.createBiz);
  useEffect(() => {
    if (!userInfo) history.push(`/login?redirect=profile`);
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
      <Typography variant="h5" component="h5">
        Profile
      </Typography>
      <br />
      {userInfo && <ProfileDetailContainer userInfo={userInfo} />}
      {userInfo && userInfo.yourBiz && (
        <Card sx={{ m: 2 }}>
          <CardContent>
            <Typography sx={{ mb: 3 }} variant="h6" component="h6">
              Business Details
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Business />
                </ListItemIcon>
                <ListItemText>{userInfo.yourBiz.name}</ListItemText>
              </ListItem>
            </List>
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
