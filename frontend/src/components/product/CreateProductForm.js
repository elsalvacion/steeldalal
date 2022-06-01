import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProductAction } from "../../actions/productAction";
import { CREATE_PRODUCT_RESET } from "../../reducers/types/productTypes";
import CustomAlert from "../layout/CustomAlert";
import CreateProductDescription from "./CreateProductDescription";
import "./CreateProductForm.css";
import CreateProductFormLeft from "./CreateProductFormLeft";
import CreateProductFormRight from "./CreateProductFormRight";
const CreateProductForm = () => {
  const dispatch = useDispatch();
  const {
    error: createProductError,
    success,
    loading: createProductLoading,
  } = useSelector((state) => state.createProduct);
  const { images } = useSelector((state) => state.uploadProduct);
  const [values, setValues] = useState({
    title: "",
    type: "",
    category: "",
    brand: "",
    price: 0,
    qty: 1,
    details: "",
    discount: 0,
  });

  useEffect(() => {
    if (images)
      setValues({
        ...values,
        images,
      });
  }, [images]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleCreate = () => {
    dispatch(createProductAction(values));
  };
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
        <CreateProductFormRight handleChange={handleChange} values={values} />
        <CreateProductDescription
          handleDetails={(text) =>
            setValues({
              ...values,
              details: text,
            })
          }
        />
      </div>
      {!images && (
        <div>
          <small>Button will be enabled once you upload images</small>
        </div>
      )}
      {createProductLoading && (
        <div>
          <small>Creating... product</small>
        </div>
      )}
      <Button
        type="submit"
        disabled={!images || success}
        variant="contained"
        color="primary"
        onClick={handleCreate}
      >
        Create
      </Button>
    </>
  );
};

export default CreateProductForm;
