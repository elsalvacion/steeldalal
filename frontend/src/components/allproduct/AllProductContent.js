import React, { useEffect, useState } from "react";
import "./AllProductContent.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { ArrowForward, ChevronLeft, ChevronRight } from "@mui/icons-material";
import ProductCarouselItem from "../home/ProductCarouselItem";
import CustomAlert from "../layout/CustomAlert";
import AllProductShimmer from "../../shimmers/product/AllProductShimmer";

const AllProductContent = ({ category, idx }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(
          "/product/category",
          {
            category,
          },
          {
            "Content-Type": "application/json",
          }
        );

        setProducts(data.msg);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.response.data.msg);
        setLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [category]);
  const items = products
    ? products.map((product) => (
        <ProductCarouselItem product={product} key={product.id} />
      ))
    : [];

  return (
    <div className="allProductContentContainer">
      {loading ? (
        <AllProductShimmer />
      ) : error ? (
        <CustomAlert
          type="error"
          text={error}
          handleClose={() => setError(null)}
        />
      ) : (
        products && (
          <>
            <div className="productCarouselContainer">
              <button
                onClick={() => history.push(`/category/${category}`)}
                className="productCarouselTitle"
              >
                {category}
                <ArrowForward />
              </button>
            </div>
            <AliceCarousel
              mouseTracking
              items={items}
              controlsStrategy="responsive"
              disableDotsControls={true}
              autoPlay={true}
              autoPlayDirection={idx % 2 === 0 ? "ltr" : "rtl"}
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
          </>
        )
      )}
    </div>
  );
};

export default AllProductContent;
