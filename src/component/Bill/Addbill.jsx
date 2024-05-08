import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './Bill.css'


export const AddBill = () => {
  return (
    <div>
        <Navbar/>

    
        <div className='about-container1'>
        <div className='header'>
            <div className='text'> Add External Bill </div>

            <form2 style={{textAlign:"center"}}>
            <label for="Category" style={{fontSize:"25px", fontWeight:"500"}}>Categories:</label>
            <br></br>
            <br></br>
                <select id="Category" name="" style={{width:"350px", height:"35px", textAlign:"center", fontSize:"15px"}}>

                    <option value="Others">Others</option>
                    <option value="Utilities">Utilities</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>

                </select>
                <br></br>
                <br></br>

                <label for="Categories" style={{fontSize:"20px", fontWeight:"500"}}>Bill To Pay</label>
                <br></br>
                <br></br>
                <input type='text' name="Bill" style={{height:"25px", width:"300px", textAlign:"center"}} />

                <br></br>
                <br></br>

                <label for="Price" style={{fontSize:"20px", fontWeight:"500"}} >Price $:</label>
                <br></br>
                <br></br>
                    <input type="number" name="Bill" style={{height:"25px", width:"300px", textAlign:"center"}} />
                <br /><br />
                 
                <label for="DueDate" style={{fontSize:"20px", fontWeight:"500"}}> Due Date: </label>
                <br></br>
                <br></br>
                    <input type="date" name="date" style={{height:"25px", width:"300px", textAlign:"center"}}/>
                <br /><br />
            </form2>
            
            <div className='submit-container'>
            <button type="submit" className="submit1"><Link style = {{color:'white'}} to='/'> Submit </Link> </button>
            <button type="submit" className="submit1"><Link style = {{color:'white'}} to='/homepage'> Back to Homepage </Link> </button>
            </div>
        </div>
      </div>
    </div>
  )
};




