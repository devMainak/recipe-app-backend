const mongoose = require("mongoose");

// Defining recipes Schema
const recipesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  dishImageUrl: {
    type: String,
    required: true,
  },
});

// Defining recipes model
const Recipe = mongoose.model("more-recipes", recipesSchema);

// Exporting modules
module.exports = Recipe;
