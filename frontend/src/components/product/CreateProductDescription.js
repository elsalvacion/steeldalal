import React from "react";
import BlogWriter from "react-blog-writer";
import "./CreateProductDescription.css";

const CreateProductDescription = ({ handleDetails }) => {
  return (
    <div className="CreateProductDescriptionContainer">
      <BlogWriter
        finalNodes={(value) => handleDetails(value)}
        placeHolder={"Type here..."}
      />
    </div>
  );
};

export default CreateProductDescription;
