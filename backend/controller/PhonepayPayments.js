const express = require('express')
const crypto = require('crypto')
const axios = require('axios')
require('dotenv').config()


const PhonepayPayments =async (req, res) => {
  try {
    
 
  const { amount, mobile } = req.body;
  console.log(req.body)
  const txnId = 'TXN' + Date.now()  //original date 

  const body = {
    merchantId: process.env.MERCHANT_ID,
    merchantTransactionId: txnId,
    merchantUserId: 'USER_' + Date.now(),
    amount: amount * 100,
    redirectUrl: 'http://localhost:5173/signup',
    redirectMode: 'REDIRECT',
    callbackUrl: 'http://localhost:5173/signup',//for successfull payments
    paymentInstrument: { type: 'PAY_PAGE' },
    mobileNumber: mobile
  }

  const b64 = Buffer.from(JSON.stringify(body)).toString('base64')
  const verifyString = b64 + process.env.PHONEPE_API_PATH + process.env.SALT_KEY
  const checksum = crypto.createHash('sha256').update(verifyString).digest('hex') + '###' + process.env.SALT_INDEX

  try {
    const resp = await axios.post(
      `${process.env.PHONEPE_URL}${process.env.PHONEPE_API_PATH}`, 
      { request: b64 },
      { headers: { 'Content-Type': 'application/json', 'X-VERIFY': checksum } }
    )
    res.json({ url: resp.data.data.instrumentResponse.redirectInfo.url })
  } catch (err) {
    console.error(err.response?.data || err)
    res.status(500).json({ error: 'Failed' })
  }
 } catch (error) {
  res.status(400).json({ error: 'Failed internal server '})
    
  }}

module.exports = {PhonepayPayments}