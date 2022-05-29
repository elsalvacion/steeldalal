import React from "react";
import "./CreateProductForm.css";
// import CreateProductFormLeft from "./CreateProductFormLeft";
import CreateProductFormRight from "./CreateProductFormRight";

const CreateProductForm = () => {
  return (
    <div className="createProductFormContainer">
      {/* <CreateProductFormLeft /> */}
      <CreateProductFormRight />
    </div>
  );
};

export default CreateProductForm;
