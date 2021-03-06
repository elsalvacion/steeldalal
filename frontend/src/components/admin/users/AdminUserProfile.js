import {
  AdminPanelSettings,
  ChevronLeftOutlined,
  Verified,
  WorkspacePremium,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  fetchAdminUserAction,
  updateAdminUserAction,
} from "../../../actions/adminAction";
import {
  FETCH_ADMIN_USER_RESET,
  UPDATE_ADMIN_USER_RESET,
} from "../../../reducers/types/adminTypes";
import CustomHelmet from "../../layout/CustomHelmet";
import CustomSnack from "../../layout/CustomSnack";
import "./AdminUserProfile.css";
import ViewImage from "../../profile/ViewImage";
const AdminUserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, user } = useSelector((state) => state.adminUser);
  const {
    loading: updateLoading,
    error: updateError,
    success,
  } = useSelector((state) => state.adminUserUpdate);
  useEffect(() => {
    if (!userInfo || userInfo.isAdmin === 0)
      history.push(`/login?redirect=admin-user/${id}`);
    else {
      dispatch(fetchAdminUserAction(id));
    }
  }, [id, userInfo, history, dispatch, success]);
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
    <Container sx={{ py: 3 }}>
      <CustomHelmet title="User Profile" desc="Steeldalal user  profile" />
      {(error || updateError) && (
        <CustomSnack
          type="error"
          text={error || updateError}
          handleClose={() => {
            dispatch({ type: FETCH_ADMIN_USER_RESET });
            dispatch({ type: UPDATE_ADMIN_USER_RESET });
          }}
        />
      )}
      {(loading || updateLoading) && (
        <CustomSnack
          type="success"
          text={loading ? "loading..." : "updating..."}
        />
      )}
      {success && (
        <CustomSnack
          type="success"
          text="Profile Updated"
          handleClose={() => dispatch({ type: UPDATE_ADMIN_USER_RESET })}
        />
      )}

      {user && (
        <>
          <Card sx={{ my: 2 }}>
            <CardContent>
              <div className="ProfileDetailLeftHeader">
                <Button
                  startIcon={<ChevronLeftOutlined />}
                  onClick={() => history.push("/admin-panel")}
                >
                  Back
                </Button>
                <div>
                  {user.isAdmin === 0 && (
                    <Button
                      disabled={updateLoading}
                      endIcon={<AdminPanelSettings />}
                      variant="contained"
                      sx={{ mx: 1, my: 1 }}
                      onClick={() =>
                        dispatch(
                          updateAdminUserAction(id, {
                            isAdmin: 1,
                          })
                        )
                      }
                    >
                      Mark as admin
                    </Button>
                  )}

                  {user.isAdmin === 1 && (
                    <Button
                      disabled={updateLoading}
                      endIcon={<AdminPanelSettings />}
                      variant="contained"
                      sx={{ mx: 1, my: 1 }}
                      onClick={() =>
                        dispatch(
                          updateAdminUserAction(id, {
                            isAdmin: 0,
                          })
                        )
                      }
                    >
                      Un-Mark As Admin
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography sx={{ mb: 2 }} variant="h6">
                    Status
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon sx={{ mr: 2 }}>
                        <b>Seller</b>
                      </ListItemIcon>
                      <ListItemText sx={{ textAlign: "left" }}>
                        <Chip
                          label={
                            user.isSeller === 1 ? "Is Seller" : "Not Seller"
                          }
                          color={user.isSeller === 0 ? "error" : "success"}
                        />
                      </ListItemText>
                    </ListItem>

                    <ListItem>
                      <ListItemIcon sx={{ mr: 2 }}>
                        <b>Mobile No.</b>
                      </ListItemIcon>
                      <ListItemText>
                        <Chip
                          label={
                            user.isVerified === 1
                              ? "Is Verified"
                              : "Not Verified"
                          }
                          color={user.isVerified === 0 ? "warning" : "success"}
                        />
                      </ListItemText>
                    </ListItem>

                    <ListItem>
                      <ListItemIcon sx={{ mr: 2 }}>
                        <b>Admin</b>
                      </ListItemIcon>
                      <ListItemText>
                        <Chip
                          label={user.isAdmin === 1 ? "Is Admin" : "Not Admin"}
                          color={user.isAdmin === 0 ? "warning" : "success"}
                        />
                      </ListItemText>
                    </ListItem>

                    <ListItem>
                      <ListItemIcon sx={{ mr: 2 }}>
                        <b>Premium</b>
                      </ListItemIcon>
                      <ListItemText>
                        <Chip
                          label={
                            user.isPremium === 1 ? "Is Premium" : "Not Premium"
                          }
                          color={user.isPremium === 0 ? "warning" : "success"}
                        />
                      </ListItemText>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6">Personal Details</Typography>
                  <List>
                    {["name", "state", "city", "address", "phone"].map(
                      (detailKey) => (
                        <ListItem key={detailKey}>
                          <ListItemIcon
                            sx={{ mr: 2, textTransform: "capitalize" }}
                          >
                            <b>{detailKey}</b>
                          </ListItemIcon>
                          <ListItemText>{user[detailKey]}</ListItemText>
                        </ListItem>
                      )
                    )}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {user.yourBiz && (
            <>
              <Card sx={{ my: 2 }}>
                <CardContent>
                  <div className="ProfileDetailRightHeader">
                    <Typography variant="h6" component="h6">
                      Business Credentails
                    </Typography>
                    <div>
                      {user.yourBiz.isVerified === 0 && (
                        <Button
                          disabled={updateLoading}
                          endIcon={<Verified />}
                          variant="contained"
                          sx={{ mx: 1, my: 1 }}
                          onClick={() =>
                            dispatch(
                              updateAdminUserAction(id, {
                                yourBiz: {
                                  isVerified: 1,
                                },
                              })
                            )
                          }
                        >
                          Verify Seller
                        </Button>
                      )}

                      {user.yourBiz.isVerified === 1 && (
                        <Button
                          disabled={updateLoading}
                          endIcon={<Verified />}
                          variant="contained"
                          sx={{ mx: 1, my: 1 }}
                          onClick={() =>
                            dispatch(
                              updateAdminUserAction(id, {
                                yourBiz: {
                                  isVerified: 0,
                                },
                              })
                            )
                          }
                        >
                          Un-Verify Seller
                        </Button>
                      )}
                      {user.isPremium === 0 && (
                        <Button
                          disabled={updateLoading}
                          endIcon={<WorkspacePremium />}
                          variant="contained"
                          sx={{ mx: 1, my: 1 }}
                          onClick={() =>
                            dispatch(
                              updateAdminUserAction(id, {
                                isPremium: 1,
                              })
                            )
                          }
                        >
                          Mark As Premium
                        </Button>
                      )}

                      {user.isPremium === 1 && (
                        <Button
                          disabled={updateLoading}
                          endIcon={<WorkspacePremium />}
                          variant="contained"
                          sx={{ mx: 1, my: 1 }}
                          onClick={() =>
                            dispatch(
                              updateAdminUserAction(id, {
                                isPremium: 0,
                              })
                            )
                          }
                        >
                          Un-Mark As Premium
                        </Button>
                      )}
                    </div>
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
                            image={user.yourBiz.gstCertificate}
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
                            image={user.yourBiz.panCard}
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
                            image={user.yourBiz.aadharCard}
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
                            image={user.yourBiz.cancelledCheque}
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
                  user.yourBiz.gstCertificate,
                  user.yourBiz.panCard,
                  user.yourBiz.aadharCard,
                  user.yourBiz.cancelledCheque,
                ]}
              />
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default AdminUserProfile;
