import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './ProductCarousel.css'
import {categories} from '../../constants/category'
import {products} from '../../constants/products'
import {
  ArrowForward,
  ChevronLeft, ChevronRight, 
  CurrencyRupee} from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
// import {IconButton} from '@mui/material'
const ProductCarousel = () => {
    const history = useHistory() 
    const handleDragStart = (e) => e.preventDefault();
    const items = products.map(product => <div onClick={() => history.push(`/product/${product.id}`)} key={product.id} className='carouselProduct'>
    <img onDragStart={handleDragStart} src={product.image} className='carouselProductImage' alt={product.title} />
    <div className="carouselProductDesc">
    <Typography component='h4' noWrap>{product.title}</Typography>
    <Typography component='p' noWrap><CurrencyRupee fontSize='sm' />{product.price}</Typography>
    </div>
    </div>)
  return (
    categories.map((category, i) => <div className='productCarouselContainer' key={category.id}>
    <button className='productCarouselTitle'>{category.title}
    <ArrowForward  />
    </button>
    <AliceCarousel
     mouseTracking items={items}
     controlsStrategy="responsive"
     disableDotsControls={true}
     autoPlay={true}
     autoPlayDirection={i % 2 === 0 ? 'ltr' : 'rtl'}
     infinite={true}
     autoPlayInterval={1500} 
     animationType={i % 2 === 0 ? 'fadeout' : 'slide'}
     renderPrevButton={() => {
        return <button  className="carouselProductCustomPrevBtn">
        <ChevronLeft fontSize='large' />
      </button>
      }}
      renderNextButton={() => {
        return  <button  className="carouselProductCustomNextBtn">
  <ChevronRight fontSize='large' />
</button>
      }}
     responsive={{
        0: {
            items: 2,
        },
        350: {
          items: 2,
      },
        600: {
            items: 3,
        },
        900: {
          items: 4,
      },
        1024: {
            items: 5
        },
        1750: {
          items: 6
      }
      }}
     />
    </div>)
    )
}

export default ProductCarousel