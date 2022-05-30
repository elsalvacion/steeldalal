import React from "react";
import "./ProductSlider.css";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ImageGallery from "react-image-gallery";

const ProductSlider = ({ images }) => {
  const slideImages = images.map((image) => ({
    original: `${image}`,
    thumbnail: `${image}`,
  }));
  return (
    <div className="productSliderContainer">
      <ImageGallery
        originalHeight="450px"
        showPlayButton={false}
        showIndex={true}
        items={slideImages}
        showThumbnails={false}
        lazyLoad={true}
        showFullscreenButton={false}
      />
    </div>
  );
};

export default ProductSlider;
