document.addEventListener('DOMContentLoaded', () => {
    const cart = document.querySelector('.showCartItems'),
          closeButtons = cart.querySelectorAll('.btn-close'),
          inputs = cart.querySelectorAll('.order-input'),
          formToSubmit = document.querySelector('.makeOrder');

    const updateTotalPrice = () => {
        let totalPrice = 0;
        const regex = /\$(.*)/;

        cart.querySelectorAll('.priceString').forEach(item => {
            const match = item.textContent.match(regex);
            if (match) {
                totalPrice+= parseInt(match[1]);
            }
        });
        cart.querySelector('.totalsum').firstChild.textContent = `Total price: $${totalPrice}`;
        if (totalPrice === 0) {
            cart.querySelector('.totalsum').firstChild.textContent = `Your cart is empty!`;
        }
    };
    updateTotalPrice();


    closeButtons.forEach(btnClose => {
        btnClose.addEventListener('click', (e) => {
            if (e.target) {
                // console.log(e.target.closest('.item').getAttribute('data-id'));

                const toDelete = {
                    id: e.target.closest('.item').getAttribute('data-id')
                };
                fetch('/api/v1/cart', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(toDelete)
                    
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'ok') {
                            e.target.closest('.item').remove();
                            updateTotalPrice();
                        }
                    })
                    .catch(error => console.log(error));
            }
        });
    });

    //--- Add or Delete order items
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {

            input.closest('.order-info').firstChild.nextElementSibling.textContent = `Price: $${parseInt(e.target.value) * input.closest('.item').getAttribute('data-price')}`;
            input.closest('.order-info').nextElementSibling.firstChild.textContent = `x${e.target.value}`;
            updateTotalPrice();
        });
    });
    
    // Form to Submit Order
    formToSubmit.addEventListener('submit', (e) => {
        if (e.target) {
            e.preventDefault();

            const order = {
                customerName: formToSubmit.exampleFormControlInput1.value,
                customerEmail: formToSubmit.exampleFormControlInput2.value,
                customerPhone: formToSubmit.exampleFormControlInput3.value,
                customerAddress: formToSubmit.exampleFormControlInput4.value,
                orderList: []
            };
            
            const items = cart.querySelectorAll('.item');
            items.forEach(item => {

                const obj = {
                    name: item.querySelector('h5').textContent,
                    price: item.querySelector('p.priceString').textContent,
                    count: item.querySelector('input').value
                }
                order.orderList.push(obj);
            });
            order.totalPrice = document.querySelector('.totalsum').firstChild.textContent;
           

            fetch('/api/v1/cart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'ok') {
                        // console.log('Cart was send to server');
                        cart.querySelectorAll('.item').forEach(item => item.remove());
                        document.querySelector('.totalsum').firstChild.textContent = 'Your order submited to server! Thank you! =)'
                    } else {
                        console.log(data.message);
                    }
                })
                .catch(error => console.log(error));
        };
    });
});