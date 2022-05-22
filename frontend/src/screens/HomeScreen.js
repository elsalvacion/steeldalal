import { Container } from "@mui/material";
import React from "react";
import Category from "../components/home/Category";
import ProductCarousel from "../components/home/ProductCarousel";
import HowItWorks from "../components/home/HowItWorks";
import WhyUs from "../components/home/WhyUs";
import Contact from "../components/home/Contact";
import ShowcaseCarousel from "../components/home/ShowcaseCarousel";

const HomeScreen = () => {
  return (
    <div>
      <ShowcaseCarousel />
      <Container>
        <Category />
        <ProductCarousel />
        <HowItWorks />
        <WhyUs />
        <Contact />
      </Container>
    </div>
  );
};

export default HomeScreen;
