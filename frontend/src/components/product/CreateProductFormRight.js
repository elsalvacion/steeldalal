import React, { useEffect, useState } from "react";
import "./CreateProductFormRight.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryAction } from "../../actions/categoryAction";
import CustomAlert from "../layout/CustomAlert";
import { FETCH_CATEGORY_RESET } from "../../reducers/types/categoryTypes";

import { PRODUCT_UPLOAD_RESET } from "../../reducers/types/productTypes";

const CreateProductFormRight = ({ handleChange, values }) => {
  const dispatch = useDispatch();
  const { loading, categories, error } = useSelector(
    (state) => state.fetchCategories
  );

  useEffect(() => {
    dispatch(fetchCategoryAction());
  }, [dispatch]);

  const types = ["Cold Rolled", "Hot Rolled"];

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
      <div>
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
      </div>
    </div>
  );
};

export default CreateProductFormRight;
