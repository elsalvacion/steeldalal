import React from 'react'
import { allCategories } from '../../constants/category'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './Category.css'
const Category = () => {
const currentCategory = 'Latest Products'
const items =  allCategories.map(category => <button className={`allCategoryItem ${category.title === currentCategory && 'categoryItemActive'}`} key={category.id}>
{category.title}
</button>)
  return (
    <div className='categoriesMainContainer'>
        <h2>Categories</h2>
        <AliceCarousel
     mouseTracking 
     autoHeight={true}
     autoPlayInterval={2000}
     disableButtonsControls={true}
     items={items}
     controlsStrategy="responsive"
     responsive={{
        0: {
            items: 3,
        },
        350: {
          items: 4,
      },
        600: {
            items: 5,
        },
        900: {
          items: 6,
      },
        1024: {
            items: 7
        },
        1750: {
          items: 10
      }
      }}
     />
    </div>
  )
}

export default Category