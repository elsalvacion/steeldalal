import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { LOGIN_USER_RESET } from '../../reducers/types/authTypes'
import Loading from '../layout/Loading'
import CustomAlert from './CustomAlert'
import EmailLogin from './EmailLogin'
import FacebookLoginBtn from './FacebookLoginBtn'
import GoogleLoginBtn from './GoogleLoginBtn'
import './LoginContent.css'
const LoginContent = () => {
  const {pathname} = useLocation();
  const {loading:userLoading, userInfo, error:userError} = useSelector(state => state.userLogin)
  const text = pathname === '/login' ? 'login': 'register'
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    if(userInfo) history.push('/profile')
  }, [userInfo, history])
  const LoginOrRegisterOption = <div className='loginOrRegisterOption'>
    <Typography variant='p' component='p'>{text === 'login' ? 'New here? ' : 'Already have an account? '}</Typography>
    <Link to={`/${text === 'login' ? 'register' : 'login'}`}>{text === 'login' ? 'register' : 'login'}</Link>
  </div>
  return (
    <div className='loginContentMainContainer'>
        {userLoading && <Loading text={text === 'login' ? 'Logging.. in': 'Registering...'} />}
        {userError && <CustomAlert type='error' text={userError} handleClose={() => dispatch({type: LOGIN_USER_RESET})} />}
        <Typography component='h5' variant='h5'>
            {text}
        </Typography>
        <div className="loginContentContainer">
        <EmailLogin text={text}  />
        <div className="loginContentRight">
        
        <GoogleLoginBtn text={text} />
        <FacebookLoginBtn text={text} />
        {LoginOrRegisterOption}
        </div>
        </div>
    </div>
  )
}

export default LoginContent