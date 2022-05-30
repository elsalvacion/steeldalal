import React, { useState } from "react";
import "./CreateProductFormLeft.css";
import { DropzoneArea } from "material-ui-dropzone";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { productUploadAction } from "../../actions/productAction";
import CustomAlert from "../layout/CustomAlert";
import { PRODUCT_UPLOAD_RESET } from "../../reducers/types/productTypes";
import ImagePreview from "./ImagePreview";

const CreateProductFormLeft = () => {
  const [files, setFiles] = useState(null);
  const { loading, images, error } = useSelector(
    (state) => state.uploadProduct
  );
  const dispatch = useDispatch();

  const handleChange = (uploads) => {
    setFiles(uploads);
  };

  const handleUpload = () => {
    if (files && files.length > 0) dispatch(productUploadAction(files));
  };

  return (
    <div className="createProductFormLeft">
      {loading ? (
        <h4>Loading...</h4>
      ) : error ? (
        <CustomAlert
          type="error"
          text={error}
          handleClose={() => dispatch({ type: PRODUCT_UPLOAD_RESET })}
        />
      ) : images ? (
        <ImagePreview images={images} />
      ) : (
        <>
          <br />
          <DropzoneArea
            acceptedFiles={["image/*"]}
            onChange={handleChange}
            showFileNames
            showAlerts={false}
            filesLimit={4}
            dropzoneText="Drag and drop a file here or click"
          />
          <br />
          <br />
          <p>Only 4 files allowed</p>
          <br />
          <Button
            disabled={!files}
            onClick={handleUpload}
            variant="contained"
            color="primary"
          >
            Upload
          </Button>
        </>
      )}
    </div>
  );
};

export default CreateProductFormLeft;
