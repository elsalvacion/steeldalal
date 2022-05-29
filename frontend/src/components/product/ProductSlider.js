import React from "react";
import "./ProductSlider.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ProductSlider = ({ image }) => {
  return (
    <div className="productSliderContainer">
      <TransformWrapper>
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <TransformComponent
            wrapperStyle={{
              height: "100%",
              width: "100%",
              padding: 0,
              margin: 0,
              overflow: "hidden",
            }}
            contentStyle={{
              height: "100%",
              width: "100%",
              padding: 0,
              margin: 0,
            }}
          >
            <img className="productSliderImage" src={image} alt="steeldalal" />
          </TransformComponent>
        )}
      </TransformWrapper>
    </div>
  );
};

export default ProductSlider;
