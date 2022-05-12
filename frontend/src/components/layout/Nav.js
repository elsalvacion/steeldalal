import React from 'react'
import {AppBar, Toolbar} from '@mui/material'
import styled from '@emotion/styled'
import { colors } from '../../constants/colors'
import { Link } from 'react-router-dom'
import { navLink } from '../../constants/links'
import { styles } from '../../constants/styles'
import './Nav.css'
// import Search from './Search'

const NavContent = styled.div`
    display: flex;
    align-items: center;
    
    width: 100%;
`
const NavLinks = styled.div`
    display: flex;
    align-items: center;
    margin-left: 30px;
`
const Nav = () => {
  return (
    <AppBar position='sticky' elevation={1}>
    <Toolbar sx={{
        backgroundColor: 'white'
    }}>
        <NavContent>
        {/* logo */}
        <Link to='/' style={{
                    color: colors.darkGrey,
                    fontSize: styles.largeFontSize,
                    textDecoration: 'none'
        }}>
       
        <img src="/assets/logo.jpg" alt="steeldalal" style={{
            height: 40
        }} />
        </Link>
        
        {/* nav links */}
        <NavLinks>
            {
                navLink.map(link => <Link className='navLink' key={link.title} to={link.path}>{link.title}</Link>)
            }
        </NavLinks>
        {/* <Search /> */}
        </NavContent>
    </Toolbar>
    </AppBar>
  )
}

export default Nav