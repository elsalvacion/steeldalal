import { Snackbar, Alert } from "@mui/material";
import React from "react";

const CustomSnack = ({ type, text, handleClose }) => {
  return (
    <Snackbar
      open={true}
      autoHideDuration={type === "error" ? 30000 : 5000}
      onClose={handleClose}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={type}
        sx={{ width: "100%" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnack;
