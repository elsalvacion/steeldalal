import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BlogWriter from "react-blog-writer";
import "./CreateProductDescription.css";

const CreateProductDescription = ({ handleDetails }) => {
  return (
    <div className="CreateProductDescriptionContainer">
      <Typography>Description</Typography>
      <BlogWriter
        finalNodes={(value) => handleDetails(value)}
        placeHolder={"Type here..."}
      />
    </div>
  );
};

export default CreateProductDescription;
