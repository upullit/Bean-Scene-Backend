const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const menuRoutes = require('./routes/menuRoutes'); // Importing menu routes
const ticketRoutes = require('./routes/ticketRoutes'); // Importing ticket routes
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/restaurantdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/menuitems', menuRoutes); // Add menu routes
app.use('/api/ticketorders', ticketRoutes); // Add ticket routes
app.use('/api/auth', authRoutes); // Add auth routes

// Root route
app.get('/', (req, res) => {
    res.send('API is running');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});