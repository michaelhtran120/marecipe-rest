const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/users");

exports.local = passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// exports.verifyUser = passport.authenticate
