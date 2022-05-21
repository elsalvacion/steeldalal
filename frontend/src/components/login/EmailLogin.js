import React, {  useState } from 'react'
import './EmailLogin.css'
import {useDispatch, useSelector} from 'react-redux'
import { loginUser, registerUser, verifyEmailAction } from '../../actions/authAction'
// import {Close, Check} from '@mui/icons-material'
const EmailLogin = ({text}) => {
    const {loading, success, error} = useSelector(state => state.verifyEmail)
   
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('') 
    const [name, setName] = useState('') 
    const [showPass, setShowPass] = useState(false)
    const dispatch = useDispatch()
    const handleEmail = e => {
        if(text === 'register') {
          dispatch(verifyEmailAction(e.target.value))
        }
    }
 
    const handleSubmit = e => {
      e.preventDefault();
      if(text === 'login') {
        dispatch(loginUser({
          email,
          password,
        }))
      } else {
          if(success) {
          dispatch(registerUser({
            email,
            password,
            name
          }))
        }
      }
    }
  return (
    <form onSubmit={handleSubmit} className="loginContentLeft">
        {text === 'register' && <>
        <label htmlFor="name">Name</label>
        <input values={name} onChange={e => setName(e.target.value)} id='name' type="text" placeholder='Enter name' />
        </>}
        <label htmlFor="email">Email</label>
        <input values={email} onChange={e => setEmail(e.target.value)} onBlur={handleEmail} id='email' type="email" placeholder='Enter email' />
        {text === 'register' ? (loading || error || success) && <small className={`${loading || success ? 'success' : error ? 'error' : null}`}>{loading ? loading : error ? error : success ? success : null}</small> : null}
        <label htmlFor="password">Password</label>
        <input id='password' value={password} onChange={e => setPassword(e.target.value)} type={showPass ? 'text' : 'password'} placeholder='Enter password' />
        <div className="showPassword">
          <input onChange={() => setShowPass(!showPass)} type="checkbox" id="showPassword" />
          <label htmlFor="showPassword">Show Password</label>
        </div>
        {/* password check */}
        {/* {
          text === 'register' && <ul className="passwordPass">
            <p>Password must: </p>
            <li className={passwordPass.isLengthy ? 'success' : null}>{passwordPass.isLengthy ? <Check /> : <Close />} Be atleast 8 characters</li>
            <li className={passwordPass.isUppercase ? 'success' : null}>{passwordPass.isUppercase ? <Check /> : <Close />} Contain atleast an uppercase letter</li>
            <li className={passwordPass.isLowercase ? 'success' : null}>{passwordPass.isLowercase ? <Check /> : <Close />} Contain atleast a lowercase letter</li>
            <li className={passwordPass.isNumber ? 'success' : null}>{passwordPass.isNumber ? <Check /> : <Close />} Contain a number</li>
            <li className={passwordPass.isSpecialCharacter ? 'success' : null}>{passwordPass.isSpecialCharacter ? <Check /> : <Close />} Contain atleast a special character: @#!..</li>
          </ul>
        } */}

        <button className='loginSubmitBtn' type="submit">{text}</button>
        
        </form>
  )
}

export default EmailLogin