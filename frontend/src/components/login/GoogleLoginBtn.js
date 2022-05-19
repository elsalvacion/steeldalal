import React from 'react'
import './GoogleLoginBtn.css'
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from '@mui/icons-material/Google';
const GoogleLoginBtn = ({text}) => {
    const responseGoogle = (response) => {
        console.log(response);
      }
  return (
    <div className='googleLoginContainer'>
    <GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    render={renderProps => (
        <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='googleLoginBtn'>
            <GoogleIcon /> <span>{text} with google</span>
        </button>
      )}
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
    />
    </div>
  )
}

export default GoogleLoginBtn