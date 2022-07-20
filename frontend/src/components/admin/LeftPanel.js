import React, { useState } from "react";
import "./LeftPanel.css";
import { Divider, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Fade } from "react-reveal";
const LeftPanel = ({ handleCurrent, adminLinks }) => {
  const [showOnlyIcon, setShowOnlyIcon] = useState(true);
  return (
    <div
      style={{
        width: !showOnlyIcon ? "300px" : "fit-content",
        background: " #1565c0",
        padding: "10px 0",
        height: "100%",
      }}
    >
      <div className="LeftPanelTopHeader">
        {!showOnlyIcon && (
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#fff",
              justifyContent: "center",
            }}
            variant="h6"
          >
            Admin Panel
          </Typography>
        )}
        <button onClick={() => setShowOnlyIcon(!showOnlyIcon)}>
          <Menu fontSize="large" />
        </button>
      </div>
      <Divider sx={{ background: "#f3f3f3" }} />
      {adminLinks.map((link) => (
        <button
          onClick={() => handleCurrent(link.id)}
          key={`admin-link-${link.id}`}
          className="leftPanelButton"
          style={{
            justifyContent: !showOnlyIcon ? "flex-start" : "center",
          }}
        >
          {link.icon}{" "}
          <Fade>
            <Typography>{!showOnlyIcon && link.title}</Typography>
          </Fade>
        </button>
      ))}
    </div>
  );
};

export default LeftPanel;
