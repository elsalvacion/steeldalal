import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_PRODUCT_RESET } from "../../reducers/types/productTypes";
import CustomAlert from "../layout/CustomAlert";
import "./CreateProductForm.css";
import CreateProductFormLeft from "./CreateProductFormLeft";
import CreateProductFormRight from "./CreateProductFormRight";

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const { error: createProductError, success } = useSelector(
    (state) => state.createProduct
  );
  return (
    <>
      {createProductError && (
        <CustomAlert
          type="error"
          text={createProductError}
          handleClose={() => dispatch({ type: CREATE_PRODUCT_RESET })}
        />
      )}
      {success && (
        <CustomAlert
          type="success"
          text="Product Create"
          handleClose={() => dispatch({ type: CREATE_PRODUCT_RESET })}
        />
      )}
      <div className="createProductFormContainer">
        <CreateProductFormLeft />
        <CreateProductFormRight />
      </div>
    </>
  );
};

export default CreateProductForm;
