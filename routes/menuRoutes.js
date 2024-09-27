const express = require('express');
const router = express.Router();

//Route for reading menu items
router.get('/menu', (req, res) => {
    res.json([
        { name: 'Coffee', price: 3},
        { name: "Bacon", price: 2.5}
    ]);
});

// Route for creating menu items
router.post('/menu', (req, res) => {
    const newItem = req.body;
    //Add validation
    res.status(201).json({ message: 'Menu item created', data: newItem});
});

// Route for updating menu items
router.put('/menu/:id', (rec, res) => {
    const itemId = req.params.id;
    const updatedItem = req.body;
    // updating logic

    res.json({ message: `Menu item ${itemId} updated`, data: updatedItem });
});

// Route for deleting
router.delete('/menu/:id', (req, res) => {
    const itemId = req.params.id;
    //deletion logic
    
    res.json({ message: `Menu item ${itemId} deleted` })
})

module.exports = router;