import React, { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./ProductCarousel.css";
import { ArrowForward, ChevronLeft, ChevronRight } from "@material-ui/icons";
import ProductCarouselShimmer from "../../shimmers/home/ProductCarouselShimmer";
import CustomAlert from "../layout/CustomAlert";
import { LATEST_PRODUCT_RESET } from "../../reducers/types/productTypes";
import { useDispatch, useSelector } from "react-redux";
import { latestProductsAction } from "../../actions/productAction";
import ProductCarouselItem from "./ProductCarouselItem";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

const ProductCarousel = () => {
  const { loading, error, products } = useSelector(
    (state) => state.latestProduct
  );
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!products) dispatch(latestProductsAction());
  }, [dispatch, products]);

  const firstItems = products
    ? products.firstData.map((product) => (
        <ProductCarouselItem product={product} key={product.id} />
      ))
    : [];
  const secondItems = products
    ? products.secondData.map((product) => (
        <ProductCarouselItem product={product} key={product.id} />
      ))
    : [];
  return loading ? (
    <ProductCarouselShimmer />
  ) : error ? (
    <CustomAlert
      text={error}
      type="error"
      handleClose={() => dispatch({ type: LATEST_PRODUCT_RESET })}
    />
  ) : products ? (
    <div id="products">
      <Button
        variant="contained"
        endIcon={<ChevronRight />}
        color="primary"
        sx={{
          margin: "0 auto",
          // marginBottom: 3,
        }}
        onClick={() => history.push("/products")}
      >
        ALL PRODUCTS
      </Button>
      {
        <div className="productCarouselContainer">
          <button
            onClick={() => history.push(`/category/${products.first}`)}
            className="productCarouselTitle"
          >
            {products.first}
            <ArrowForward />
          </button>
          <AliceCarousel
            mouseTracking
            items={firstItems}
            controlsStrategy="responsive"
            disableDotsControls={true}
            autoPlay={true}
            autoPlayDirection={"ltr"}
            infinite={true}
            autoPlayInterval={1500}
            animationType={"fadeout"}
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

          <button
            onClick={() => history.push(`/category/${products.second}`)}
            className="productCarouselTitle"
          >
            {products.second}
            <ArrowForward />
          </button>
          <AliceCarousel
            mouseTracking
            items={secondItems}
            controlsStrategy="responsive"
            disableDotsControls={true}
            autoPlay={true}
            autoPlayDirection={"rtl"}
            infinite={true}
            autoPlayInterval={1500}
            animationType={"slide"}
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
      }
      <Button
        variant="contained"
        endIcon={<ChevronRight />}
        color="primary"
        sx={{
          margin: "0 auto",
          marginBottom: 10,
        }}
        onClick={() => history.push("/products")}
      >
        ALL PRODUCTS
      </Button>
    </div>
  ) : null;
};

export default ProductCarousel;
