// Load enviromental variables from .env files
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const initializeDatabase = require("./db/db.connection");
const Recipe = require("./models/recipe.model");

// cors config
const corsOptions = {
  origin: "*",
  credentials: true,
};

initializeDatabase();

app.use(express.json());

app.use(cors(corsOptions));

// Function to seed new recipe in db
const seedRecipe = async (recipe) => {
  try {
    const recipeToSave = new Recipe(recipe);
    const savedRecipe = await recipeToSave.save();
    return savedRecipe;
  } catch (error) {
    throw error;
  }
};

//POST method on "/recipes" route
app.post("/recipes", async (req, res) => {
  try {
    const savedRecipe = await seedRecipe(req.body);
    if (savedRecipe) {
      res.status(201).json({
        message: "Recipe saved successfully",
        savedRecipe,
      });
    } else {
      res.status(400).json({
        message: "Some error occured while saving new recipe",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save new recipe" });
  }
});

// Function get all recipes from db
const readRecipes = async () => {
  try {
    const recipes = await Recipe.find();
    return recipes;
  } catch (error) {
    throw error;
  }
};

// GET method on "/recipes route" to get all recipes
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await readRecipes();
    if (recipes.length > 0) {
      res.status(200).json({
        message: "Recipes fetched successfully",
        recipes,
      });
    } else {
      res.status(404).json({
        message: "No recipes found.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

// Function to delete recipe from db
const deleteRecipe = async (recipeId) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
    return deletedRecipe;
  } catch (error) {
    throw error;
  }
};

// DELETE method on "/recipes/:recipeId" to delete recipe
app.delete("/recipes/:recipeId", async (req, res) => {
  const recipeId = req.params.recipeId;
  try {
    const deletedRecipe = await deleteRecipe(recipeId);
    if (deleteRecipe) {
      res.status(200).json({
        message: "Successfully deleted recipe",
        deletedRecipe,
      });
    } else {
      res.status(400).json({
        message: "Failed to delete recipes",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete recipes" });
  }
});

// Listiening to the port for HTTP requests
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
