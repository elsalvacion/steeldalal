import React, { useCallback, useState } from "react";
import "./ImagePreview.css";
import Masonry from "react-masonry-css";
import { Typography } from "@mui/material";
import ImageViewer from "react-simple-image-viewer";

const ImagePreview = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);
  const viewerImages = images.map(
    (image) => `http://localhost:5000/${image.image}`
  );
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  return (
    <div className="ImagePreviewContainer">
      <Typography>Your Uploads</Typography>
      <br />
      <Masonry
        breakpointCols={2}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image, index) => (
          <img
            src={`http://localhost:5000/${image.image}`}
            className="previewImage"
            alt="steeldalal.com"
            key={image.id}
            onClick={() => openImageViewer(index)}
          />
        ))}

        {isViewerOpen && (
          <ImageViewer
            src={viewerImages}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
          />
        )}
      </Masonry>
    </div>
  );
};

export default ImagePreview;
