import React from 'react'
// import ProductDescription from './ProductDescription'
import './ProductDetailSection.css'
import ProductSlider from './ProductSlider'
import TopBreadCrum from './TopBreadCrum'
const ProductDetailSection = () => {
  return (
    <div>
    <TopBreadCrum />
    <div className='productDetailContainer'>
    <ProductSlider />
    {/* <ProductDescription details={product} /> */}
    </div>
    </div>
  )
}

export default ProductDetailSection