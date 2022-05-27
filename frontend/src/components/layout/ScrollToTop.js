import React from "react";
import { Fab, useScrollTrigger, Zoom } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import "./ScrollToTop.css";

function ScrollToTop(props) {
  const { window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 300,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        className="scrollToTopContainer"
      >
        <Fab
          // className="scrollToTopFab"
          size="small"
          aria-label="scroll back to top"
          color="primary"
        >
          <KeyboardArrowUp />
        </Fab>
      </div>
    </Zoom>
  );
}

export default ScrollToTop;
