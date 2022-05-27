import React from "react";
import { SwipeableDrawer, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { navLink } from "../../constants/links";
import "./SideDrawer.css";
import { HashLink } from "react-router-hash-link";

const SideDrawer = (props) => {
  return (
    <SwipeableDrawer
      anchor="left"
      variant="temporary"
      open={props.openSideNav}
      onClose={props.onCloseHandler}
    >
      <Box
        sx={{
          width: 250,
          display: "flex",
          flexDirection: "column",
          padding: "10px 3px",
        }}
        role="presentation"
      >
        {navLink.map((link) =>
          link.path.includes("#") === -1 ? (
            <Link className="mobileNavLink" key={link.title} to={link.path}>
              {link.title}
            </Link>
          ) : (
            <HashLink className="mobileNavLink" key={link.title} to={link.path}>
              {link.title}
            </HashLink>
          )
        )}
      </Box>
    </SwipeableDrawer>
  );
};

export default SideDrawer;
