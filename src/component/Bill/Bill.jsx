import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import tick_icon from '../assets/tick.png';
import remove_icon from '../assets/remove.png';
import './Bill.css';

export const Bill = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUnpaidBills = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/bills/unpaid', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBills(data);
      } catch (error) {
        setError(`Failed to fetch unpaid bills: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUnpaidBills();
  }, []);

  const handlePayBill = async (billId) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/payments/pay/${billId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to pay bill: ${errorData.message || response.statusText}`);
      }
      // Remove the paid bill from the state
      setBills(prevBills => prevBills.filter(bill => bill._id !== billId));
      alert('Bill paid successfully!');
    } catch (error) {
      alert(`Failed to pay bill: ${error.message}`);
      setError(error.message);
    }
  };

  const handleRemoveBill = async (billId) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/payments/remove/${billId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Error response:`, errorData);
        throw new Error(`Failed to remove bill: ${errorData.message || response.statusText}`);
      }
      // Remove the bill from the state
      setBills(prevBills => prevBills.filter(bill => bill._id !== billId));
      alert('Bill removed successfully!');
    } catch (error) {
      console.error(`Error removing bill:`, error);
      alert(`Failed to remove bill: ${error.message}`);
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Navbar />
      <div className='about-container'>
        <div className='header'>
          <div className='text'> Bill Reminder $ </div>
          <div className='bill-option'>
            <p>Bill To Pay</p>
            <p>Price</p>
            <p>Due Date</p>
            <p>Pay</p>
            <p>Remove</p>
          </div>
          <hr />
          {bills.map((bill, index) => (
            <div key={index} className='bill-format'>
              <p>{bill.description}</p>
              <p>${bill.amount.toFixed(2)}</p>
              <p>{new Date(bill.dueDate).toLocaleDateString()}</p>
              <button onClick={() => handlePayBill(bill._id)}>
                <img src={tick_icon} style={{ height: '25px', width: '25px' }} alt="Pay Bill" />
              </button>
              <button onClick={() => handleRemoveBill(bill._id)}>
                <img src={remove_icon} style={{ height: '25px', width: '20px' }} alt="Remove Bill" />
              </button>
            </div>
          ))}
          <hr />
          <Link to="/addbill" className="button2" style={{ color: 'black' }}>Add Bill</Link>
          <Link to="/homepage" className="submit" style={{ color: 'white' }}>Back to Homepage</Link>
        </div>
      </div>
    </div>
  );
}

export default Bill;
