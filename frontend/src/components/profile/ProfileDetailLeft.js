import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./ProfileDetailLeft.css";
import {
  Edit,
  Email,
  HomeWork,
  OtherHouses,
  Person,
  Villa,
  WhatsApp,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USER_RESET } from "../../reducers/types/authTypes";
import { editUser } from "../../actions/authAction";
import CustomAlert from "../layout/CustomAlert";
import Autocomplete from "@mui/material/Autocomplete";
import { getCities, states } from "../../constants/cities";
const ProfileDetailLeft = ({ userInfo, editUserInfo, setEditUserInfo }) => {
  const [values, setValues] = useState(userInfo);
  const { loading, success, error } = useSelector((state) => state.editUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      setValues(userInfo);
      setEditUserInfo(false);
      dispatch({ type: UPDATE_USER_RESET });
    }
    // eslint-disable-next-line
  }, [success, dispatch, userInfo]);
  const handleChange = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  return (
    <div>
      <div className="ProfileDetailLeftHeader">
        <Typography variant="h6" component="h6">
          Personal Info
        </Typography>
        {!editUserInfo ? (
          <IconButton
            color="primary"
            onClick={() => setEditUserInfo(!editUserInfo)}
          >
            <Edit />
          </IconButton>
        ) : (
          <Button
            color="primary"
            onClick={() => setEditUserInfo(!editUserInfo)}
          >
            Close
          </Button>
        )}
      </div>
      {error && (
        <CustomAlert
          type="error"
          text={error}
          handleClose={() => dispatch({ type: UPDATE_USER_RESET })}
        />
      )}
      <br />
      <List>
        <ListItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText>
            {editUserInfo ? (
              <TextField
                onChange={handleChange}
                variant="outlined"
                sx={{
                  width: "100%",
                  height: "100%",
                }}
                type="text"
                name="name"
                label="Name"
                value={values.name}
              />
            ) : (
              userInfo.name
            )}
          </ListItemText>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <Email />
          </ListItemIcon>
          <ListItemText>
            {editUserInfo ? (
              <TextField
                onChange={handleChange}
                variant="outlined"
                sx={{
                  width: "100%",
                  height: "100%",
                }}
                type="text"
                name="email"
                value={values.email}
                label="Email"
              />
            ) : (
              userInfo.email
            )}
          </ListItemText>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <WhatsApp />
          </ListItemIcon>
          <ListItemText>
            {editUserInfo ? (
              <TextField
                onChange={handleChange}
                variant="outlined"
                sx={{
                  width: "100%",
                  height: "100%",
                }}
                type="text"
                name="phone"
                value={values.phone}
                label="Whatsapp Number"
              />
            ) : (
              userInfo.phone
            )}
          </ListItemText>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <HomeWork />
          </ListItemIcon>
          <ListItemText>
            {editUserInfo ? (
              <Autocomplete
                value={values.state}
                disablePortal
                sx={{
                  width: "100%",
                  height: "100%",
                }}
                options={states}
                inputValue={values.state}
                onInputChange={(event, newInputValue) => {
                  setValues({
                    ...values,
                    state: newInputValue,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="State" />
                )}
              />
            ) : (
              userInfo.state
            )}
          </ListItemText>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <Villa />
          </ListItemIcon>
          <ListItemText>
            {editUserInfo ? (
              <Autocomplete
                value={values.city}
                disablePortal
                sx={{
                  width: "100%",
                  height: "100%",
                }}
                id="your-city"
                options={getCities(values.state)}
                inputValue={values.city}
                onInputChange={(event, newInputValue) => {
                  setValues({
                    ...values,
                    city: newInputValue,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      fontSize: "14px",
                      padding: "5px",
                    }}
                    {...params}
                    label="City"
                  />
                )}
              />
            ) : (
              userInfo.city
            )}
          </ListItemText>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <OtherHouses />
          </ListItemIcon>
          <ListItemText>
            {editUserInfo ? (
              <TextField
                onChange={handleChange}
                variant="outlined"
                sx={{
                  width: "100%",
                  height: "100%",
                }}
                type="text"
                name="phone"
                value={values.address}
                label="Address"
              />
            ) : (
              userInfo.address
            )}
          </ListItemText>
        </ListItem>
      </List>
      {editUserInfo && (
        <>
          <br />
          <Button
            onClick={() => dispatch(editUser(values))}
            disabled={loading}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
          <br />
        </>
      )}
    </div>
  );
};

export default ProfileDetailLeft;
