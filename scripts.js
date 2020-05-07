

let section = document.querySelector('#section');
let apiUrl = 'http://localhost:3000/api/teddies/';
console.log(apiUrl);
let request = new XMLHttpRequest();
request.open('GET', apiUrl);
request.responseType = 'json';
request.send();

request.onerror = function() {
  alert('Server error, please try again later.');
}

request.onload = function() {
  let product = request.response;

  for (let i = 0; i < product.length; i++) {
    let { myImage, myH3, myPara1, link, myArticle, div1, div2 } = letElements();
    elementsContent(myImage, product, i, myH3, myPara1, link);
    appendChild(myArticle, div1, myImage, div2, myH3, myPara1, link);
    setAttribute(myArticle, div1, myImage, div2, myH3, myPara1, link);
  }
};

function letElements() {
  let myArticle = document.createElement('article');
  let div1 = document.createElement('div');
  let div2 = document.createElement('div');
  let myImage = document.createElement('img');
  let myH3 = document.createElement('h3');
  let myPara1 = document.createElement('p');
  let link = document.createElement('a');
  return { myImage, myH3, myPara1, link, myArticle, div1, div2 };
}

function elementsContent(myImage, product, i, myH3, myPara1, link) {
  myImage.src = product[i].imageUrl;
  myH3.textContent = product[i].name;
  myPara1.textContent = product[i].description;
  link.textContent = 'Product Details';
  link.href = 'product.html?id=' + product[i]._id; // URL Query Params
}

function appendChild(myArticle, div1, myImage, div2, myH3, myPara1, link) {
  section.appendChild(myArticle);
  myArticle.appendChild(div1);
  div1.appendChild(myImage);
  div1.appendChild(div2);
  div2.appendChild(myH3);
  div2.appendChild(myPara1);
  div2.appendChild(link);
}

function setAttribute(myArticle, div1, myImage, div2, myH3, myPara1, link) {
  myArticle.setAttribute('class', 'col-12 col-md-6 col-lg-3 mx-auto my-2');
  div1.setAttribute('class', 'card text-center');
  myImage.setAttribute('class', 'card-img-top');
  div2.setAttribute('class', 'card-body');
  myH3.setAttribute('class', 'card-title');
  myPara1.setAttribute('class', 'card-text');
  link.setAttribute('class', 'btn btn-primary');
}