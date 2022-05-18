import { Typography } from '@mui/material'
import React from 'react'
import './ProductDescription.css'
const ProductDescription = ({details}) => {
  return (
    <div className='productDesContainer'>
      <Typography variant='h6'>{details.title}</Typography>
      
    </div>
  )
}

export default ProductDescription