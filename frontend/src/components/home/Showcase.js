import React from 'react'
import './Showcase.css'
import {Link} from 'react-router-dom'
import banner  from '../../assets/banner_img.png'
const Showcase = () => {
  
  return (
    <div className='showcaseContainer'>
      <Link to=''>
        <img src={banner} alt="Steeldalal" className='showcaseImage' />
        </Link>
    </div>
  )
}

export default Showcase