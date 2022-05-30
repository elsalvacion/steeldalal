import React from "react";
import Carousel from "react-material-ui-carousel";
import "./ShowcaseCarousel.css";
const items = [
  {
    id: 1,
    title: `Welcome To SteelDalal`,
    description: `Steel Trading Ka Naya Funda!`,
    img: "/assets/banner_1.jpg",
  },
  {
    id: 2,
    title: `Now Trade Online
        `,
    description: `In any category of Iron & Steel Goods
        `,
    img: "/assets/banner_2.jpg",
  },
  {
    id: 3,
    title: `Trading Is Now Very Simple!
        `,
    description: `We specialize in all type of steel trading!
        `,
    img: "/assets/banner_4.jpg",
  },
  {
    id: 4,
    title: `India's Biggest Trading Platform
        `,
    description: `Steeldalal.com is the only site provides the biggest market of online steel trading.
        `,
    img: "/assets/banner_2.jpg",
  },
  {
    id: 5,
    title: `Grow With Us!
        `,
    description: `Let your Steel business grow with STEELDALAL.
        `,
    img: "/assets/banner_4.jpg",
  },
];
const ShowcaseCarousel = () => {
  return (
    <Carousel
      height="50vh"
      indicators={false}
      navButtonsAlwaysVisible={true}
      cycleNavigation={true}
      interval={4000}
      fullHeightHover={true}
      animation="fade"
      duration={700}
    >
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </Carousel>
  );
};

function Item({ item: { img } }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src={img}
        alt="steeldalal.com"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
export default ShowcaseCarousel;
