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
    (image) => image.image ? image.image : image
  );
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const breakpointColumnsObj = {
    default: 4,
    700: 2,
  };
  return (
    <div className="ImagePreviewContainer">
      <Typography>Your Uploads</Typography>
      <br />
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image, index) => (
          <img
            src={image.image ? image.image : image}
            className="previewImage"
            alt="steeldalal.com"
            key={image.id ? image.id : image}
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
