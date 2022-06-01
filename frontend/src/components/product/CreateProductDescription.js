import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BlogWriter from "react-blog-writer";
import "./CreateProductDescription.css";

const CreateProductDescription = ({}) => {
  let [nodes, setNodes] = useState(null);
  useEffect(() => {
    handleDetails(nodes);
  }, [nodes]);
  return (
    <div className="CreateProductDescriptionContainer">
      <Typography>Description</Typography>
      <BlogWriter finalNodes={setNodes} placeHolder={"Type here..."} />
    </div>
  );
};

export default CreateProductDescription;
