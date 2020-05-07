//Product page: 

//Api request

var section = document.querySelector('#section');
var params = new URLSearchParams(window.location.search); //URL query parameters
var id = params.get("id");
var api = 'http://localhost:3000/api/teddies/';
var request = new XMLHttpRequest();
request.open('GET', api + id);
request.responseType = 'json';
request.send();

request.onerror = function () {
    alert('Server error, please try again later');
};

//Dynamic function

request.onload = function () {
    var product = request.response;

    var { myImage, myH3, myPara1, myPara2, myPara3, link, myList, myArticle, div1, div2 } = varElements();

    elementsContent(myImage, product, myH3, myPara1, myPara2, myPara3, link);

    colorsOptions(product, myList);

    appendiceChild(myArticle, div1, myImage, div2, myH3, myPara1, myPara2, myPara3, myList, link);

    setAttribute(myArticle, div1, myImage, div2, myH3, myPara1, myPara2, myPara3, link, myList);

    storageLocal(product, link);
};

//Function details

function varElements() {
    var myArticle = document.createElement('article');
    var div1 = document.createElement('div');
    var div2 = document.createElement('div');
    var myImage = document.createElement('img');
    var myH3 = document.createElement('h3');
    var myPara1 = document.createElement('p');
    var myPara2 = document.createElement('p');
    var myPara3 = document.createElement('p');
    var myList = document.createElement('select');
    var link = document.createElement('a');
    return { myImage, myH3, myPara1, myPara2, myPara3, link, myList, myArticle, div1, div2 };
}

function elementsContent(myImage, product, myH3, myPara1, myPara2, myPara3, link) {
    myImage.src = product.imageUrl;
    myH3.textContent = product.name;
    myPara1.textContent = product.description;
    myPara2.textContent = 'Price:' + ' ' + product.price + '€';
    myPara3.textContent = 'Lense selection:';
    link.textContent = 'Add to the cart';
    link.href = 'cart.html';
}

function colorsOptions(product, myList) {
    var colorsList = product.colors;
    for (var j = 0; j < colorsList.length; j++) {
        var listItem = document.createElement('option');
        listItem.textContent = colorsList[j];
        myList.appendChild(listItem);
    }
}

function appendiceChild(myArticle, div1, myImage, div2, myH3, myPara1, myPara2, myPara3, myList, link) {
    section.appendChild(myArticle);
    myArticle.appendChild(div1);
    div1.appendChild(myImage);
    div1.appendChild(div2);
    div2.appendChild(myH3);
    div2.appendChild(myPara1);
    div2.appendChild(myPara2);
    div2.appendChild(myPara3);
    div2.appendChild(myList);
    div2.appendChild(link);
}

function setAttribute(myArticle, div1, myImage, div2, myH3, myPara1, myPara2, myPara3, link, myList) {
    myArticle.setAttribute('class', 'col-12 col-md-6 mx-auto');
    div1.setAttribute('class', 'card text-center');
    myImage.setAttribute('class', 'card-img-top');
    div2.setAttribute('class', 'card-body');
    myH3.setAttribute('class', 'card-title');
    myPara1.setAttribute('class', 'card-text');
    myPara2.setAttribute('class', 'card-text');
    myPara3.setAttribute('class', 'card-text');
    link.setAttribute('class', 'btn btn-primary my-2');
    myList.setAttribute('class', 'form-control');
}

//Local storage in browser for the shopping cart

function storageLocal(product, link) {
    var productData = {
        name: product.name,
        price: product.price,
        id: product._id,
        qty: 1
    };
    var itemsArray = localStorage.getItem('cart') ?
        JSON.parse(localStorage.getItem('cart')) : [];
    itemsArray.push(productData);
    link.addEventListener('click', function () {
        localStorage.setItem('cart', JSON.stringify(itemsArray));
    });
}










