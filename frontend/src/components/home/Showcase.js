import React from 'react'
import './Showcase.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Showcase = () => {
  
  let data = [
    {
      content: `Steel Trading Ka Naya Funda!`,
      id:1
    },
    {
      content: `Trade in all steel categories`,
      id:2
    },
    {
      content:  `We specialize in all type of steel trading!`,
      id:3
    },
    {
      content: `Biggest online steel market`,
      id:4
    }
  ]

  const settings = {
    vertical: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 300,
    arrows: false,
    adaptiveHeight: true
  }
  return (
    <div className='showcaseContainer'>
      <div className="showcaseOverlay">
      <div className="showcaseContent">
        <img src="/assets/logo.jpg" alt="Steeldalal" className='showcaseImage' />
        <h1>Welcome To SteelDalal</h1>
        <Slider {...settings}>
    {data.map(content => <h2 key={content.id}>{content.content}</h2>)}
  </Slider>
      </div>
      </div>
    </div>
  )
}

export default Showcase