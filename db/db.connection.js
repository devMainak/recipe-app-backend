const mongoose = require("mongoose");

// Accessing mongoDB connection string
// const mongoURI = process.env.MONGODB;

// Function for connecting database
const initializeDatatbase = async () => {
  try {
    const connection = await mongoose.connect("mongodb+srv://neoGStudent:neoGDB2024@neog.zwpra3f.mongodb.net/?retryWrites=true&w=majority&appName=neoG");
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
