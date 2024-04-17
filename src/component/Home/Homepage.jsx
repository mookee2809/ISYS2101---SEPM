import React, { useState, useEffect } from 'react';
import { decodeJWT } from '../utils/decodeJWT'; 

const Homepage = () => {
    const [balance, setBalance] = useState(0);
    const [username, setUsername] = useState('');


    const handleLogout = () => {
        sessionStorage.removeItem('token');
        window.location.href = '/login'; 
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
        <div>
            <h1>Homepage</h1>
            <p>Welcome, {username}!</p>
            <p>Your current balance is: ${balance.toFixed(2)}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Homepage;
