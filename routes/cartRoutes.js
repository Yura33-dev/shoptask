import express from 'express';

import * as apiController from './../controllers/apiController.js';

export const cartRouter = express.Router();

cartRouter
    .route('/')
    .post(apiController.addToCart)
    .delete(apiController.deleteFromCart)
    .put(apiController.submitCart)