const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    orderId: String,
    paymentId: String,
    signature: String,
    amount: Number,
    currency: String,
    status: String,
    concertName: String,
    created_at: { type: Date, default: Date.now }
});

module.exports = ticketSchema;
