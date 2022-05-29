import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import "./ProfileDetailRight.css";
import { Add } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { ChevronRightOutlined } from "@mui/icons-material";

const ProfileDetailRight = () => {
  const history = useHistory();
  return (
    <div>
      <div className="ProfileDetailRightHeader">
        <Typography variant="h6" component="h6">
          Recent Products
        </Typography>
        <IconButton
          onClick={() => history.push("/create-product")}
          color="primary"
        >
          <Add />
        </IconButton>
      </div>
      <br />
      <List>
        <ListItem>
          <ListItemText></ListItemText>
        </ListItem>

        <ListItem>
          <ListItemText></ListItemText>
        </ListItem>

        <ListItem>
          <ListItemText></ListItemText>
        </ListItem>

        <ListItem>
          <ListItemText></ListItemText>
        </ListItem>
      </List>

      <br />
      <Button
        endIcon={<ChevronRightOutlined />}
        variant="contained"
        color="primary"
      >
        Manage Products
      </Button>
    </div>
  );
};

export default ProfileDetailRight;
