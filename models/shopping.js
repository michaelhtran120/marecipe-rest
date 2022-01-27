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
  measurement: {
    type: String,
    required: true,
    default: "grams",
  },
});

const shoppingSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  ingredients: [ingredientSchema],
});

module.exports = mongoose.model("Shopping", shoppingSchema);
