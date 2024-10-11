const mongoose = require('mongoose');

// Define the schema for a menu item
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: String,
  ingredients: {
    type: [String],
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  isVegan: {
    type: Boolean,
    default: false
  },
  isVegetarian: {
    type: Boolean,
    default: false
  },
  imageUrl: String
});

// Create the MenuItem model based on the schema
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;