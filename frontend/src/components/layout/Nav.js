import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { navLink } from '../../constants/links'
import './Nav.css'
import Search from './Search'
import {Menu, Search as SearchIcon, AccountCircle, ShoppingCart, GridView} from '@mui/icons-material';
import SideDrawer from './SideDrawer'
import MobileSearch from './MobileSearch'
import { HashLink } from 'react-router-hash-link';

const Nav = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const history = useHistory()
  return (
    <>
    <nav className='navContainer'>
        <div className='topNavContent'>
     {/* logo */}
     <Link to='/' className='logo'>
       
        <img src="/assets/logos/1.png" alt="steeldalal"  />
    
        </Link>
       <div className='searchBarContainer'>
 {/* search bar */}
 <Search />
       </div>
        <div className='topNavLinks'>
        <IconButton title='categories' color='primary'>
                <GridView />
            </IconButton>
        <IconButton title='cart' color='primary'>
                <ShoppingCart />
        </IconButton>
        <IconButton title='account' onClick={() => history.push('/login')} color='primary'>
        <AccountCircle />
        </IconButton>
        </div>
        </div>
        <div className='bottomNavContent'>
        {/* nav links */}
        <div className='navLinks'>
            {
                navLink.map(link => link.title.includes('#') === -1 ? <Link className='navLink' key={link.title} to={link.path}>{link.title}</Link> : <HashLink className='navLink' key={link.title} to={link.path}>{link.title}</HashLink>)
            }
        </div>
        </div>

    </nav>
    <nav className='mobileNav'>
    <IconButton color='primary' onClick={() => setOpenDrawer(!openDrawer)}>
    <Menu />
    </IconButton>
    <Link to='/' className='mobileLogo'>
       <img src="/assets/logos/2.png" alt="steeldalal"  />
    </Link>
    <div>
    <IconButton color='primary' onClick={() => setOpenSearch(!openSearch)}>
    <SearchIcon />
    </IconButton>
    </div>
    </nav>

    <SideDrawer openSideNav={openDrawer} onCloseHandler={() => setOpenDrawer(!openDrawer)} />
    {openSearch && <MobileSearch handleClose={() => setOpenSearch(!openSearch)} />}
    </>
  )
}

export default Nav