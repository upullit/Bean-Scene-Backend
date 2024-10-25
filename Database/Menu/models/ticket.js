const mongoose = require('mongoose');

const orderedItemSchema = new mongoose.Schema({
    menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    specialInstructions: {
        type: String,
        default: ''
    }
});

const ticketSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: false
    },
    CustomerId: {
        type: mongoose.Schema.ObjectId, // temporary customer Id insert here 
        // adding a customer schema for loyalty programs
        ref: 'Customer',
        required: true
    },
    items: [orderedItemSchema],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Preparing', 'Ready', 'Completed'],
        default: 'Pending'
    },
    timePlaced: {
        type: Date,
        default: Date.now
    }
});
  
// Create the ticket model based on the schema
const ticket = mongoose.model('ticket', ticketSchema);
  
module.exports = ticket;