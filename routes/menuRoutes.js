const express = require('express');
const router = express.Router();
const menuItem = require('./Database/Menu/models/MenuItem');

//Route for reading menu items
router.get('/menu', async (req, res) => {
    try {
        const menuItems = await MenuItem.find(); // Fetch all menu items from the database
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu items', error });
    }
});

// Route for reading a specific menu item by ID
router.get('/menu/:id', async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch menu item', error });
    }
});

// Route for creating menu items
router.post('/menu', async (req, res) => {
    const newItem = new MenuItem(req.body); // Create a new MenuItem
    try {
        await newItem.save(); // Save the new item to the database
        res.status(201).json({ message: 'Menu item created', data: newItem });
    } catch (error) {
        res.status(400).json({ message: 'Error creating menu item', error });
    }
});

// Route for updating menu items
router.put('/menu/:id', async (req, res) => {
    const itemId = req.params.id;
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(itemId, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json({ message: `Menu item ${itemId} updated`, data: updatedItem });
    } catch (error) {
        res.status(400).json({ message: 'Error updating menu item', error });
    }
});

// Route for deleting menu items
router.delete('/menu/:id', async (req, res) => {
    const itemId = req.params.id;
    try {
        const deletedItem = await MenuItem.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json({ message: `Menu item ${itemId} deleted` });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting menu item', error });
    }
});

module.exports = router;