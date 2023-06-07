import { resMenu } from "./../utils/getData.js";

export const getMainPage = (req, res, next) => {
    res.status(200).render('index', {data: resMenu});
};

export const getPage = (req, res, next) => {

    if (req.params.page === 'shop') {
        res.status(200).render('index', {data: resMenu});
    } 
    else if (req.params.page === 'cart') {

        // console.log(req.cookies);
        const OrderArray = [];
        Object.keys(req.cookies).forEach(key => {
            if (key.startsWith('order-')) {
                OrderArray.push(req.cookies[key]);
            }
        })
        // console.log(OrderArray);
    
        res.status(200).render('cart', {data: OrderArray});
    }
   
};
