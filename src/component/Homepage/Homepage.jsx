import React, { useState, useEffect } from 'react';
import { decodeJWT } from '../utils/decodeJWT';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Hompage.css';

const Homepage = () => {
    const [initialBalance, setInitialBalance] = useState(0);
    const [balance, setBalance] = useState(0);
    const [totalSpending, setTotalSpending] = useState(0);
    const [totalBillsAmount, setTotalBillsAmount] = useState(0);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const user = decodeJWT(token);
            if (user && user.username) {
                fetchInitialData(token);
            } else {
                console.log('Username not found in JWT');
            }
        }
    }, []);

    const fetchInitialData = async (token) => {
        await Promise.all([fetchBalance(token), fetchSpendingData(token), fetchUnpaidBills(token)]);
    };

    const fetchBalance = async (token) => {
        try {
            const response = await fetch('http://localhost:5000/api/income/balance', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setInitialBalance(data.balance);
                setBalance(data.balance - totalSpending);
            } else {
                throw new Error(data.message || 'Unable to fetch balance');
            }
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    const fetchSpendingData = async (token) => {
        try {
            const response = await fetch('http://localhost:5000/api/spending/byCategory', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                const total = data.reduce((acc, item) => acc + item.amount, 0);
                setTotalSpending(total);
                setBalance(initialBalance - total);
            } else {
                throw new Error(data.message || 'Unable to fetch spending data');
            }
        } catch (error) {
            console.error('Error fetching spending data:', error);
        }
    };

    const fetchUnpaidBills = async (token) => {
        try {
            const response = await fetch('http://localhost:5000/api/bills/unpaid', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                const totalAmount = data.reduce((acc, bill) => acc + bill.amount, 0);
                setTotalBillsAmount(totalAmount);
            } else {
                throw new Error(data.message || 'Unable to fetch total bills amount');
            }
        } catch (error) {
            console.error('Error fetching total bills amount:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='option'>
                <div className="balance">
                    <div className="about-col">
                        <h3>Account Balance
                            <br />
                            ${balance.toFixed(2)}
                        </h3>
                        <div className='button'><Link to="/Account" style={{color:'black'}}>Check Details!</Link></div>
                    </div>
                    <div className="about-col">
                        <h3>Total Spending $
                            <br></br>
                             {totalSpending.toFixed(2)}</h3>
                        <div className='button' ><Link to="/Spending" style={{color:'black'}}>Check Details!</Link></div>
                    </div>
                    <div className="about-col">
                        <h3>Total Bills Amount $
                            <br></br>
                             {totalBillsAmount.toFixed(2)}</h3>
                        <div className='button'><Link to="/Bill" style={{color:'black'}}>Check Bill Details!</Link></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;