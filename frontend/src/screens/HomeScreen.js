import { Container } from "@mui/material";
import React from "react";
import Category from "../components/home/Category";
import ProductCarousel from "../components/home/ProductCarousel";
import HowItWorks from "../components/home/HowItWorks";
import WhyUs from "../components/home/WhyUs";
import Contact from "../components/home/Contact";
// import ShowcaseCarousel from "../components/home/ShowcaseCarousel";
import About from "../components/home/About";
import CustomHelmet from "../components/layout/CustomHelmet";

const HomeScreen = () => {
  return (
    <div>
      <CustomHelmet
        title="Home"
        desc="Your number 1 B2B metal store in india with over 10 years experience in the business"
      />

      <ShowcaseCarousel />
      <Container>
        <Category />
        <ProductCarousel />
        <HowItWorks />
        <WhyUs />
        <About />
        <Contact />
      </Container>
    </div>
  );
};

export default HomeScreen;
