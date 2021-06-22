'use strict'

// global variables
const productSelectorElem = document.getElementById("potential-products");
const leftProductElem = document.getElementById("left-product");
const middleProductElem = document.getElementById("middle-product");
const rightProductElem = document.getElementById("right-product");
const leftImageElem = document.getElementById("leftImg");
const middleImageElem = document.getElementById("middleImg");
const rightImageElem = document.getElementById("rightImg");
const leftH2Elem = document.getElementById("leftH2");
const middleH2Elem = document.getElementById("middleH2");
const rightH2Elem = document.getElementById("rightH2");

let timesShownCounter = 0;
let voteCounter = 0;

//array of all potential products
Products.potentialProducts = [];

let leftProduct = null;
let middleProduct = null;
let rightProduct = null;

//Product object constructor function
function Products(name, image){
  this,name = name;
  this.image = image;
  this.timesShown = 0;
  this.votes = 0;

  //push properties put in the "Product" object into "potentialProducts" array
  Products.potentialProducts.push(this);
}

//prototype methods
Products.prototype.renderSingleProduct = function(imgPosition, h2Position) {
  imgPosition.src = this.image;
  h2Position.alt = `this is a picture of ${this.name}`;
  h2Position.textContent= this.name;
  this.timesShown++;
}

//global functions
function pick3Products() {
  let leftProductIndex = Math.floor(Math.random() * Products.potentialProducts.length);
  leftProduct = Products.potentialProducts[leftProductIndex];
  
  let middleProductIndex = Math.floor(Math.random() * Products.potentialProducts.length);
  middleProduct = Products.potentialProducts[middleProductIndex];
  while (middleProductIndex === leftProductIndex || middleProductIndex === null) {
    middleProductIndex = Math.floor(Math.random() * Products.potentialProducts.length);
    middleProduct = Products.potentialProducts[middleProductIndex]; 
  }

  let rightProductIndex = Math.floor(Math.random() * Products.potentialProducts.length);
  rightProduct = Products.potentialProducts[rightProductIndex];
  while (rightProductIndex === leftProductIndex || rightProductIndex === middleProductIndex || rightProductIndex === null) {
    rightProductIndex = Math.floor(Math.random() * Products.potentialProducts.length); 
  }

  leftProduct.renderSingleProduct(leftImageElem, leftH2Elem);
  middleProduct.renderSingleProduct(middleImageElem, middleH2Elem);
  rightProduct.renderSingleProduct(rightImageElem, rightH2Elem);
}

function renderResults() {
  resultsUlElem.innerHTML = "";

  for (let product of Products.potentialProducts) {
    let liElem = document.createElement("li");
    liElem.textContent = `${product.name}: ${product.votes}`;
    resultsUlElem.appendChild(liElem);
  }
}

function ProductClick(event) {
  let id = event.target.id;
  if (voteCounter == 25){
    renderResults();
    return
  }
  
  if (id === "leftImg" || id === "middleImg" || id === "rightImg") {
    voteCounter++;
    if (id === "leftImg"){
      leftProduct.votes++;
    }
    if (id === "middleImg"){
      middleProduct.votes++;
    }
    if (id === "rightImg"){
      rightProduct.votes++;
    }
    pick3Products();
  } else {
    alert("Please try again");
  }
}

//event listener
leftProductElem.addEventListener("click", ProductClick);
middleProductElem.addEventListener("click", ProductClick);
rightProductElem.addEventListener("click", ProductClick);

//create Product objects for each image
new Products("bag", "./img/bag.jpeg");
new Products("banana", "./img/banana.jpeg");
new Products("bathroom", "./img/bathroom.jpeg");
new Products("boots", "./img/boots.jpeg");
new Products("breakfast", "./img/breakfast.jpeg");
new Products("chair", "./img/chair.jpeg");
new Products("cthulhu", "./img/cthulhu.jpeg");
new Products("dog-duck", "./img/dog-duck.jpeg");
new Products("dragon", "./img/dragon.jpeg");
new Products("pen", "./img/pen.jpeg");
new Products("pet-sweep", "./img/pet-sweep.jpeg");
new Products("scissors", "./img/scissors.jpeg");
new Products("shark", "./img/shark.jpeg");
new Products("sweep", "./img/sweep.jpeg");
new Products("tauntaun", "./img/tautaun.jpeg");
new Products("unicorn", "./img/unicorn.jpeg");
new Products("water-can", "./img/water-can.jpeg");
new Products("wine-glass", "./img/wine-glass.jpeg");

pick3Products();