import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chartjs'; // corrected import statement
import Navbar from '../Navbar/Navbar';
import './Spending.css'
 
export const Spending = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
 
  useEffect(() => {
    if (chartInstance.current) {
    }
    const myChartRef = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(myChartRef, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
          data: [30, 40, 50],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
        }],
      },
    });
    return () => {
      <canvas ref={chartRef} />
    };
  }, []);
 
  return (
  <div>
    <Navbar />
    
      <canvas ref={chartRef} style={{ width: "300px", height: "200px" }} />
 
      <div className='about-container2'>
        <div className='header1'>
          <div className='text'> Total Spending History $ </div>
        <div className='spending-option'>
          
            <p>Bill Paid</p>
            <p> Category </p>
            <p>Price</p>
            <p>Date</p>
        </div>
        <hr/> 

        <div className='spending-format'>
            <p> Jordan 1 Mocha </p>
            <p> Lifestyle</p>
            <p> $400 </p>
            <p> 5 May 2024 </p>
        </div>
        <hr/>
 
          <button type="submit" className="submit"><Link style={{ color: 'white' }} to='/homepage'> Back to Homepage </Link> </button>
</div>
</div>
</div>
  );
};
 
export default Spending;