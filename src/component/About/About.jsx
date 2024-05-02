import React from 'react'
import { Link } from 'react-router-dom'
import './About.css'
import Navbar from '../Navbar/Navbar'


export const About = () => {

    return (
    <div>
        <Navbar/>
    
        
       <div className='about-container'>
        <div className='header'>
            <div className='text'> About Us! </div>

                <p> Welcome to Our Financial App, where financial empowerment meets modern convenience.
                    <br></br>
                    We understand that managing finances can be daunting, which is why we've crafted a seamless platform designed to simplify your financial journey.
                    <br></br>
                    <br></br>
                    At Our Financial App, we believe that everyone deserves access to tools that help them achieve their financial goals, regardless of their background or expertise. 
                    Whether you're a seasoned investor or just starting to save, our user-friendly interface and powerful features are tailored to meet your needs.
                    <br></br>
                    <br></br>
                    Our team is dedicated to providing you with the resources and support you need to take control of your finances and build a secure future. From budgeting tools to 
                    investment insights, we're here to help you make informed decisions every step of the way
                    With Our Financial App, managing your money has never been easier. Join our community today and embark on a journey towards financial freedom.</p>

                    <button type="submit" className="submit"><Link style = {{color:'white'}} to='/homepage'> Back to Homepage </Link> </button>
            </div>
        </div>
    </div>
  )
}
