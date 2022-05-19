import React from 'react'
import './FacebookLoginBtn.css'
import FacebookLogin from 'react-facebook-login';
import FacebookIcon from '@mui/icons-material/Facebook';
const FacebookLoginBtn = ({text}) => {
    const responseFacebook = (response) => {
        console.log(response);
      }
  return (
    <div className='facebookLoginContainer'>
     <FacebookLogin
    appId="1088597931155576"
    autoLoad={false}
    fields="name,email"
    callback={responseFacebook} 
    cssClass="facebookLoginBtn"
    textButton={`${text} with facebook`}
    icon={<FacebookIcon className="facebookLoginIcon" />}
   
   
    />
    
   
    </div>
  )
}

export default FacebookLoginBtn