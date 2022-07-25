import React from "react";
import "./CreateProductFormRight.css";
import { categories } from "../../constants/category";

import CreateProductSpecs from "./CreateProductSpecs";

const CreateProductFormRight = ({ values, handleChange, setValues }) => {
  const types = ["Cold Rolled", "Hot Rolled"];

  return (
    <div className="createProductFormRight">
      <div>
        <div className="createProductFormTitle">
          <label htmlFor="createProductFormTitle">Product Name *</label>
          <input
            name="title"
            id="createProductFormTitle"
            onChange={handleChange}
            value={values.title}
            type="text"
            placeholder="Enter name"
          />
        </div>
        <div className="createProductFormTypeAndContainer">
          <div className="createProductFormType">
            <label htmlFor="createProductFormType">Product Type *</label>

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
            <label htmlFor="createProductFormBrand">Product Brand *</label>
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
          <label htmlFor="createProductFormCategory">Product Category *</label>
          <select
            onChange={handleChange}
            name="category"
            id="createProductFormCategory"
            value={values.category}
          >
            <option value="">Choose Category</option>
            {categories.map((category) => (
              <option key={category.title} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {values.category.trim() !== "" && (
          <CreateProductSpecs
            values={values}
            handleChange={handleChange}
            setValues={setValues}
          />
        )}
      </div>
    </div>
  );
};

export default CreateProductFormRight;
