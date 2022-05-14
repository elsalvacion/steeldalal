import { Container } from '@mui/material'
import React from 'react'
import Category from '../components/home/Category'
import ProductCarousel from '../components/home/ProductCarousel'
// import Showcase from '../components/home/Showcase'
import ShowcaseCarousel from '../components/home/ShowcaseCarousel'
import HowItWorks from '../components/home/HowItWorks'

const HomeScreen = () => {
  return (
    <div>
      <ShowcaseCarousel />
      <Container>
        <Category />
        <ProductCarousel />
        <HowItWorks />
      </Container>
    </div>
  )
}

export default HomeScreen