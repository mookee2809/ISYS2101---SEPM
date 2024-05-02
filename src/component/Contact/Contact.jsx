import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { Contactsubmit } from './Contactsubmit'
import './Contact.css'


export const Contact = () => {

  return (
    <div>
        <Navbar/>

    
     <div className='about-container'>
        <div className='header'>
            <div className='text'> Contact Us! </div>

            <form2>
            <p>
                <label for="w3review">Any questions? Type your questions!</label>
            </p>
            <textarea id="text" name="questions" rows="10" cols="100"></textarea>
            <br />
            </form2>
            
            <div className='submit-container'>
            <button type="submit" className="submit1"><Link style = {{color:'white'}} to='/ContactSubmit'> Submit </Link> </button>
            <button type="submit" className="submit1"><Link style = {{color:'white'}} to='/homepage'> Back to Homepage </Link> </button>
            </div>
        </div>
      </div>
    </div>
  )
}


