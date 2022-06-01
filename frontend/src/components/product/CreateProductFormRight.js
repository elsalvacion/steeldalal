import React, { useEffect, useState } from "react";
import "./CreateProductFormRight.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryAction } from "../../actions/categoryAction";
import CustomAlert from "../layout/CustomAlert";
import { FETCH_CATEGORY_RESET } from "../../reducers/types/categoryTypes";
import { createProductAction } from "../../actions/productAction";
import { PRODUCT_UPLOAD_RESET } from "../../reducers/types/productTypes";

const CreateProductFormRight = () => {
  const dispatch = useDispatch();
  const { loading, categories, error } = useSelector(
    (state) => state.fetchCategories
  );
  const { images } = useSelector((state) => state.uploadProduct);
  const { loading: createProductLoading, success } = useSelector(
    (state) => state.createProduct
  );

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
    dispatch(fetchCategoryAction());
    if (images)
      setValues({
        ...values,
        images,
      });
  }, [dispatch, images]);

  const types = ["Cold Rolled", "Hot Rolled"];

  const handleChange = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProductAction(values));
  };

  return (
    <div className="createProductFormRight">
      <Typography>Fill Details</Typography>
      <br />
      {error && (
        <CustomAlert
          type="error"
          text={error}
          handleClose={() => {
            dispatch({ type: FETCH_CATEGORY_RESET });
            dispatch({ type: PRODUCT_UPLOAD_RESET });
          }}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="createProductFormTitle">
          <label htmlFor="createProductFormTitle">Title</label>
          <input
            name="title"
            id="createProductFormTitle"
            onChange={handleChange}
            value={values.title}
            type="text"
            placeholder="Enter title"
          />
        </div>
        <div className="createProductFormTypeAndContainer">
          <div className="createProductFormType">
            <label htmlFor="createProductFormType">Type</label>

            <select
              onChange={handleChange}
              name="type"
              id="createProductFormType"
              value={values.type}
            >
              <option value="">Choose Type</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="createProductFormBrand">
            <label htmlFor="createProductFormBrand">Brand</label>
            <input
              name="brand"
              id="createProductFormBrand"
              value={values.brand}
              type="text"
              onChange={handleChange}
              placeholder="Enter Brand"
            />
          </div>
        </div>
        <div className="createProductFormCategory">
          <label htmlFor="createProductFormCategory">Category</label>
          <select
            onChange={handleChange}
            name="category"
            id="createProductFormCategory"
            value={values.category}
          >
            <option value="">Choose Category</option>
            {loading ? (
              <p>loading...</p>
            ) : categories ? (
              categories.map((category) => (
                <option key={category.title} value={category.title}>
                  {category.title}
                </option>
              ))
            ) : null}
          </select>
        </div>

        <div className="createProductFormPrices">
          {/* price */}
          <div className="createProductFormPrice">
            <label htmlFor="createProductFormPrice">Price</label>
            <input
              name="price"
              id="createProductFormPrice"
              value={values.price}
              type="number"
              onChange={handleChange}
              placeholder="Enter Price"
            />
          </div>

          {/* qty */}
          <div className="createProductFormQty">
            <label htmlFor="createProductFormQty">Quantity</label>
            <input
              name="qty"
              id="createProductFormQty"
              value={values.qty}
              type="number"
              onChange={handleChange}
              placeholder="Enter Quantity"
            />
          </div>

          {/* discount */}
          <div className="createProductFormDiscount">
            <label htmlFor="createProductFormDiscount">Discount(%)</label>
            <input
              name="discount"
              id="createProductFormDiscount"
              value={values.discount}
              type="number"
              onChange={handleChange}
              placeholder="Enter Discount"
            />
          </div>
        </div>

        <div className="createProductFormDetails">
          <label htmlFor="createProductFormDetails">Description</label>
          <textarea
            name="details"
            id="createProductForm"
            onChange={handleChange}
          ></textarea>
        </div>
        <br />
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
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateProductFormRight;
