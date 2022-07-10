import React, { useEffect } from "react";
import "./CreateProductFormRight.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryAction } from "../../actions/categoryAction";
import CustomAlert from "../layout/CustomAlert";
import { FETCH_CATEGORY_RESET } from "../../reducers/types/categoryTypes";
import { Button, IconButton } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { PRODUCT_UPLOAD_RESET } from "../../reducers/types/productTypes";

const CreateProductFormRight = (props) => {
  const dispatch = useDispatch();
  const { categories, error } = useSelector((state) => state.fetchCategories);

  useEffect(() => {
    dispatch(fetchCategoryAction());
  }, [dispatch]);

  const types = ["Cold Rolled", "Hot Rolled"];

  const handleInputChange = (e, index) => {
    const { name } = e.target;

    const value = e.target.value === "" ? null : e.target.value;
    const list = [...props.values.specs];
    list[index][name] = value;
    props.setValues({
      ...props.values,
      specs: list,
    });
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...props.values.specs];
    list.splice(index, 1);
    props.setValues({
      ...props.values,
      specs: list,
    });
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    props.setValues({
      ...props.values,
      specs: [
        ...props.values.specs,
        {
          thickness: null,
          t_uom: "m",
          width: null,
          w_uom: "m",
          height: 0,
          h_uom: "m",
          price: null,
          qty: null,
        },
      ],
    });
  };
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
          <label htmlFor="createProductFormTitle">Product Name *</label>
          <input
            name="title"
            id="createProductFormTitle"
            onChange={props.handleChange}
            value={props.values.title}
            type="text"
            placeholder="Enter name"
          />
        </div>
        <div className="createProductFormTypeAndContainer">
          <div className="createProductFormType">
            <label htmlFor="createProductFormType">Product Type *</label>

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
            <label htmlFor="createProductFormBrand">Product Brand *</label>
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
          <label htmlFor="createProductFormCategory">Product Category *</label>
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

        {/* specs */}
        {props.values.specs.map((spec, i) => (
          <>
            <div className="productSpecContainer">
              <div className="productSpecUnits">
                {/* thickness */}
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <label>Thickness *</label>
                  <input
                    value={spec.thickness}
                    type="number"
                    name="thickness"
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </div>

                {/* thickness uom */}
                <div>
                  <label>T UoM *</label>
                  <select
                    onChange={(e) => handleInputChange(e, i)}
                    value={spec.t_uom}
                    name="t_uom"
                  >
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                    <option value="in">in</option>
                  </select>
                </div>

                {/* width */}
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <label>Width *</label>
                  <input
                    onChange={(e) => handleInputChange(e, i)}
                    value={spec.width}
                    type="number"
                    name="width"
                  />
                </div>

                {/* uom */}
                <div>
                  <label>Width UoM *</label>
                  <select
                    onChange={(e) => handleInputChange(e, i)}
                    value={spec.w_uom}
                    name="w_uom"
                  >
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                    <option value="in">in</option>
                  </select>
                </div>
              </div>
              <div className="productSpecUnits">
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <label>Qty(pieces) *</label>
                  <input
                    onChange={(e) => handleInputChange(e, i)}
                    type="number"
                    value={spec.qty}
                    name="qty"
                  />
                </div>
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <label>Price per Piece *</label>
                  <input
                    onChange={(e) => handleInputChange(e, i)}
                    type="number"
                    value={spec.price}
                    name="price"
                  />
                </div>
              </div>
            </div>
            <div className="productSpecsAction">
              {props.values.specs.length !== 1 && (
                <IconButton
                  onClick={() => handleRemoveClick(i)}
                  color="error"
                  sx={{ mr: 1 }}
                >
                  <Delete />
                </IconButton>
              )}
              {props.values.specs.length - 1 === i && (
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<Add />}
                  onClick={handleAddClick}
                >
                  Add Row
                </Button>
              )}
            </div>
            <br />
          </>
        ))}
      </div>
    </div>
  );
};

export default CreateProductFormRight;
