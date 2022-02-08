var express = require("express");
const User = require("../models/users");
const passport = require("passport");
const authenticate = require("../authenticate");

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", (req, res) => {
  User.register(new User({ email: req.body.email }), req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({ err: err });
    } else {
      if (req.body.firstName) {
        user.firstName = req.body.firstName;
      }
      if (req.body.lastName) {
        user.lastName = req.body.lastName;
      }
      user.save((err) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ err: err });
          return;
        }
        passport.authenticate("local")(req, res, () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, user: user, status: "Registration Successful!" });
        });
      });
    }
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log(req.user);
  const token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    token: token,
    user: {
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    },
    status: "You are succesfully logged in",
  });
});

router.get("/login/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get(
  "/oauth2/redirect/accounts.google.com",
  passport.authenticate("google", { failureRedirect: "/login", failureMessage: true }),
  function (req, res) {
    const token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      token: token,
      user: {
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
      },
      status: "You successfully logged in via Google",
    });
  },
);
module.exports = router;
