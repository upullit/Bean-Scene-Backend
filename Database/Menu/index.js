const express = require('express')
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem'); // Importing menu model
const ticket = require('./models/ticket')  // Importing ticket model

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

// API Routes for menu items
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


// API routes for menu items.

// Route to create a new ticket order / customer makes an order
app.post('/api/ticket', async (req, res) => {
  try {
    const newOrder = new ticket(req.body)
    await mewOrder.save()
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error });
  }
});

// Route to look at all ticket orders
app.get('/api/ticket', async (req, res) => {
  try {
    const orders = await ticket.find().populate('items.menuItem')
    res.json(orders);
  } catch (error){
    res.status(500).json({ message: 'Error retrieving orders', error });
  }
});

// Route to get all pending ticket orders
app.get('/api/ticketorders/pending', async (req, res) => {
  try {
    const pendingOrders = await ticket.find({ status: 'pending' }).populate('items.menuItem');
    res.json(pendingOrders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving pending orders', error });
  }
});

// Route to get a ticket order by ID
app.get('/api/ticketorders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await TicketOrder.findById(id).populate('items.menuItem');  // Fetch specific order by ID with menu item details
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the order', error });
  }
});

// Route to delete a ticket order by ID
app.delete('/api/ticketorders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await TicketOrder.findByIdAndDelete(id);  // Deletes the order by ID
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted', deletedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the order', error });
  }
});