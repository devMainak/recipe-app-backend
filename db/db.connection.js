const mongoose = require("mongoose");

// Accessing mongoDB connection string
const mongoURI = process.env.MONGODB;

// Function for connecting database
const initializeDatatbase = async () => {
  try {
    const connection = await mongoose.connect(mongoURI);
    if (connection) {
      console.log("Connected Successfully");
    } else {
      console.log("Failed to connected to Database.");
    }
  } catch (error) {
    throw error;
  }
};

// Exporting the function
module.exports = initializeDatatbase;
