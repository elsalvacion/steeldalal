import { Card, CardContent } from '@mui/material'
import React from 'react'
import './LoginCard.css'


const LoginCard = ({children}) => {
  return (
    <div className='loginCardContainer'>
        <Card elevation={2}  sx={{width: '100%'}}>
            <CardContent sx={{width: '100%'}}>
            {children}
            </CardContent>
            
        </Card>
    </div>
  )
}

export default LoginCard