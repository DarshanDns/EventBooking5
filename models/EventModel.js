const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    time: String,
    venue: String,
    about: String,
    image: String,
    price: Number,
    date: String
});

module.exports = mongoose.model('EventModel', eventSchema);
