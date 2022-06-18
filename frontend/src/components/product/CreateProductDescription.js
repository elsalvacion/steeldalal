import React from "react";
import "./CreateProductDescription.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateProductDescription = ({ handleDetails, values }) => {
  const handleChange = (value) => {
    handleDetails(value, "");
  };
  return (
    <div className="CreateProductDescriptionContainer">
      <ReactQuill value={values.details.html} onChange={handleChange} />
    </div>
  );
};

export default CreateProductDescription;
