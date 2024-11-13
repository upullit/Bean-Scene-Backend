const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const MenuItem = require('../Database/Menu/models/MenuItem');

// Route to generate a PDF of all menu items
router.get('/generatepdf', async (req, res) => {
    try {
        // Fetch menu items from the database
        const menuItems = await MenuItem.find();

        // Group items by category
        const itemsByCategory = menuItems.reduce((acc, item) => {
            if (!acc[item.category]) acc[item.category] = [];
            acc[item.category].push(item);
            return acc;
        }, {});        

        // Create a new PDF document
        const doc = new PDFDocument();
        const filename = 'Bean_Scene_Menu.pdf';

        // Set the response headers to indicate a file download
        res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-type', 'application/pdf');

        // Pipe the PDF document to the response
        doc.pipe(res);

        // Add content to the PDF
        doc.fontSize(20).text('Bean Scene Menu', { align: 'center' });
        doc.moveDown();

        // Add each category and its items to the PDF
        Object.keys(itemsByCategory).forEach(category => {
            doc.fontSize(14).text(category, { underline: true });
            doc.moveDown(0.5);

            itemsByCategory[category].forEach(item => {
                doc
                    .fontSize(12)
                    .text(item.name, { continued: true })
                    .text(`$${item.price.toFixed(2)}`, { align: 'right' });
                doc.fontSize(10).text(item.description, { indent: 20 });
                doc.moveDown();
            });

            doc.moveDown(1); // Space between categories
        });
        // Finalize the PDF and end the document
        doc.end();
    } catch (error) {
        res.status(500).json({ message: 'Failed to generate PDF', error: error.message });
    }
});

//Route for reading menu items
router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.find(); // Fetch all menu items from the database
        res.json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error); // Log the error details
        res.status(500).json({ message: 'Error fetching menu items', error });
    }
});

// Route for reading a specific menu item by ID
router.get('/:id', async (req, res) => {
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
router.post('/', async (req, res) => {
    const newItem = new MenuItem(req.body); // Create a new MenuItem
    try {
        await newItem.save(); // Save the new item to the database
        res.status(201).json({ message: 'Menu item created', data: newItem });
    } catch (error) {
        res.status(400).json({ message: 'Error creating menu item', error });
    }
});

// Route for updating menu items
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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