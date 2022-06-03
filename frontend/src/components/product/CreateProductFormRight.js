import React, { useEffect } from "react";
import "./CreateProductFormRight.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryAction } from "../../actions/categoryAction";
import CustomAlert from "../layout/CustomAlert";
import { FETCH_CATEGORY_RESET } from "../../reducers/types/categoryTypes";

import { PRODUCT_UPLOAD_RESET } from "../../reducers/types/productTypes";

const CreateProductFormRight = (props) => {
  const dispatch = useDispatch();
  const { categories, error } = useSelector((state) => state.fetchCategories);

  useEffect(() => {
    dispatch(fetchCategoryAction());
  }, [dispatch]);

  const types = ["Cold Rolled", "Hot Rolled"];

  return (
    <div className="createProductFormRight">
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
            onChange={props.handleChange}
            value={props.values.title}
            type="text"
            placeholder="Enter title"
          />
        </div>
        <div className="createProductFormTypeAndContainer">
          <div className="createProductFormType">
            <label htmlFor="createProductFormType">Type</label>

            <select
              onChange={props.handleChange}
              name="type"
              id="createProductFormType"
              value={props.values.type}
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
              value={props.values.brand}
              type="text"
              onChange={props.handleChange}
              placeholder="Enter Brand"
            />
          </div>
        </div>
        <div className="createProductFormCategory">
          <label htmlFor="createProductFormCategory">Category</label>
          <select
            onChange={props.handleChange}
            name="category"
            id="createProductFormCategory"
            value={props.values.category}
          >
            <option value="">Choose Category</option>
            {categories &&
              categories.map((category) => (
                <option key={category.title} value={category.title}>
                  {category.title}
                </option>
              ))}
          </select>
        </div>

        <div className="createProductFormPrices">
          {/* price */}
          <div className="createProductFormPrice">
            <label htmlFor="createProductFormPrice">Price</label>
            <input
              name="price"
              id="createProductFormPrice"
              value={props.values.price}
              type="number"
              onChange={props.handleChange}
              placeholder="Enter Price"
            />
          </div>

          {/* qty */}
          <div className="createProductFormQty">
            <label htmlFor="createProductFormQty">Quantity</label>
            <input
              name="qty"
              id="createProductFormQty"
              value={props.values.qty}
              type="number"
              onChange={props.handleChange}
              placeholder="Enter Quantity"
            />
          </div>

          {/* discount */}
          <div className="createProductFormDiscount">
            <label htmlFor="createProductFormDiscount">Discount(%)</label>
            <input
              name="discount"
              id="createProductFormDiscount"
              value={props.values.discount}
              type="number"
              onChange={props.handleChange}
              placeholder="Enter Discount"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProductFormRight;
