import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { decodeJWT } from '../utils/decodeJWT'; 
import SpendingChart from './SpendingChart';
import remove_icon from '../assets/remove.png';
import './Spending.css';

export const Spending = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        setError('No token found, user is likely not logged in.');
        setLoading(false);
        return;
      }
      
      const user = decodeJWT(token);
      if (!user || !user.id) {
        setError('Failed to retrieve user information from token.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/spending/transactions/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
        }

        const data = await response.json();
        setTransactions(data);
        setCategories([...new Set(data.map(transaction => transaction.category))]);
      } catch (error) {
        setError(`Failed to fetch transactions: ${error.message}`);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [refreshTrigger]);

  const handleRemoveTransaction = async (transactionId) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/spending/transactions/${transactionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to remove transaction: ${errorData.message || response.statusText}`);
      }
      setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction._id !== transactionId));
      setRefreshTrigger(prev => prev + 1); 
      alert('Transaction removed successfully!');
    } catch (error) {
      console.error(`Error removing transaction:`, error);
      alert(`Failed to remove transaction: ${error.message}`);
      setError(error.message);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredTransactions = selectedCategory
    ? transactions.filter(transaction => transaction.category === selectedCategory)
    : transactions;

  return (
    <div>
      <Navbar />
      <div className='about-container2'>
        <div className='header1'>
          <div className='text'>Total Spending History $</div>
          <SpendingChart refreshTrigger={refreshTrigger} />
          <div>
            <label htmlFor="category-select" style={{fontSize:'20px', fontWeight:'500'}}>Filter By Category: </label>
            <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">All</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className='spending-format'>
          <p> Transaction </p>
          <p> Category </p>
          <p> Amount </p>
          <p> Date </p>
          <p> Remove </p>
          </div>
          <hr></hr>
          {loading && <p>Loading transactions...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && !error && filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => (
              <div key={index} className='spending-format'>
                <p>{transaction.description || 'No Description'}</p>
                <p>{transaction.category || 'No Category'}</p>
                <p>${transaction.amount}</p>
                <p>{new Date(transaction.date).toLocaleDateString()}</p>
                <button onClick={() => handleRemoveTransaction(transaction._id)}>
                  <img src={remove_icon} style={{ height: '25px', width: '20px' }} alt="Remove Transaction" />
                </button>
              </div>
            ))
          ) : (
            <p>No transactions found.</p>
          )}
          <hr/>
          <button type="submit" className="submit">
            <Link style={{ color: 'white' }} to='/homepage'>Back to Homepage</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Spending;
