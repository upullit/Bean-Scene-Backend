const express = require('express');
const router = express.Router();
const TicketOrder = require('../Database/Menu/models/ticket');

//Route to create a new ticket order
router.post('/', async (req, res) => {
    const newOrder = new TicketOrder(req.body); // Creates a new ticket order
    try {
        await newOrder.save();
        res.status(201).json({ message: 'Ticket order created', data: newOrder });
    } catch (error) {
        console.error('Error creating ticket order:', error); // Add this for more detail
        res.status(400).json({ message: 'Error creating ticket order', error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedTicket = await TicketOrder.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.json({ message: 'Ticket updated', data: updatedTicket });
    } catch (error) {
        res.status(500).json({ message: 'Error updating ticket', error });
    }
});

//Route to get all ticket orders
router.get('/', async (req, res) => {
    try {
        const orders = await TicketOrder.find().populate('items.menuItem'); // Fetch all ticket orders
        res.json(orders);
    } catch (error) {
        console.error('Error fetching ticket orders:', error); // Log the error details
        res.status(500).json({ message: 'Error fetching ticket orders', error });
    }
});

//Route to get all completed ticket orders
router.get('/completed', async (req, res) => {
    try {
        const pendingOrders = await TicketOrder.find({ status: 'Completed'}).populate('items.menuItem'); // Fetch all ticket orders
        res.json(pendingOrders);
    } catch (error) {
        console.error('Error fetching ticket orders:', error); // Log the error details
        res.status(500).json({ message: 'Error fetching ticket orders', error });
    }
});

//Route to get all pending orders
router.get('/pending', async (req, res) => {
    try {
        const pendingOrders = await TicketOrder.find({ status: 'Pending'}).populate('items.menuItem'); // Fetch all ticket orders
        res.json(pendingOrders);
    } catch (error) {
        console.error('Error fetching ticket orders:', error); // Log the error details
        res.status(500).json({ message: 'Error fetching ticket orders', error });
    }
});


//Route to get ticket order by id
router.get('/:id', async (req, res) => {
    try {
        const order = await TicketOrder.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch order', error });
    }
});

// Route for deleting ticket order by id
router.delete('/:id', async (req, res) => {
    const orderId = req.params.id;
    try {
        const deletedOrder = await TicketOrder.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: `Order ${orderId} deleted` });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting order', error });
    }
});

module.exports = router;