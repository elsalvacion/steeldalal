import { Typography } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import FacebookLoginBtn from './FacebookLoginBtn'
import GoogleLoginBtn from './GoogleLoginBtn'
import './LoginContent.css'
const LoginContent = () => {
  const {pathname} = useLocation();
  const text = pathname === '/login' ? 'login': 'register'
  const LoginOrRegisterOption = <div className='loginOrRegisterOption'>
    <Typography variant='p' component='p'>New here?</Typography>
    <Link to={`/${text === 'login' ? 'register' : 'login'}`}>{text === 'login' ? 'register' : 'login'}</Link>
  </div>
  return (
    <div className='loginContentMainContainer'>
        <Typography component='h5' variant='h5'>
            {text}
        </Typography>
        <div className="loginContentContainer">
        <form className="loginContentLeft">
        <label htmlFor="email">Email or username</label>
        <input id='email' type="text" placeholder='Enter email or username' />
        <label htmlFor="password">Password</label>
        <input id='password' type="password" placeholder='Enter password' />
        <button className='loginSubmitBtn' type="submit">{text}</button>
        {LoginOrRegisterOption}
        </form>
        <div className="loginContentRight">
        <Typography>Or login with</Typography>
        <GoogleLoginBtn text={text} />
        <FacebookLoginBtn text={text} />
        </div>
        </div>
    </div>
  )
}

export default LoginContent