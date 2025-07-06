const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: {
    //here date is automatically create and store when user give our information
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("socail-logins", UserSchema);

module.exports = UserModel;
