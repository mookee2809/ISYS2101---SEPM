import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { decodeJWT } from '../utils/decodeJWT';
import './Account.css';

export const ReduceBalance = () => {
    const [balance, setBalance] = useState(0);
    const [reduceAmount, setReduceAmount] = useState(0);

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
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/income/minus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ amount: parseFloat(reduceAmount) }),
            });
            const data = await response.json();
            if (response.ok) {
                setBalance(balance - parseFloat(reduceAmount));
                setReduceAmount(0); // Reset input field after submission
            } else {
                throw new Error(data.message || 'Unable to reduce balance');
            }
        } catch (error) {
            console.error('Error reducing balance:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='about-container'>
                <div className='header'>
                    <h3 style={{ textAlign: 'center', fontSize: '40px' }}>
                        Account Balance:
                        <br></br>
                        ${balance.toFixed(2)}
                    </h3>
                    <div className='modify'>
                        <div className='add'>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    <h2 style={{ textAlign: "center" }}>Reduce Amount $:</h2>
                                    <input
                                        type="number"
                                        name="balance"
                                        style={{ height: "40px", width: "250px", fontSize: "25px" }}
                                        value={reduceAmount}
                                        onChange={(e) => setReduceAmount(e.target.value)}
                                    />
                                </label>
                                <input type="submit" value="Submit" className='button3' style={{ left: "25%" }} />
                            </form>
                            <br></br>
                        </div>
                    </div>
                    <button type="submit" className="submit"><Link style={{ color: 'white' }} to='/account'> Back to Account </Link> </button>
                    <button type="submit" className="submit"><Link style={{ color: 'white' }} to='/homepage'> Back to Homepage </Link> </button>
                </div>
            </div>
        </div>
    );
};


export default ReduceBalance;
