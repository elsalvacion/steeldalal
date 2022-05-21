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
    appId="395661519114695"
    autoLoad={false}
    fields="name,email,picture"
    callback={responseFacebook} 
    cssClass="facebookLoginBtn"
    textButton={`${text} with facebook`}
    icon={<FacebookIcon className="facebookLoginIcon" />}
   
   
    />
    
   
    </div>
  )
}

export default FacebookLoginBtn