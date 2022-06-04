import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./ProfileDetailLeft.css";
import {
  Edit,
  Email,
  HomeWork,
  LocalPhone,
  OtherHouses,
  Person,
  Villa,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USER_RESET } from "../../reducers/types/authTypes";
import { editUser } from "../../actions/authAction";
import CustomAlert from "../layout/CustomAlert";
const ProfileDetailLeft = ({ userInfo }) => {
  const [editUserInfo, setEditUserInfo] = useState(false);
  const [values, setValues] = useState(userInfo);
  const { loading, success, error } = useSelector((state) => state.editUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      setValues(userInfo);
      setEditUserInfo(false);
      dispatch({ type: UPDATE_USER_RESET });
    }
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
              <input
                onChange={handleChange}
                className="userEditInfoInput"
                type="text"
                value={values.name}
                name="name"
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
              <input
                onChange={handleChange}
                className="userEditInfoInput"
                type="text"
                value={values.email}
                name="email"
              />
            ) : (
              userInfo.email
            )}
          </ListItemText>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <LocalPhone />
          </ListItemIcon>
          <ListItemText>
            {editUserInfo ? (
              <input
                onChange={handleChange}
                className="userEditInfoInput"
                type="text"
                name="phone"
                value={values.phone}
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
              <input
                onChange={handleChange}
                className="userEditInfoInput"
                type="text"
                name="state"
                value={values.state}
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
              <input
                onChange={handleChange}
                className="userEditInfoInput"
                type="text"
                name="city"
                value={values.city}
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
              <input
                onChange={handleChange}
                className="userEditInfoInput"
                name="address"
                type="text"
                value={values.address}
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
