let params = new URLSearchParams(window.location.search);
let id = params.get("id");
let price = params.get("price");



// Get DOM elements for showing response
let totalPrice = document.getElementById('total-price');
totalPrice.textContent = 'Total price:' + ' ' + price + '€';
let responseOrderId = document.getElementById('response-id');
responseOrderId.textContent = 'Order id:' + ' ' + id;

request.onerror = function () {
  // alert('Server error, please try again later');
  const errorServer = document.getElementById('errorServer');
  errorServer.textContent = 'There was an error connecting to the server. ';
};