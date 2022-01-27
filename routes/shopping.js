const express = require("express");
const Shopping = require("../models/shopping");
const shoppingRouter = express.Router();
const authenticate = require("../authenticate.js");

shoppingRouter
  .route("/")
  .get((req, res, next) => {
    Shopping.find()
      .then((shoppingLists) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(shoppingLists);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Shopping.create(req.body)
      .then((shoppingList) => {
        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.json(shoppingList);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /recipes");
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /recipe");
  });

shoppingRouter
  .route("/:recipeId")
  .get((req, res, next) => {
    Shopping.findById(req.params.recipeId)
      .then((shoppingList) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(shoppingList);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`Post operation not supported on /recipe/${req.params.recipeId}`);
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    Shopping.findByIdAndUpdate(
      req.params.recipeId,
      {
        $set: req.body,
      },
      { new: true },
    )
      .then((shoppingList) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(shoppingList);
      })
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Shopping.findByIdAndDelete(req.params.recipeId)
      .then((result) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
      })
      .catch((err) => next(err));
  });

module.exports = shoppingRouter;
