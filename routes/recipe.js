const express = require("express");
const Recipe = require("../models/recipe");
const authenticate = require("../authenticate");

const recipeRouter = express.Router();

recipeRouter
  .route("/")
  .get((req, res, next) => {
    Recipe.find()
      .then((recipes) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(recipes);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Recipe.create(req.body)
      .then((recipe) => {
        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.json(recipe);
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

recipeRouter
  .route("/:recipeId")
  .get((req, res, next) => {
    Recipe.findById(req.params.recipeId)
      .then((recipe) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(recipe);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`Post operation not supported on /recipe/${req.params.recipeId}`);
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    Recipe.findByIdAndUpdate(
      req.params.recipeId,
      {
        $set: req.body,
      },
      { new: true },
    )
      .then((recipe) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(recipe);
      })
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Recipe.findByIdAndDelete(req.params.recipeId)
      .then((result) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
      })
      .catch((err) => next(err));
  });

module.exports = recipeRouter;
