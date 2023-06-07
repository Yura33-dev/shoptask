import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

import { viewRouter }  from './routes/viewRoutes.js';
import { cartRouter } from './routes/cartRoutes.js';


app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({
    limit: '10kb'
}));
app.use(morgan('dev'));
app.use(cookieParser());


app.use('/', viewRouter);
app.use('/api/v1/cart', cartRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log('Server listening on PORT:', port);
});

