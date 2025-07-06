const mongoose = require("mongoose");
const { Schema } = mongoose;

//Schema design for the store user information in the formate
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    //here date is automatically create and store when user give our information
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = User;
