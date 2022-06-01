import * as React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { Box, IconButton, Collapse, Alert } from "@mui/material";

const CustomAlert = ({ text, type, handleClose }) => {
  return (
    <Box sx={{ width: "100%", margin: "15px 0" }}>
      <Collapse in={true}>
        <Alert
          variant="filled"
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
