import { Container } from '@mui/material'
import React from 'react'
import Category from '../components/home/Category'
import ProductCarousel from '../components/home/ProductCarousel'
import HowItWorks from '../components/home/HowItWorks'
import WhyUs from '../components/home/WhyUs'
import Contact from '../components/home/Contact'
import Showcase from '../components/home/Showcase'


const HomeScreen = () => {
  return (
    <div>
        <Showcase />
        <Container>
        <Category />
        <ProductCarousel />
        <HowItWorks />
        <WhyUs />
        <Contact />
      </Container>
    </div>
  )
}

export default HomeScreen