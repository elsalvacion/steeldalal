import React, { useState, useCallback, useMemo } from "react";
import "./CreateProductFormLeft.css";
import { useSelector, useDispatch } from "react-redux";
import { productUploadAction } from "../../actions/productAction";
import CustomAlert from "../layout/CustomAlert";
import { PRODUCT_UPLOAD_RESET } from "../../reducers/types/productTypes";
import ImagePreview from "./ImagePreview";
import { Button } from "@mui/material";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  minHeight: "250px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  textAlign: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#000",
  borderStyle: "dashed",
  backgroundColor: "white",
  color: "black",
  outline: "none",
  transition: "border .24s ease-in-out",
  marginBottom: 10,
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const CreateProductFormLeft = () => {
  const [files, setFiles] = useState(null);
  const { loading, images, error } = useSelector(
    (state) => state.uploadProduct
  );
  const dispatch = useDispatch();
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".jfif", ".gif", ".svg", ".webp"],
    },
  });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

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

          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div>
                <p>Drag 'n' drop some files here, or click to select files</p>
                <br />
                <p>Only 4 files allowed</p>
              </div>
            )}
          </div>

          {files && (
            <div className="filesInputChangePreviewContainer">
              {files.map((file) => (
                <img
                  key={file.name}
                  src={URL.createObjectURL(file)}
                  className="filesInputChangePreviewItem"
                  alt="steeldalal.com"
                />
              ))}
            </div>
          )}
          {files && (
            <Button onClick={handleUpload} variant="contained" color="primary">
              Upload
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default CreateProductFormLeft;
