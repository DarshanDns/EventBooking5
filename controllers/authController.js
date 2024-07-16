const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const CombinedModel = require('../models/CombinedModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (token, tokenSecret, profile, done) => {
    try {
        let user = await CombinedModel.findOne({ googleId: profile.id });
        if (!user) {
            user = new CombinedModel({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
            });
            await user.save();
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await CombinedModel.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
