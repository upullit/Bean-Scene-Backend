const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem'); // Importing menu model

// Connecting to Mongodb
mongoose.connect('mongodb://localhost:27017/restaurantdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Dummy data for the menu
const menuItems = [
  {
    name: "Chicken Salad",
    price: 12.99, 
    category: "Lunch",
    description: "A tasty salad with grilled chicken and fresh greens",
    ingredients: ["Lettuce", "Cucumber", "Chicken", "Avocado", "Basil"],
    available: true,
    isVegan:  false,
    isVegetarian: false,
    imageUrl: "fakeImg.com"
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    await MenuItem.deleteMany(); // This deletes any existing documents in the collection
    console.log('Existing menu items cleared');
    // Add new dummy data
    await MenuItem.insertMany(menuItems);
    console.log('Dummy menu items added successfully');
    // Fetch and log the added items
    const findResult = await MenuItem.find({});
    console.log('Menu items found:', findResult);

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding the database:', error);
    mongoose.connection.close();
  }
};

// Run the seed function
seedDatabase();

