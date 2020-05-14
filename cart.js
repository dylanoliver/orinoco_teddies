let cart = JSON.parse(localStorage.getItem('cart'));
let section = document.querySelector('#section');

let emptyCart = document.querySelector('#empty-cart');
let fullCart = document.querySelector('#full-cart');
if (localStorage.getItem('cart') === null) {
    fullCart.setAttribute('class', 'd-none');
} else {
    emptyCart.setAttribute('class', 'd-none');
}

for (let i = 0; i < cart.length; i++) {
  let myArticle = document.createElement('article');
  let div1 = document.createElement('div');
  let div2 = document.createElement('div');
  let myH3 = document.createElement('h3');
  let myPara2 = document.createElement('p');

  myH3.textContent = cart[i].name;
  myPara2.textContent = 'Product price:' + ' ' + cart[i].price + '€';

  section.appendChild(myArticle);
  myArticle.appendChild(div1);
  div1.appendChild(div2);
  div2.appendChild(myH3);
  div2.appendChild(myPara2);

  myArticle.setAttribute('class', 'col-lg-6 mx-auto');
  div1.setAttribute('class', 'card');
  div2.setAttribute('class', 'card-body');
  myH3.setAttribute('class', 'card-title');
  myPara2.setAttribute('class', 'card-text font-weight-bold');
}

let total = 0;
for (let i = 0; i < cart.length; i++) {
    total += cart[i].price;
}

let myArticle = document.createElement('article');
let div1 = document.createElement('div');
let div2 = document.createElement('div');
let myPara2 = document.createElement('p');
let removeButton = document.createElement('button');
let continueButton = document.createElement('button');

myPara2.textContent = 'Total price:' + ' ' + total + '€';
removeButton.textContent = 'Clear the cart';
continueButton.textContent = 'Continue shopping';

section.appendChild(myArticle);
myArticle.appendChild(div1);
div1.appendChild(div2);
div2.appendChild(myPara2);
div2.appendChild(removeButton);
div2.appendChild(continueButton);

myArticle.setAttribute('class', 'col-lg-6 mx-auto');
div1.setAttribute('class', 'card');
div2.setAttribute('class', 'card-body');
myPara2.setAttribute('class', 'card-text font-weight-bold');
removeButton.setAttribute('class', 'btn btn-primary');
continueButton.setAttribute('class', 'btn btn-success d-flex mx-auto my-2');

removeButton.addEventListener('click', function () {
  localStorage.clear();
  location.reload(true);
});

continueButton.addEventListener('click', function () {
  window.location = 'index.html';
});

let firstNameInput = document.getElementById('first-name');
let lastNameInput = document.getElementById('last-name');
let addressInput = document.getElementById('address');
let cityInput = document.getElementById('city');
let emailInput = document.getElementById('email');
let submitButton = document.getElementById('submit-button');
let form = document.getElementById('comment-form');
let url = 'http://localhost:3000/api/teddies/order';


emailInput.addEventListener('input', ($event) => {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailInput.value.match(mailformat)) {
        submitButton.removeAttribute('disabled');
    }
    else {
        submitButton.setAttribute('disabled');
    }
});

submitButton.addEventListener('click', ($event) => {
  $event.preventDefault();
  var cartInfos = new Object();
  cartInfos.contact = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      address: addressInput.value,
      city: cityInput.value,
      email: emailInput.value
  };
  cartInfos.products = [];
  for (var i = 0; i < cart.length; i++) {
      cartInfos.products.push(cart[i].id);
  }
  submitFormData(cartInfos);
});

function makeRequest(data) {
  return new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();
      request.open('POST', url);
      request.onreadystatechange = () => {
          if (request.readyState === 4) {
              if (request.status === 201) {
                  resolve(JSON.parse(request.response));
              } else {
                  reject(JSON.parse(request.response));
              }
          }
      };
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(data));
  });
}

async function submitFormData(cartInfos) {
  var requestPromise = makeRequest(cartInfos);
  var response = await requestPromise;
  window.location = 'confirmation.html?id=' + response.orderId + '&price=' + total;
  localStorage.clear();
}

