const express = require('express');
const viewController = require('./../controllers/viewController.js');

const viewRouter = express.Router();

viewRouter
    .route('/')
    .get(viewController.getMainPage)

viewRouter
    .route('/:page')
    .get(viewController.getPage)

module.exports = viewRouter; 