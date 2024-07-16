const mongoose = require('mongoose');
const ticketSchema = require('./TicketModel');

const combinedSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profilePicture: {
        data: Buffer,
        contentType: String
    },
    googleId: String,
    tickets: [ticketSchema]
});

module.exports = mongoose.model('CombinedModel', combinedSchema);
