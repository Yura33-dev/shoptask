const express = require('express');

const apiController = require('./../controllers/apiController.js');

const cartRouter = express.Router();

cartRouter
    .route('/')
    .post(apiController.addToCart)
    .delete(apiController.deleteFromCart)
    .put(apiController.submitCart)

module.exports = cartRouter;