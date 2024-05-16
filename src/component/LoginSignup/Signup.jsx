import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import user_icon from '../assets/profile.png';
import password_icon from '../assets/password.png';
import email_icon from '../assets/email.png'

export const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email }),
        });
        const data = await response.json();
        if (response.ok) {
            alert('User registered successfully! Please log in.'); 
            navigate('/');
        } else {
            alert(data.message); 
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'> Sign Up </div>
                <div className='underline'></div>
            </div>
            <form onSubmit={handleSignup}>
                <div className='inputs'>
                    <div className='input'>
                        <img src={user_icon} alt=''/>
                        <input type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className='input'>
                        <img src={email_icon} alt=''/>
                        <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='input'>
                        <img src={password_icon} alt=''/>
                        <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className='forgot-password'> Already Have Account? <span> <Link to="/" style={{color:'black'}}> Log in Here!</Link></span></div>
                <div className="submit-container">
                <button type="submit" className="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
};