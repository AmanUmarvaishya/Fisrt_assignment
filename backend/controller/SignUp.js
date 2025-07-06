const User = require("../models/User"); //for user model eshtablish
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const SignUp = async (req, res) => {
  //if there are  error, return bad request and the the error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Check wheather the user with this email already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    await user.save();
    console.log(user);
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken, message: "User created", success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "some error occured" });
  }
};

module.exports = {
  SignUp,
};
