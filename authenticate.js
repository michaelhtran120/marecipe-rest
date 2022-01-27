const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/users");
const JwtStrategy = require("passport-jwt").Strategy;
// Obj to provide helper methods - will use one to extract token from req obj.
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const config = require("./config.js");

exports.local = passport.use(User.createStrategy());
// exports.local = passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => {
  return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
  new JwtStrategy(
    // prettier-ignore
    opts,
    (jwt_payload, done) => {
      console.log("JWT payload: ", jwt_payload);
      User.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) {
          return done(err, false);
        } else if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    },
  ),
);

// session false to indicate we are not using sessions
exports.verifyUser = passport.authenticate("jwt", { session: false });
