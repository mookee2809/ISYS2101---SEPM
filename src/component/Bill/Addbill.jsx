import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Bill.css';

export const AddBill = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const billData = {
      category: formData.get('Category'),
      description: formData.get('Bill'),
      amount: formData.get('Price'),
      dueDate: formData.get('date'),
    };

    if (!billData.description || !billData.amount || !billData.dueDate || !billData.category) {
      const errorMessage = 'All fields must be filled out.';
      alert(errorMessage);
      setError(errorMessage);
      return;
    }

    billData.amount = parseFloat(billData.amount);
    if (isNaN(billData.amount)) {
      const numericError = 'Please enter a valid amount.';
      alert(numericError);
      setError(numericError);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/newbills/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(billData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        const responseError = errorData.message || `HTTP error! Status: ${response.status}`;
        alert(responseError);
        throw new Error(responseError);
      }
      alert('Bill added successfully!');
      navigate('/Bill');
    } catch (error) {
      alert(error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='about-container1'>
        <div className='header'>
          <div className='text'> Add External Bill </div>
          <form onSubmit={handleSubmit} style={{textAlign: "center"}}>
            <label htmlFor="Category" style={{fontSize: "25px", fontWeight: "500"}}>Categories:</label>
            <br/><br/>
            <select id="Category" name="Category" style={{width: "350px", height: "35px", textAlign: "center", fontSize: "15px"}}>
              <option value="Others">Others</option>
              <option value="Utilities">Utilities</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
            </select>
            <br/><br/>

            <label htmlFor="Bill" style={{fontSize: "20px", fontWeight: "500"}}>Bill To Pay</label>
            <br/><br/>
            <input type='text' name="Bill" style={{height: "25px", width: "300px", textAlign: "center"}} />
            <br/><br/>

            <label htmlFor="Price" style={{fontSize: "20px", fontWeight: "500"}}>Price $:</label>
            <br/><br/>
            <input type="number" name="Price" style={{height: "25px", width: "300px", textAlign: "center"}} />
            <br/><br/>

            <label htmlFor="date" style={{fontSize: "20px", fontWeight: "500"}}>Due Date:</label>
            <br/><br/>
            <input type="date" name="date" style={{height: "25px", width: "300px", textAlign: "center"}}/>
            <br/><br/>
            <button type="submit" className="submit" style={{color: 'white'}}>Submit</button>
            <Link to='/homepage' className="submit" style={{color: 'white', marginTop:'50px', marginBottom:'30px'}}>Back to Homepage</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBill;