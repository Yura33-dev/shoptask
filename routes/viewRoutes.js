import express from 'express';
import * as viewController from './../controllers/viewController.js';

export const viewRouter = express.Router();

viewRouter
    .route('/')
    .get(viewController.getMainPage)

viewRouter
    .route('/:page')
    .get(viewController.getPage)