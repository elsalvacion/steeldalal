import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { navLink } from '../../constants/links'
import './Nav.css'
import Search from './Search'
import {Menu, Search as SearchIcon} from '@mui/icons-material';
import SideDrawer from './SideDrawer'
const Nav = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  return (
    <>
    <nav className='navContainer'>
        <div className='topNavContent'>
     {/* logo */}
     <Link to='/' className='logo'>
       
        <img src="/assets/logo.jpg" alt="steeldalal"  />
        <h3>SteelDalal</h3>
        </Link>
       <div className='searchBarContainer'>
 {/* search bar */}
 <Search />
       </div>
        <div className='topNavLinks'>
        <Link className='topNavLink' to='/login'>
        Login/Register
        </Link>
        </div>
        </div>
        <div className='bottomNavContent'>
        {/* nav links */}
        <div className='navLinks'>
            {
                navLink.map(link => <Link className='navLink' key={link.title} to={link.path}>{link.title}</Link>)
            }
        </div>
        </div>

    </nav>
    <nav className='mobileNav'>
    <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
    <Menu />
    </IconButton>
    <Link to='/' className='mobileLogo'>
       <img src="/assets/logo.jpg" alt="steeldalal"  />
    </Link>
    <IconButton>
    <SearchIcon />
    </IconButton>
    </nav>

    <SideDrawer openSideNav={openDrawer} onCloseHandler={() => setOpenDrawer(!openDrawer)} />
    </>
  )
}

export default Nav