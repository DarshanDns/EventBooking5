const express = require('express');
const passport = require('../controllers/authController');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect(`/profile?userid=${req.user.id}`);
});

module.exports = router;
