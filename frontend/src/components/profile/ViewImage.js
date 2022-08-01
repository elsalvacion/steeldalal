import React from "react";

import ImageViewer from "react-simple-image-viewer";

const ViewImage = ({
  images,
  closeImageViewer,
  currentImage,
  isViewerOpen,
}) => {
  return isViewerOpen ? (
    <ImageViewer
      src={images}
      currentIndex={currentImage}
      disableScroll={false}
      closeOnClickOutside={true}
      onClose={closeImageViewer}
      backgroundStyle={{
        zIndex: 15000,
      }}
    />
  ) : null;
};

export default ViewImage;
