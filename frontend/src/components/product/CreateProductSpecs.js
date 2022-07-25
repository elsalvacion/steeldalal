import React from "react";
import { Button, IconButton } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import {
  coilSpec,
  returnSpecFieldLabel,
  sheetSpec,
  tmtSpec,
} from "../../constants/specs";

const CreateProductSpecs = ({ values, setValues }) => {
  const handleInputChange = (e, index) => {
    const { name } = e.target;

    const value = e.target.value === "" ? null : e.target.value;
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
    const categoryLowerCase = values.category;
    setValues({
      ...values,
      specs: [
        ...values.specs,
        categoryLowerCase.includes("sheet")
          ? sheetSpec
          : categoryLowerCase.includes("coil")
          ? coilSpec
          : tmtSpec,
      ],
    });
  };

  const sides = ["thickness", "width", "length"];
  return values.specs.map((spec, i) => (
    <>
      <div className="productSpecContainer">
        <div className="productSpecUnits">
          {Object.keys(spec).map((key) =>
            sides.includes(key) ? (
              <>
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <label>{returnSpecFieldLabel(key)} *</label>
                  <input
                    value={spec[key]}
                    type="number"
                    name={key}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </div>
                <div>
                  <label>{returnSpecFieldLabel(key)} *</label>
                  <select
                    onChange={(e) => handleInputChange(e, i)}
                    value={spec[key]}
                    name={key}
                  >
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                    <option value="in">in</option>
                  </select>
                </div>
              </>
            ) : null
          )}
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
    </>
  ));
};

export default CreateProductSpecs;
