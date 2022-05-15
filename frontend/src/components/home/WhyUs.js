import styled from '@emotion/styled'
import React from 'react'
import {Typography} from '@mui/material'
import './WhyUs.css'
import { devices } from '../../constants/devices'


const WhatWeDo = styled.div`
    flex: 1;
    display: flex;
    padding: 50px 20px;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: ${props => props.bg ? props.bg : 'white'};
    color: ${props => props.color ? props.color : 'black'};
    font-size: 14px;
    
    @media ${devices.mobileL} {
        padding: 30px 10px;
        font-size: 20px;
        font-weight: bold;
        text-align: left;
        justify-content: flex-start;
    }


    @media ${devices.tablet} {
    padding: 40px 15px;
    }
 
   
`
const WhyUs = () => {
    const whatWeDos = [
        {
            id: 1,
            title: 'Quality',
            bg: '#fdb001',
            color: 'black'
        },
        {
            id: 2,
            title: 'Trust',
            bg: 'darkgray',
            color: 'black'
        },
        {
            id: 3,
            title: 'Best Deals',
            bg: '#2c2656',
            color: 'white'
        },
        {
            id: 4,
            title: `Hastle Free Sales & Purchases`,
            bg: 'skyblue',
            color: 'black'
        },
        {
            id: 4,
            title: `
            Pan India visibility
            to your Products`,
            bg: 'black',
            color: 'white'
        }
    ]
  return (
    <div className='whyUsMainContainer'>
        <Typography variant='h4' component='h4'>
        Why Steeldalal
        </Typography>
        <div className='whyUSContainer'>
    {
        whatWeDos.map(weDo => <WhatWeDo color={weDo.color} bg={weDo.bg} key={weDo.id}>
            {weDo.title}
        </WhatWeDo>)
    }
    </div>
    </div>
  )
}

export default WhyUs