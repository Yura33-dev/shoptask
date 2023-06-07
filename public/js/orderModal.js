document.addEventListener('DOMContentLoaded', () => {

    const modals = document.querySelectorAll('.modal.fade');

    modals.forEach(modal => {

        modal.querySelectorAll('input.itemNumbers').forEach(item => {
            item.addEventListener('input', () => {
                item.closest('form').nextElementSibling.nextElementSibling.textContent = `Total: $${item.value * item.getAttribute('data-price')}`;
                item.closest('form').nextElementSibling.nextElementSibling.setAttribute('data-total', item.value * item.getAttribute('data-price'));
            });
        });

        modal.querySelectorAll('.btnToCart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (e.target) {                    
                    const toCart = {
                        order: e.target.previousElementSibling.previousElementSibling.textContent,
                        numbers: e.target.previousElementSibling.value,
                        'total price': e.target.previousElementSibling.value * e.target.previousElementSibling.getAttribute('data-price'),
                        image: e.target.closest('.modal-body').firstChild.getAttribute('src')
                    };
                    // console.log(toCart.image);

                    fetch('/api/v1/cart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(toCart)
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (!data.status === 'ok') {
                                console.log('Something went wrong! =(')
                            } else {
                                modal.querySelector('.modal-header').lastChild.click();
                            }
                        })
                        .catch(error => console.log('Some error:', error));
                }
            });
        });
    });
    
});