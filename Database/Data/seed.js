// Seed data file
const mongoose = require('mongoose');
const MenuItem = require('../Menu/models/MenuItem'); // Adjust path as needed
const TicketOrder = require('../Menu/models/ticket'); // Adjust path as needed

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/restaurantdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define your seed data
const menuItemsData = [
  {
    name: "Chicken Salad",
    price: 12.99,
    category: "Lunch",
    description: "A tasty salad with grilled chicken and fresh greens",
    ingredients: ["Lettuce", "Cucumber", "Chicken", "Avocado", "Basil"],
    available: true,
    isVegan: false,
    isVegetarian: false,
    imageUrl: "fakeImg.com"
  },
  {
    name: "Vegan Burger",
    price: 10.99,
    category: "Dinner",
    description: "A delicious plant-based burger",
    ingredients: ["Bun", "Lettuce", "Tomato", "Vegan Patty"],
    available: true,
    isVegan: true,
    isVegetarian: true,
    imageUrl: "fakeImg.com"
  }
];

const ticketOrdersData = [
  {
    items: [
      { menuItem: null, quantity: 2 } // To be updated with MenuItem IDs after insertion
    ],
    status: "Pending",
    totalPrice: 25.22,
    CustomerId: new mongoose.Types.ObjectId()
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await MenuItem.deleteMany();
    await TicketOrder.deleteMany();
    console.log('Existing data cleared');

    // Insert MenuItems
    const insertedMenuItems = await MenuItem.insertMany(menuItemsData);
    console.log('Menu items added:', insertedMenuItems);

    // Update ticketOrdersData with actual MenuItem IDs
    ticketOrdersData[0].items[0].menuItem = insertedMenuItems[0]._id;

    // Insert TicketOrders
    const insertedTicketOrders = await TicketOrder.insertMany(ticketOrdersData);
    console.log('Ticket orders added:', insertedTicketOrders);

  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

// Run the seed function
seedDatabase();