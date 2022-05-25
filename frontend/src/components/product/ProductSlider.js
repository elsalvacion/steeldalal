import React from "react";
import "./ProductSlider.css";
import Carousel from "react-material-ui-carousel";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ProductSlider = ({ image }) => {
  return (
    <div className="productSliderContainer">
      <Carousel
        navButtonsAlwaysVisible={false}
        fullHeightHover={true}
        animation="slide"
        duration={700}
      >
        <TransformWrapper>
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <TransformComponent>
              <img
                className="productSliderImage"
                src={image}
                alt="steeldalal"
              />
            </TransformComponent>
          )}
        </TransformWrapper>
      </Carousel>
    </div>
  );
};

export default ProductSlider;
