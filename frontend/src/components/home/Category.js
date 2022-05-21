import React from 'react'
import { allCategories } from '../../constants/category'
import './Category.css'
import {Link} from 'react-router-dom'
import {Typography} from '@mui/material'
const Category = () => {

  return (
    <div className='categoriesMainContainer'>
        <h2>Categories</h2>
        <div className="categoryItemsContainer">
          {
            allCategories.map(category => <Link key={category.id} to='' className='categoryItem'>
              <Typography variant='h6' component='h6'>{category.title}</Typography>
            </Link>)
          }
        </div>
    </div>
  )
}

export default Category