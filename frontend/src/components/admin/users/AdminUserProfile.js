import {
  AdminPanelSettings,
  ChevronLeftOutlined,
  Verified,
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
import React, { useEffect } from "react";
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
import CustomSnack from "../../layout/CustomSnack";
import "./AdminUserProfile.css";

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
  return (
    <Container sx={{ py: 3 }}>
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
                    Make Admin
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
                    Un Admin
                  </Button>
                )}
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
            <Card sx={{ m: 2 }}>
              <CardContent>
                <div className="ProfileDetailRightHeader">
                  <Typography variant="h6" component="h6">
                    Business Credentails
                  </Typography>
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
          )}
        </>
      )}
    </Container>
  );
};

export default AdminUserProfile;
