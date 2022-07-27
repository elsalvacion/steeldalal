import React from "react";
import "./CreateProductFormRight.css";
import { Button, IconButton } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { categories } from "../../constants/category";
import { tmtThickness } from "../../constants/specs";
// import { returnCategorySpec } from "../../constants/specs";

const CreateProductFormRight = ({ values, setValues, handleChange }) => {
  const types = ["Cold Rolled", "Hot Rolled"];

  const handleInputChange = (e, index) => {
    const { name } = e.target;

    const value = e.target.value;
    const list = [...values.specs];
    list[index][name] = value;
    setValues({
      ...values,
      specs: list,
    });
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...values.specs];
    list.splice(index, 1);
    setValues({
      ...values,
      specs: list,
    });
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    const coilSpec = {
      thickness: "",
      t_uom: "mm",
      width: "",
      w_uom: "mm",
      price: "",
      qty: "",
    };

    const sheetSpec = {
      thickness: "",
      t_uom: "mm",
      width: "",
      w_uom: "",
      length: "mm",
      l_uom: "mm",
      price: "",
      qty: "",
    };

    const tmtSpec = {
      thickness: "",
      t_uom: "mm",
      price: "",
      qty: "",
    };
    const category = values.category.toLowerCase();
    const isCoil = category.includes("coil");
    const isSheet = category.includes("sheet");

    setValues({
      ...values,
      specs: [
        ...values.specs,
        isCoil ? coilSpec : isSheet ? sheetSpec : tmtSpec,
      ],
    });
  };
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

        {/* specs */}
        {values.category !== "" &&
          values.specs.map((spec, i) => (
            <div key={`create-product-spec-${i}`}>
              <div className="productSpecContainer">
                <div className="productSpecUnits">
                  {/* thickness */}
                  <div
                    style={{
                      flex: 1,
                    }}
                  >
                    <label>Thickness *</label>
                    {values.category.toLowerCase().includes("tmt") ? (
                      <select
                        onChange={(e) => handleInputChange(e, i)}
                        value={spec.thickness}
                        name="thickness"
                      >
                        <option value="">Choose</option>
                        {tmtThickness.map((thickness) => (
                          <option
                            key={`tmt-thickness-${thickness}`}
                            value={thickness}
                          >
                            {thickness}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        value={spec.thickness}
                        type="number"
                        name="thickness"
                        onChange={(e) => handleInputChange(e, i)}
                      />
                    )}
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
                  {(spec.width || spec.width === "") && (
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
                  )}

                  {/* uom */}
                  {spec.w_uom && (
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
                  )}

                  {/* length */}
                  {(spec.length || spec.length === "") && (
                    <div
                      style={{
                        flex: 1,
                      }}
                    >
                      <label>Length *</label>
                      <input
                        onChange={(e) => handleInputChange(e, i)}
                        value={spec.length}
                        type="number"
                        name="length"
                      />
                    </div>
                  )}

                  {/* uom */}
                  {spec.l_uom && (
                    <div>
                      <label>Length UoM *</label>
                      <select
                        onChange={(e) => handleInputChange(e, i)}
                        value={spec.l_uom}
                        name="l_uom"
                      >
                        <option value="mm">mm</option>
                        <option value="cm">cm</option>
                        <option value="m">m</option>
                        <option value="in">in</option>
                      </select>
                    </div>
                  )}
                </div>
                <div className="productSpecUnits">
                  <div
                    style={{
                      flex: 1,
                    }}
                  >
                    <label>Qty(tonnes) *</label>
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
                    <label>Price per tonne *</label>
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
                {values.specs.length !== 1 && (
                  <IconButton
                    onClick={() => handleRemoveClick(i)}
                    color="error"
                    sx={{ mr: 1 }}
                  >
                    <Delete />
                  </IconButton>
                )}
                {values.specs.length - 1 === i && (
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default CreateProductFormRight;
