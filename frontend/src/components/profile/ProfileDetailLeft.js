import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProfileDetailLeft.css";
import {
  Edit,
  Email,
  LocalPhone,
  LocationCity,
  Person,
} from "@mui/icons-material";
const ProfileDetailLeft = ({ userInfo }) => {
  return (
    <div>
      <div className="ProfileDetailLeftHeader">
        <Typography variant="h6" component="h6">
          Personal Info
        </Typography>
        <IconButton color="primary">
          <Edit />
        </IconButton>
      </div>
      <br />
      <List>
        <ListItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText>{userInfo.name}</ListItemText>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <Email />
          </ListItemIcon>
          <ListItemText>{userInfo.email}</ListItemText>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <LocalPhone />
          </ListItemIcon>
          <ListItemText>+664646464684</ListItemText>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <LocationCity />
          </ListItemIcon>
          <ListItemText>IUT,Dhaka.</ListItemText>
        </ListItem>
      </List>
    </div>
  );
};

export default ProfileDetailLeft;
