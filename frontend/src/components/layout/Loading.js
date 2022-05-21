import React from 'react'
import './Loading.css'
const Loading = ({text}) => {
  return (
    <div className='loadingContainer'>
        <h2>{text}</h2>
        <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading