import { Container } from '@mui/material'
import React from 'react'
import Category from '../components/home/Category'
import ProductCarousel from '../components/home/ProductCarousel'
import ShowcaseCarousel from '../components/home/ShowcaseCarousel'
import HowItWorks from '../components/home/HowItWorks'
import WhyUs from '../components/home/WhyUs'
// import Video from '../components/home/Video'
import Contact from '../components/home/Contact'


const HomeScreen = () => {
  return (
    <div>
      <ShowcaseCarousel />
      <Container>
        <Category />
        <ProductCarousel />
        <HowItWorks />
        <WhyUs />
        {/* <Video /> */}
        <Contact />
      </Container>
    </div>
  )
}

export default HomeScreen