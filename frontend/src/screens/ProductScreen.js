import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import { fetchSingleProductsAction } from '../actions/productAction'
import ProductDetailSection from '../components/product/ProductDetailSection'
const ProductScreen = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {product, loading} = useSelector(state => state.singleProduct)
    useEffect(() => {
       if(!product) {
           dispatch(fetchSingleProductsAction(id))
       }
    }, [id, product, dispatch])
    return (
    <div>
       <Container>
      { loading ? <h4>Loading ..</h4> : <ProductDetailSection product={product} /> }
       </Container>
    </div>
  )
}

export default ProductScreen