
import React, { useState } from 'react'

import { useNavigate } from "react-router-dom"
import axios from 'axios'

export default function PhonePePayment() {

   async function start() {
    try {
      const res = await axios.get('http://localhost:8080/api/data/test')
      console.log(res)
    } catch (e) {
      alert('Error')
    }
  }
  const [amt, setAmt] = useState(1)
  const [mobile, setMobile] = useState('9999999999')


 const navigate = useNavigate();
  const handleClick = () => {
    navigate("/signup");
  };
  
  async function handleclickPay() {
    try {
      const res = await axios.post('http://localhost:8080/api/payment/initiate', { amount: amt, mobile })
      window.location.href = res.data.url;
    } catch (e) {
      alert('Error occur')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>simple Payment</h2>
      <label htmlFor="">enter money</label>
      <input type="number" value={amt} onChange={e=>setAmt(e.target.value)} /> ₹
      <br /><br />
      <label htmlFor="">enter number</label>
      <input type="text" value={mobile} onChange={e=>setMobile(e.target.value)} placeholder="Mobile"/>
      <br /><br />
      <button onClick={handleclickPay}>Pay with PhonePe</button>

      <br />
      <br /><br />

      

<button onClick={handleClick} className="home-btn">
        Logout
      </button>
    </div>
  )
}


  
