import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, IconButton, Collapse } from "@mui/material";

const CustomAlert = ({ text, type, handleClose }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={true}>
        <Alert
          severity={type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {text}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default CustomAlert;
