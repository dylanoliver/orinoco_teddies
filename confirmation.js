let params = new URLSearchParams(window.location.search);
let id = params.get("id");
let price = params.get("price");

// Get DOM elements for showing response
let totalPrice = document.getElementById('total-price');
totalPrice.textContent = 'Total price:' + ' ' + price + '€';
let responseOrderId = document.getElementById('response-id');
responseOrderId.textContent = 'Order id:' + ' ' + id;