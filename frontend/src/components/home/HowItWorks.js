import React from 'react'
import { Typography} from '@mui/material'
import './HowItWorks.css'
import styled from '@emotion/styled'


const Offer = styled.div`
    display: flex;
    align-items: stretch;
    flex-direction:${props => props.i % 2 === 0 ? 'row-reverse' : 'row'} ;
    @media(max-width: 750px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
`
const HowItWorks = () => {
    const offers = [
        {
            id: 1,
            title: 'Easy Registration & Login',
            img: '/assets/weo_login.png',
            desc: `
            On our platform you can easily register and start selling or buy the best iron, steel, alumium and all type of metal products out there. We make the hard things easy, no long forms just the easy and simple information.
            `,
            moreDesc: `
            Our website is accessible in all forms of devices. Mobiles, Tablets, Laptops and Desktops, you do not have anything to worry about steeldalal.com got you covered.
            `
        },
        {
            id: 2,
            title: 'Procure',
            img: '/assets/weo_procure.png',
            desc: `
            On our platform you can easily register and start selling or buy the best iron, steel, alumium and all type of metal products out there. We make the hard things easy, no long forms just the easy and simple information.
            `,
            moreDesc: `
            Our website is accessible in all forms of devices. Mobiles, Tablets, Laptops and Desktops, you do not have anything to worry about steeldalal.com got you covered.
            `
        },
        {
            id: 3,
            title: 'Make Payment',
            img: '/assets/weo_pay.png',
            desc: `
            On our platform you can easily register and start selling or buy the best iron, steel, alumium and all type of metal products out there. We make the hard things easy, no long forms just the easy and simple information.
            `,
            moreDesc: `
            Our website is accessible in all forms of devices. Mobiles, Tablets, Laptops and Desktops, you do not have anything to worry about steeldalal.com got you covered.
            `
        },
        {
            id: 4,
            title: 'Get On Time Delivery',
            img: '/assets/weo_shipping.png',
            desc: `
            On our platform you can easily register and start selling or buy the best iron, steel, alumium and all type of metal products out there. We make the hard things easy, no long forms just the easy and simple information.
            `,
            moreDesc: `
            Our website is accessible in all forms of devices. Mobiles, Tablets, Laptops and Desktops, you do not have anything to worry about steeldalal.com got you covered.
            `
        }
    ]
  return (
    <div className='weoContainer'>
        <Typography component='h3' variant='h3'>How We Work
</Typography>
        {
            offers.map((offer, i) => <Offer i={i} key={offer.id} >
            <div className='offerLeft'>
            <img src={offer.img} className='offerLeftImg' alt="Steeldalal what we offer" />
            </div>
            <div className='offerRight'>
            <Typography component='h5' variant='h5'>{offer.title}</Typography>
            <Typography component='p' className='offerRightDesc1' variant='p'>{offer.desc}</Typography>
            <Typography component='p' variant='p'>{offer.moreDesc}</Typography>
            </div>
            </Offer>)
        }
    </div>
  )
}

export default HowItWorks