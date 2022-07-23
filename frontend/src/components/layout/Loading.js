import { Typography } from "@mui/material";
import React from "react";
import "./Loading.css";
const Loading = ({ text }) => {
  return (
    <div className="loadingContainer">
      <Typography sx={{ mb: 3 }} variant="h6">
        {text}
      </Typography>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
