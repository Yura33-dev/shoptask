const resMenu = require("./../utils/getData.js");

exports.getMainPage = (req, res, next) => {
    res.status(200).render('index', {data: resMenu});
};

exports.getPage = (req, res, next) => {

    if (req.params.page === 'shop') {
        res.status(200).render('index', {data: resMenu});
    } 
    else if (req.params.page === 'cart') {
        const OrderArray = [];
        Object.keys(req.cookies).forEach(key => {
            if (key.startsWith('order-')) {
                OrderArray.push(req.cookies[key]);
            }
        })
        res.status(200).render('cart', {data: OrderArray});
    }
   
};
