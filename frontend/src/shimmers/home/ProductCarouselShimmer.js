import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./ProductCarouselShimmer.css";
import { categories } from "../../constants/category";
import { products } from "../../constants/products";
import {
  ArrowForward,
  ChevronLeft,
  ChevronRight,
  CurrencyRupee,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import {
  ShimmerSectionHeader,
  ShimmerThumbnail,
  ShimmerTitle,
} from "react-shimmer-effects";

const ProductCarouselShimmer = () => {
  const items = products.map((product) => (
    <div>
      <ShimmerThumbnail className="carouselProductImage" rounded />
      <div className="carouselProductDesc">
        <ShimmerSectionHeader />
        <Typography component="p" noWrap>
          <CurrencyRupee fontSize="sm" />
          <ShimmerTitle line={2} gap={10} variant="primary" />
        </Typography>
      </div>
    </div>
  ));
  return categories.map((category, i) => (
    <div className="productCarouselContainer" key={category.id}>
      <button className="productCarouselTitle">
        {category.title}
        <ArrowForward />
      </button>
      <AliceCarousel
        mouseTracking
        items={items}
        controlsStrategy="responsive"
        disableDotsControls={true}
        autoPlay={true}
        autoPlayDirection={i % 2 === 0 ? "ltr" : "rtl"}
        infinite={true}
        autoPlayInterval={1500}
        animationType={i % 2 === 0 ? "fadeout" : "slide"}
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
  ));
};

export default ProductCarouselShimmer;
