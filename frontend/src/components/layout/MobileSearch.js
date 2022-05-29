import React from "react";
import "./MobileSearch.css";
import Search from "./Search";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
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
