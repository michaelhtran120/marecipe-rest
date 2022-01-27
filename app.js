var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config");

var indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const recipeRouter = require("./routes/recipe");
const shoppingRouter = require("./routes/shopping");

var app = express();

const connect = mongoose.connect(config.mongoUrl);

connect.then(
  () => console.log("Connected correctly to server"),
  (err) => console.log(err),
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/recipes", recipeRouter);
app.use("/shopping", shoppingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
