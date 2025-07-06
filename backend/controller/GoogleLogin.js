const UserModel = require("../models/GoogleUserModel");
const { oauth2client } = require("../utils/googleConfig");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { datacatalog_v1beta1 } = require("googleapis");
require("dotenv").config();

const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;
    console.log(code);
    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    console.log(userRes)

    const { email, name } = userRes.data;
    const { date } = userRes.headers;
    // console.log(date);
    let user = await UserModel.findOne({ email });
    // console.log(user);
    if (!user) {
      user = await UserModel.create({ name, email, date });
    }
    const { _id } = user;
    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });
    return res.status(200).json({
      message: "Success",
      token,
      user,
    });
  } catch (err) {
    // console.log(err);
    // console.log("ok ", err);
    res.status(400).json({ message: "internal server error" });
  }
};

module.exports = googleLogin;
