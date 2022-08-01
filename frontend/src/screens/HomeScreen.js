import { Container } from "@mui/material";
import React from "react";
import Category from "../components/home/Category";
import ProductCarousel from "../components/home/ProductCarousel";
import HowItWorks from "../components/home/HowItWorks";
import WhyUs from "../components/home/WhyUs";
import Contact from "../components/home/Contact";
import Showcase from "../components/home/Showcase";
import About from "../components/home/About";
import CustomHelmet from "../components/layout/CustomHelmet";
import Partners from "../components/home/Partners";

const HomeScreen = () => {
  return (
    <div>
      <CustomHelmet
        title="Home"
        desc="Your number 1 B2B metal store in india with over 10 years experience in the business"
      />

      <Showcase />
      <Container>
        <Category />
        <ProductCarousel />
        <Partners />
        <About />
        <HowItWorks />
        <WhyUs />
        <Contact />
      </Container>
    </div>
  );
};

export default HomeScreen;
