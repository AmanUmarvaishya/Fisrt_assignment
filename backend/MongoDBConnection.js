const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.MONGO_URI;

const connectToMongo = async () => {
  await mongoose.connect(mongoUrl);
};

connectToMongo().then(() => {
  console.log("connect to mongodb Successfully");
});

module.exports = connectToMongo;
