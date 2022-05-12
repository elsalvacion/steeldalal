import { Container } from '@mui/material'
import React from 'react'
import Category from '../components/home/Category'
import ShowcaseCarousel from '../components/home/ShowcaseCarousel'

const HomeScreen = () => {
  return (
    <div>
      <ShowcaseCarousel  />
      <Container>
        <Category />
      </Container>
    </div>
  )
}

export default HomeScreen