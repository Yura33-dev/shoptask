const path = require('path');
const express = require ('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

const viewRouter = require('./routes/viewRoutes.js');
const cartRouter = require('./routes/cartRoutes.js');


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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server listening on PORT:', port);
});

