import React from 'react'
import './Footer.css'
import {Typography} from '@mui/material'
import { aboutUsLinks , socials, contactUsLinks, adWithUsLinks} from '../../constants/links'
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <div className='footer'>
      <div className="topFooter">
         {/* about us */}
     <div className='footerContactItem'>
       <Typography variant='h6' component='h6'>About Us</Typography>
       <div className="contactItemDivider"/>
       {
         aboutUsLinks.map(link => <Link key={link.id} to={link.link} className='footerLink'>{link.title}</Link>)
       }
     </div>

     {/* ad with us */}
     <div className='footerContactItem'>
     <Typography variant='h6' component='h6'>Advertise With Us</Typography>
       <div className="contactItemDivider"/> 
       {
         adWithUsLinks.map(link => <Link key={link.id} to={link.link} className='footerLink'>{link.title}</Link>)
       }
     </div>

     {/* contact us */}
     <div className='footerContactItem'>
      <Typography variant='h6' component='h6'>Help & Support</Typography>
       <div className="contactItemDivider"/> 
       {
         contactUsLinks.map(link => <Link key={link.id} to={link.link} className='footerLink'>{link.title}</Link>)
       }
       <div className='socialIconsContainer'>
       {socials.map(social => <a key={social.id} href={social.link} className='footerLink'>{social.icon}</a>)
       }
       </div>
     </div>
      </div>

      {/* bootom footer */}
      <div className="bottomFooter">
       <Typography variant='p' component='p'>
      All Rights Reserved &copy; {new Date().getFullYear()}
       </Typography>
       <a href="steeldalal.com">SteelDalal</a>
      </div>
    </div>
  )
}

export default Footer