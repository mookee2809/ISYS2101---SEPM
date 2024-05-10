import React, {useState} from 'react'
import { link } from 'react-router-dom';
import './Balance.css'


function Balance() {
  return (
    <div className='option'> 
        <div class="balance">
          <div class="about-col">
            <h3>Account Balance $</h3>
            <h2> $3.000.000,-</h2>
            <a href="#" class="hero-btn1">Balance Details</a>
          </div>
          <div class="about-col">
            <h3>Monthly Spending $ </h3>
            <h2> $1.200.000,-</h2>
            <a href="#" class="hero-btn1">Check Details</a>
          </div>
          <div class="about-col">
            <h3>Bill Reminder $ </h3>
            <a href="#" class="hero-btn1">See Details</a>
          </div>
        </div>
    </div>
  )
}

export default Balance


