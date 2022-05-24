import React from "react";
import "./MobileSearch.css";
import Search from "./Search";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Fade, Zoom } from "react-reveal";

const MobileSearch = ({ handleClose }) => {
  return (
    <Fade>
      <div className="mobileSearchContainer">
        <div className="mobileSearchBarContainer">
          <Zoom>
            <div className="mobileSearchInputContainer">
              <Search />
            </div>
          </Zoom>
          <IconButton color="primary" onClick={handleClose}>
            <Close />
          </IconButton>
        </div>
      </div>
    </Fade>
  );
};

export default MobileSearch;
