import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './LoginSignup.css';
import user_icon from '../assets/profile.png';
import password_icon from '../assets/password.png';


export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            sessionStorage.setItem('token', data.token);
            navigate('/homepage');
        } else {
            alert(data.message);
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'> Login </div>
                <div className='underline'></div>
            </div>
            <form onSubmit={handleLogin}>
                <div className='inputs'>
                    <div className='input'>
                        <img src={user_icon} alt=''/>
                        <input type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className='input'>
                        <img src={password_icon} alt=''/>
                        <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className="forgot-password">Forgot Password?<span> <Link to="/Forgotpass">Click Here!</Link> </span></div>
                <div className='forgot-password'> No account yet? <span> <Link to="/signup">Sign Up Here!</Link></span></div>
                <div className="submit-container">
                    <button type="submit" className="submit">Login</button>
                </div>
            </form>
        </div>
    );
};