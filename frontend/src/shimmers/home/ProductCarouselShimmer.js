import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./ProductCarouselShimmer.css";
import { categories } from "../../constants/category";
import { products } from "../../constants/products";
import { ArrowForward, ChevronLeft, ChevronRight } from "@material-ui/icons";
import { ShimmerThumbnail, ShimmerTitle } from "react-shimmer-effects";

const ProductCarouselShimmer = () => {
  const items = products.map((product) => (
    <div key={product.id} className="productShimmerCard">
      <ShimmerThumbnail height={100} rounded />
      <ShimmerTitle line={1} gap={10} variant="primary" />
      <ShimmerTitle line={1} gap={10} variant="primary" />
    </div>
  ));
  return (
    <div>
      <div className="productCarouselContainer">
        <button className="productCarouselTitle">
          {categories[0].title}
          <ArrowForward />
        </button>
        <AliceCarousel
          mouseTracking
          items={items}
          controlsStrategy="responsive"
          disableDotsControls={true}
          renderPrevButton={() => {
            return (
              <button className="carouselProductCustomPrevBtn">
                <ChevronLeft fontSize="large" />
              </button>
            );
          }}
          renderNextButton={() => {
            return (
              <button className="carouselProductCustomNextBtn">
                <ChevronRight fontSize="large" />
              </button>
            );
          }}
          responsive={{
            0: {
              items: 2,
            },
            350: {
              items: 2,
            },
            600: {
              items: 3,
            },
            900: {
              items: 4,
            },
            1024: {
              items: 5,
            },
            1750: {
              items: 6,
            },
          }}
        />

        <button className="productCarouselTitle">
          {categories[1].title}
          <ArrowForward />
        </button>
        <AliceCarousel
          mouseTracking
          items={items}
          controlsStrategy="responsive"
          disableDotsControls={true}
          renderPrevButton={() => {
            return (
              <button className="carouselProductCustomPrevBtn">
                <ChevronLeft fontSize="large" />
              </button>
            );
          }}
          renderNextButton={() => {
            return (
              <button className="carouselProductCustomNextBtn">
                <ChevronRight fontSize="large" />
              </button>
            );
          }}
          responsive={{
            0: {
              items: 2,
            },
            350: {
              items: 2,
            },
            600: {
              items: 3,
            },
            900: {
              items: 4,
            },
            1024: {
              items: 5,
            },
            1750: {
              items: 6,
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProductCarouselShimmer;
