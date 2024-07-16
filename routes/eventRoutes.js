const express = require('express');
const { getEventById } = require('../controllers/eventController');
const router = express.Router();

router.get('/:id', getEventById);

module.exports = router;
