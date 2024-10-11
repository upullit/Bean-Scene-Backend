const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const MenuItem = require('./Database/Menu/models/MenuItem'); // Import the MenuItem model

const menuRoutes = require('./routes/menuRoutes');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/restaurantdb')
    .then(() => {
        console.log('MongoDB connected');
        seedDatabase(); // Call the seed function after MongoDB is connected
    })
    .catch(err => console.error('MongoDB connection error:', err));

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

// Function to seed the database with sample data
async function seedDatabase() {
    const menuItems = [
        {
            name: "Chicken Salad",
            price: 12.99,
            category: "Lunch",
            description: "A tasty salad with grilled chicken and fresh greens",
            ingredients: ["Lettuce", "Cucumber", "Chicken", "Avocado", "Basil"],
            available: true,
            isVegan: false,
            isVegetarian: false,
            imageUrl: "http://example.com/chickensalad.jpg"
        },
        {
            name: "Espresso",
            price: 3.0,
            category: "Beverage",
            description: "A strong, black coffee.",
            ingredients: ["Water", "Coffee Beans"],
            available: true,
            isVegan: true,
            isVegetarian: true,
            imageUrl: "http://example.com/espresso.jpg"
        }
        // Add more items as needed
    ];

    try {
        // Clear the existing menu items
        await MenuItem.deleteMany();
        console.log('Existing menu items cleared');

        // Insert the new sample data
        await MenuItem.insertMany(menuItems);
        console.log('Sample menu items added successfully');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
}