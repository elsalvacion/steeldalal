import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { products } from "../../constants/products";
import { ArrowForward, ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  ShimmerBadge,
  ShimmerButton,
  ShimmerThumbnail,
  ShimmerTitle,
} from "react-shimmer-effects";

const AllProductShimmer = () => {
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
        <ShimmerButton className="productCarouselTitle">
          <ShimmerBadge />
          <ArrowForward />
        </ShimmerButton>
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

export default AllProductShimmer;
