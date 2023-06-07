import fs from 'fs';


const setId = () => {
    const id = Math.random().toString().slice(2, 8);
    return parseInt(id);
};

export const addToCart = (req, res) => {
    // console.log(req.body);
    const toCookie = {
        id: `order-${setId()}`,
        order: req.body.order,
        numbers:  req.body.numbers,
        total: req.body['total price'],
        image: req.body.image
    }
    res.cookie(toCookie.id, toCookie);
    res.status(200).json({
        status: 'ok'
    });
};


export const deleteFromCart = (req, res) => {
    // console.log(req.body);
    const { id } = req.body;
    res.clearCookie(id);
    
    res.status(200).json({
        status: 'ok'
    });
};

export const submitCart = (req, res) => {
    // console.log(req.body);
    // const data = JSON.stringify(req.body);

    const { customerName, customerEmail, customerPhone, customerAddress, orderList } = req.body;
    if (!customerName || !customerEmail || !customerPhone || !customerAddress || orderList.length < 1) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid input data'
        });
        return;
    }

    const OrderArray = [];
    Object.keys(req.cookies).forEach(key => {
        if (key.startsWith('order-')) {
            OrderArray.push(req.cookies[key]);
        }
    });

    if (OrderArray.length < 1) {
        res.status(400).json({
            status: 'fail',
            message: 'Cart is empty'
        });
        return;
    }
   
    fs.readFile('orders.json', (err, data) => {
        if (err) {
          console.error('Error occured with request file:', err);
        }

        const jsonData = JSON.parse(data);
        jsonData.push({order: req.body});
        const update = JSON.stringify(jsonData);

        fs.writeFile('orders.json', update, (err) => {
            if (err) {
                console.error('Some error occurred during file existing:', err);
                res.status(500);
            } else {
              console.log('JSON file updated successfully!');
            }
        });

        Object.keys(req.cookies).forEach(key => {
            if (key.startsWith('order-')) {
                res.clearCookie(req.cookies[key].id);
            }
        });
        // console.log(req.cookies);
        // res.clearCookie(id);

        res.status(200).json({
            status: 'ok'
        });

    });
    
};