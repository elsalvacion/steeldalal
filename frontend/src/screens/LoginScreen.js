import React from 'react'
import {Container} from '@mui/material'
import LoginCard from '../components/login/LoginCard'
import LoginContent from '../components/login/LoginContent'
const LoginScreen = () => {
  return (
   <div style={{
       padding: '50px 0',
       width: '100%'
   }}>
    <Container>
    <LoginCard>
    <LoginContent />
    </LoginCard>
    </Container>
   </div>
  )
}

export default LoginScreen