const mongoose = require("mongoose");
require("dotenv").config;

export const connectDb = async () => {
  try {
    mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log("Error while connecting to the server", err);
  }
};
