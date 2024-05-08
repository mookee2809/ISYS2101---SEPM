import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'


export const Contactsubmit = () => {
  return (
    <div>
        <Navbar/>

        <div className='about-container'>
        <div className='header'>
            <div className='text'> Thank you for contacting us! </div>

                <p> Thank you for reaching out to Our Financial App! We truly appreciate you taking the time to connect with us.
                    <br></br>
                    <br></br>
                    Your inquiry is important to us, and we're dedicated to providing you with the assistance and information you need. 
                    Our team is working diligently to address your message promptly.
                    Please rest assured that we've received your message and are actively working on a response. 
                    <br></br>
                    <br></br>
                    Once again, thank you for contacting our Financial App. We look forward to assisting you further and appreciate the opportunity to serve you.
                    <br></br>
                    <br></br>
                    Warm regards,
                    <br></br>
                    Group 5 Financial App Team</p>

                    <button type="submit" className="submit"><Link style = {{color:'white'}} to='/homepage'> Back to Homepage </Link> </button>
            </div>
        </div>
    </div>
  )
}

export default Contactsubmit