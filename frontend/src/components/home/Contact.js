import React from 'react'
import {Directions, LinkedIn, Mail, Phone, Send} from '@mui/icons-material';
import { Typography } from '@mui/material';
import './Contact.css'
import {Fade, Zoom} from 'react-reveal';

const Contact = () => {
    const contacts = [
        {
            id: 1,
            icon: <Mail className='contactIcon' />,
            text: 'info@steeldalal.com'
        },
        {
          id: 2,
          icon: <Phone className='contactIcon' />,
          text: '+91-7412-900-222'
      },
      {
        id: 3,
        icon: <Directions className='contactIcon'/>,
        text: `Skybox Business Center,Noida
        Uttar Pradesh, India`
    },
    {
      id: 4,
      icon: <LinkedIn className="contactIcon"/>,
      text: `steel-dalal`
  },
    ]

const contactFormDetails = [
    {
        id: 5,
        label: 'Name',
        name: 'name',
        placeholder: 'Enter your name'
    },
    {
        id: 6,
        label: 'Email',
        name: 'email',
        placeholder: 'Enter your email'
    },
    {
        id: 7,
        label: 'Subject',
        name: 'subject',
        placeholder: 'Enter subject here'
    },
    {
        id: 8,
        label: 'Message',
        name: 'message',
        placeholder: 'Enter message here'
    }
]

    const handleSubmit = e => {
        e.preventDefault()
    }
  return (
    <div className='contactMainContainer' id="contact">
        <Typography align='center' variant='h4' component='h4'>Contact Us</Typography>
        <div className="contactContentContainer">
            <div className="contactContentContainerLeft">
            <form className='contactForm' onSubmit={handleSubmit}>
            {
                contactFormDetails.map(detail =>  <div className='contactFormInput' key={detail.id}>
                    <label htmlFor={detail.name}>{detail.label}</label>
                   {detail.name !== 'message' ?  <input type="text" name={detail.name} placeholder={detail.placeholder} /> : <textarea name={detail.name} placeholder={detail.placeholder}></textarea>
                    }
                </div>)
            }
                   <Zoom>
           <button type='submit'><span>Send</span> <Send/> </button>
           </Zoom>
            </form>
            </div>
            <div className="contactContentContainerRight">
                {
                    contacts.map(contact => <div key={contact.id} className='contactItem'>
                        <Fade>
                        <div className="contactIconContainer">
                        {contact.icon}
                        </div>
                        </Fade>
                        <p>{contact.text}</p>
                    </div>)
                }
            </div>
        </div>
    </div>
  )
}

export default Contact