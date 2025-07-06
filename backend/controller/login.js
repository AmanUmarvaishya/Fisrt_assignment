const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
  //if there are  error, return bad request and the the error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    // Check wheather the user with this email already
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Enter valid email address", success: false });
    }

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res
        .status(401)
        .json({ message: "User valid password", success: false });
    }

    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken, message: "welcome", success: true });
  } catch (error) {
    console.error(error.message);
    res.status(400).send("internal server error");
  }
};

module.exports = { login };
