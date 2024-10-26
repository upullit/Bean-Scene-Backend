const express = require('express');
const mongoose = require('mongoose');
const menuRoutes = require('./routes/menuRoutes'); // Importing menu routes
const ticketRoutes = require('./routes/ticketRoutes'); // Importing ticket routes

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/restaurantdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());

// API Routes
app.use('/api/menuitems', menuRoutes); // Add menu routes
app.use('/api/ticketorders', ticketRoutes); // Add ticket routes

// Root route
app.get('/', (req, res) => {
    res.send('API is running');
});

// Optional: Uncomment to seed the database with dummy data
// const seedDatabase = async () => {
//     const menuItems = [
//         { name: "Chicken Salad", price: 12.99, category: "Lunch", description: "A tasty salad with grilled chicken and fresh greens", ingredients: ["Lettuce", "Cucumber", "Chicken", "Avocado", "Basil"], available: true, isVegan: false, isVegetarian: false, imageUrl: "fakeImg.com" }
//     ];
//     await MenuItem.deleteMany();
//     console.log('Existing menu items cleared');
//     await MenuItem.insertMany(menuItems);
//     console.log('Dummy menu items added successfully');
// };
// seedDatabase();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});