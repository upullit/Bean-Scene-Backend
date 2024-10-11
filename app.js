const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const MenuItem = require('./Database/Menu/models/MenuItem'); // Import the MenuItem model


const menuRoutes = require('./routes/menuRoutes');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/restaurantdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.use(express.json());


// Use the menu routes
app.use('/api', menuRoutes);

//Root route
app.get('/', (req,res) =>{
    res.send('Api running')
})

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})

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

    await MenuItem.deleteMany(); // This deletes any existing documents in the collection
    console.log('Existing menu items cleared');
      // Add new dummy data
      await MenuItem.insertMany(menuItems);
      console.log('Dummy menu items added successfully');
      // Fetch and log the added items
      const findResult = await MenuItem.find({});
      console.log('Menu items found:', findResult);
  
      // Close the connection

  };
  
  seedDatabase();