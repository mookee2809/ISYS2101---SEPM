import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { decodeJWT } from '../utils/decodeJWT'; 
import './Navbar.css'
import logo from '../assets/logo.png'


export const Navbar = () => {

  const [balance, setBalance] = useState(0);
  const [username, setUsername] = useState('');


    const handleLogout = () => {
        sessionStorage.removeItem('token');
        window.location.href = '/'; 
    };
    useEffect(() => {
      const token = sessionStorage.getItem('token');
      if (token) {
          const user = decodeJWT(token);
          if (user && user.username) {
              setUsername(user.username); 
              fetchBalance(token);
          } else {
              console.log('Username not found in JWT');
          }
      }
  }, []);

  const fetchBalance = async (token) => {
      try {
          const response = await fetch('http://localhost:5000/api/income/balance', {
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
          });
          const data = await response.json();
          if (response.ok) {
              setBalance(data.balance);
          } else {
              throw new Error(data.message || 'Unable to fetch balance');
          }
      } catch (error) {
          console.error('Error fetching balance:', error);
      }
};

  return (
    <div className='navbar'>
      <div className="nav-logo">
      <Link to="/Homepage"> <img src={logo} alt="" /></Link>
        <h1>Welcome {username}!</h1>
      </div>

      <div className='nav-signout'>
        <ul className='nav-menu'>
          <li> <Link to="/Homepage">Home</Link></li>
          <li> <Link to="/About"> About </Link>  </li>
          <li> <Link to="/Contact"> Contact </Link> </li>
          <button onClick={handleLogout}> Logout </button>
        </ul>
      </div>
    </div>
  )
}

export default Navbar

