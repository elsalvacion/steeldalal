import { Edit } from "@mui/icons-material";
import {
  Autocomplete,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import "./ShippingDetails.css";
import { states, getCities } from "../../constants/cities";

const ShippingDetails = ({ shippingDetails }) => {
  const [shippingInfo, setShippingInfo] = useState(shippingDetails);
  const [editUserInfo, setEditUserInfo] = useState(false);

  const handleChange = (e) =>
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  return (
    <div className="shippingDetailsContainer">
      <div className="shippingDetailsHeader">
        <div></div>
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
      <List>
        <ListItem>
          {!editUserInfo && <ListItemIcon sx={{ mr: 2 }}>Name:</ListItemIcon>}
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
                label="Name"
                value={shippingInfo.name}
              />
            ) : (
              shippingDetails.name
            )}
          </ListItemText>
        </ListItem>

        <ListItem>
          {!editUserInfo && <ListItemIcon sx={{ mr: 2 }}>Email:</ListItemIcon>}
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
                value={shippingInfo.email}
                label="Email"
              />
            ) : (
              shippingDetails.email
            )}
          </ListItemText>
        </ListItem>

        <ListItem>
          {!editUserInfo && <ListItemIcon sx={{ mr: 2 }}>Phone:</ListItemIcon>}
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
                value={shippingInfo.phone}
                label="Phone"
              />
            ) : (
              shippingDetails.phone
            )}
          </ListItemText>
        </ListItem>

        <ListItem>
          {!editUserInfo && <ListItemIcon sx={{ mr: 2 }}>State:</ListItemIcon>}
          <ListItemText>
            {editUserInfo ? (
              <Autocomplete
                value={shippingInfo.state}
                disablePortal
                sx={{
                  width: "100%",
                  height: "100%",
                }}
                options={states}
                inputValue={shippingInfo.state}
                onInputChange={(event, newInputValue) => {
                  setShippingInfo({
                    ...shippingInfo,
                    state: newInputValue,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="State" />
                )}
              />
            ) : (
              shippingDetails.state
            )}
          </ListItemText>
        </ListItem>

        <ListItem>
          {!editUserInfo && <ListItemIcon sx={{ mr: 2 }}>City:</ListItemIcon>}
          <ListItemText>
            {editUserInfo ? (
              <Autocomplete
                value={shippingInfo.city}
                disablePortal
                sx={{
                  width: "100%",
                  height: "100%",
                }}
                id="your-city"
                options={getCities(shippingInfo.state)}
                inputValue={shippingInfo.city}
                onInputChange={(event, newInputValue) => {
                  setShippingInfo({
                    ...shippingInfo,
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
              shippingDetails.city
            )}
          </ListItemText>
        </ListItem>

        <ListItem>
          {!editUserInfo && (
            <ListItemIcon sx={{ mr: 2 }}>Address:</ListItemIcon>
          )}
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
                value={shippingInfo.address}
                label="Address"
              />
            ) : (
              shippingDetails.address
            )}
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );
};

export default ShippingDetails;
