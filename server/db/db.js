const mongoose = require("mongoose");
require("dotenv").config

const connectDb = async () => {
    console.log("uri", process.env.DB_URI);
  try {
    mongoose.connect("mongodb+srv://kumarhritik158:Uis9QujGcWX21K0D@cluster0.rybmxqp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",);
  } catch (err) {
    console.log("Error while connecting to the server", err);
  }
};

module.exports = connectDb