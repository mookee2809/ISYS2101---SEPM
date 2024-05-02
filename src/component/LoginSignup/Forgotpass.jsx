import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginSignup.css'
import email_icon from '../assets/email.png'


export const Forgotpass = () => {
    const [password, setPassword] = useState('');

  return (
    <div className='container'>
    <div className='header'>
        <div className='text'> Forgot Password! </div>
        <div className='underline'></div>
            <h2> Fill in your details and an email will be sended to your account to change your password! </h2>
        <div className='input'>
             <img src={email_icon} alt=''/>
             <input type="password" placeholder='Email' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="submit-container">
            <button type='submit' className="submit"> <Link style = {{color: 'white'}} to="/Forgotsub"> Submit </Link></button>
        </div>
    </div>
    </div>
  )
}

