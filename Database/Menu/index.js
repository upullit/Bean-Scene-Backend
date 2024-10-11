const express = require('express')
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem'); // Importing menu model

const app = express();
const port = 3000;

app.use(express.json());

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




// API Routes
app.get('/', (req, res) => {
  res.send('API is running');
});

// Route to get all menu items
app.get('/api/menuitems', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving menu items', error });
  }
});

// Route to add a new menu item
app.post('/api/menuitems', async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: 'Error adding menu item', error });
  }
});

// Route to delete a menu item by ID
app.delete('/api/menuitems/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted', deletedItem });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});