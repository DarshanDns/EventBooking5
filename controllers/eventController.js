const EventModel = require('../models/EventModel');

exports.getEventById = async (req, res) => {
    try {
        const event = await EventModel.findById(req.params.id);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
