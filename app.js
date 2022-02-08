require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const recipeRouter = require("./routes/recipe");
const shoppingRouter = require("./routes/shopping");

const app = express();

const connect = mongoose.connect(`${process.env.MONGO_URL}`);

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

app.all("*", (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    res.statusCode = 403;
    res.end("Connection not secure");
  }
});

const whitelist = ["https://127.0.0.1", "https://127.0.0.1:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

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
