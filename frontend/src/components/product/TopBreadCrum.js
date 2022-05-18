import React from 'react'
import './TopBreadCrum.css'
import {Breadcrumbs} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {Link} from 'react-router-dom'
const TopBreadCrum = () => {
  const breadcrumbs = [
    <Link to="/" className='topBreadCrumLink' >
      Products 
    </Link>,
    <Link to="/" className='topBreadCrumLink' >
      Category
    </Link>,
    <Link to="/" className='topBreadCrumLink'>
      Brand
    </Link>
  ];
  return (
    <div className='topBreadCrumContainer'>
        <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      
    </div>
  )
}

export default TopBreadCrum