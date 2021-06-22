"use strict"

//global variables
const productSelectorElem = document.getElementById("possible-products");
const leftProductElem = document.getElementById("leftProduct");
const middleProductElem = document.getElementById("middleProduct");
const rightProductElem = document.getElementById("rightProduct");
const leftImgElem = document.getElementById("leftProductImg");
const leftH2Elem = document.getElementById("leftProductH2");
const middleImgElem = document.getElementById("middleProductImg");
const middleH2Elem = document.getElementById("middleProductH2");
const rightImgElem = document.getElementById("rightProductImg");
const rightH2Elem = document.getElementById("rightProductH2");
const resultsUlElem = document.getElementById("results");
let votesCount = 0;
let timesShownCount = 0;
Product.possibleProducts = [];
let leftProduct = null;
let middleProduct = null;
let rightProduct = null;



//constructor functions
function Product(name, image) {
  this.name = name;
  this.image = image;
  this.timesShown = 0;
  this.votes = 0;

  Product.possibleProducts.push(this);
}

//prototype methods
Product.prototype.renderSingleProduct = function(imgPosition, h2Position) {
  imgPosition.src = this.image;
  imgPosition.alt = `this is a picture of a ${this.name}`;
  h2Position.textContent = this.name;
  this.timesShown++;
}

//global functions
function pick3Products() {
  let leftProductIndex = Math.floor(Math.random() * Product.possibleProducts.length);
  leftProduct = Product.possibleProducts[leftProductIndex];
  let middleProductIndex = Math.floor(Math.random() * Product.possibleProducts.length);
  middleProduct = Product.possibleProducts[middleProductIndex];

  while (middleProductIndex === leftProductIndex || middleProductIndex === null) {
    middleProductIndex = Math.floor(Math.random() * Product.possibleProducts.length);
    middleProduct = Product.possibleProducts[middleProductIndex];
  }
  
  let rightProductIndex = Math.floor(Math.random() * Product.possibleProducts.length);
  rightProduct = Product.possibleProducts[rightProductIndex];
  
  while (rightProductIndex === leftProductIndex || middleProductIndex === rightProductIndex || rightProductIndex === null) {
  rightProductIndex = Math.floor(Math.random() * Product.possibleProducts.length);
  }

  leftProduct.renderSingleProduct(leftImgElem, leftH2Elem);
  middleProduct.renderSingleProduct(middleImgElem, middleH2Elem);
  rightProduct.renderSingleProduct(rightImgElem, rightH2Elem);
}

function renderResults() {
  resultsUlElem.innerHTML = "";

  for (let product of Product.possibleProducts) {
    let liElem = document.createElement("li");
    liElem.textContent = `${product.name} has ${product.votes} votes`;
    resultsUlElem.appendChild(liElem);
  }
}


function ProductClick(event) {
  let id = event.target.id;
  if (votesCount === 25) {
    return
  }
  if (id === "leftProductImg" || id === "middleProductImg" || id === "rightProductImg") {
    votesCount++;
    if (id === "leftProductImg") {
      leftProduct.votes++;
    } else if (id === "rightProductImg") {
      rightProduct.votes++;
    } else {
      middleProduct.votes++;
    } 
    pick3Products();
  } else {
    alert("Please try again.");
  }
}

//Event listener
leftProductElem.addEventListener("click", ProductClick)
middleProductElem.addEventListener("click", ProductClick);
rightProductElem.addEventListener("click", ProductClick);

//call functions
new Product("bag", "./img/bag.jpeg");
new Product("banana", "./img/banana.jpeg");
new Product("bathroom", "./img/bathroom.jpeg");
new Product("boots", "./img/boots.jpeg");
new Product("breakfast", "./img/breakfast.jpeg");
new Product("chair", "./img/chair.jpeg");
new Product("cthulhu", "./img/cthulhu.jpeg");
new Product("dog-duck", "./img/dog-duck.jpeg");
new Product("dragon", "./img/dragon.jpeg");
new Product("pen", "./img/pen.jpeg");
new Product("pet-sweep", "./img/pet-sweep.jpeg");
new Product("scissors", "./img/scissors.jpeg");
new Product("shark", "./img/shark.jpeg");
new Product("sweep", "./img/sweep.png");
new Product("tauntaun", "./img/tauntaun.jpeg");
new Product("unicorn", "./img/unicorn.jpeg");
new Product("water-can", "./img/water-can.jpeg");
new Product("wine-glass", "./img/wine-glass.jpeg");


pick3Products();