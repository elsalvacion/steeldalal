import React from 'react'
import './Category.css'
import {categories} from '../../constants/category'
import {  Typography } from '@mui/material'
const Category = () => {
  return (
    <div className='categoryContainer'>
        {
            categories.map(category => <div className='categoryBtn' key={category.id} title={category.title} >
                <Typography fontSize={12} variant='span'>
                {category.title}
                </Typography>
            </div>)
        }
    </div>
  )
}

export default Category