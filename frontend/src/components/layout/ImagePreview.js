import { Edit } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import React from "react";
import "./ImagePreview.css";
const ImagePreview = ({ file, handleEdit, title }) => {
  return (
    <div className="imagePreviewContainer">
      <Typography>{title}</Typography>
      <img
        className="imagePreview"
        src={URL.createObjectURL(file)}
        alt="steeldalal.com"
      />
      <IconButton color="primary" onClick={handleEdit}>
        <Edit />
      </IconButton>
    </div>
  );
};

export default ImagePreview;
