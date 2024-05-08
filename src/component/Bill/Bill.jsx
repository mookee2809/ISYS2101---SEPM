import React from 'react'
import { Link } from 'react-router-dom'
import './Bill.css'
import Navbar from '../Navbar/Navbar'
import tick_icon from '../assets/tick.png'
import remove_icon from '../assets/remove.png'

export const Bill = () => {
  return (
    <div>
        <Navbar/>

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
        <hr/> 
        <div className='bill-format'>
            <p> Bill to pay </p>
            <p> $12.00 </p>
            <p> 12 November 2024 </p>
            <img src={tick_icon} style={{height:'75px', width:'100px'}}/>
            <img src={remove_icon} style={{height:'75px', width:'80px'}}/>
        </div>
        <hr/>
        <button type="submit" className="button2"><Link style = {{color:'black'}} to='/addbill'> Add Bill </Link> </button>
              

                    <button type="submit" className="submit"><Link style = {{color:'white'}} to='/homepage'> Back to Homepage </Link> </button>
            </div>
        </div>
    </div>
  )
}

export default Bill