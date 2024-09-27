const express = require('express');
const router = express.Router();

//Example roiute for menu items
router.get('/menu', (req, res) => {
    res.json([
        { name: 'Coffee', price: 3},
        { name: "Bacon", price: 2.5}
    ]);
});

module.exports = router;