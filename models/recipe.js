const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  proteins: {
    type: Number,
    required: true,
  },
  fats: {
    type: Number,
    required: true,
  },
});

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [ingredientSchema],
    },
    instructions: [{ type: String }],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Recipes", recipeSchema);
