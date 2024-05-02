import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Login } from './component/LoginSignup/Login';
import { Signup } from './component/LoginSignup/Signup';
import Homepage from './component/Homepage/Homepage';
import { Forgotpass } from './component/LoginSignup/Forgotpass';
import { Forgotsub } from './component/LoginSignup/Forgotsub'
import { About } from './component/About/About'
import { Contact } from './component/Contact/Contact'
import { Contactsubmit } from './component/Contact/Contactsubmit';
import { Account } from './component/Account/Account'
import { Spending } from './component/Spending/Spending'
import { Bill } from './component/Bill/Bill'
import { AddBalance } from './component/Account/AddBalance'
import { ReduceBalance } from './component/Account/ReduceBalance'
import { AddBill } from './component/Bill/Addbill'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Forgotpass" element={<Forgotpass />} />
        <Route path="/Forgotsub" element={<Forgotsub />} />
      </Routes>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/Account" element={<Account />} />
        
        <Route path="/Spending" element={<Spending />} />
        <Route path="/Bill" element={<Bill/>} />
      </Routes>

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contactsubmit" element={<Contactsubmit />} />
      </Routes>

      <Routes>
      <Route path='/addbalance' element ={<AddBalance/> }/>
      <Route path='/reducebalance' element ={<ReduceBalance/> }/>
      <Route path='/addbill' element ={<AddBill/> }/>
      </Routes>

     

    </Router>
  );
}

export default App;