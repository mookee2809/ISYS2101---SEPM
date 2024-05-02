import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { decodeJWT } from '../utils/decodeJWT'; 
import './Account.css'


export const Account = () => {
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const user = decodeJWT(token);
            if (user && user.username) { 
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
    }
  return (
    <div>
        <Navbar/>

        <div className='about-container'>
        <div className='header'>
            <h3 style={{textAlign:'center', fontSize:'40px'}}> 
            Account Balance: 
            <br></br>
            ${balance.toFixed(2)}</h3>
            <br></br>
            <div className='modify'>
                <div className='add'>
                <button type="submit" className="button2"><Link style = {{color:'black'}} to='/addbalance'> Add Balance </Link> </button>
                <button type="submit" className="button2"><Link style = {{color:'black'}} to='/reducebalance'> Reduce Balance </Link> </button>
                </div>


            </div>

                    <button type="submit" className="submit"><Link style = {{color:'white'}} to='/homepage'> Back to Homepage </Link> </button>
            </div>
        </div>
    </div>
  )
}

export default Account