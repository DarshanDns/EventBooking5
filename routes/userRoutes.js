const express = require('express');
const { registerUser, getUserProfile } = require('../controllers/userController');
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.post('/register', upload.single('profile-picture'), registerUser);
router.get('/:id', getUserProfile);

module.exports = router;
