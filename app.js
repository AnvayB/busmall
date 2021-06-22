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
new Product("R2-D2 Suitcase", "./img/bag.jpeg");
new Product("Banana Slicer", "./img/banana.jpeg");
new Product("Bathroom Tablet", "./img/bathroom.jpeg");
new Product("Open-toed Rain Boots", "./img/boots.jpeg");
new Product("3-in-1 Toaster Oven", "./img/breakfast.jpeg");
new Product("Uncomfortable Chair", "./img/chair.jpeg");
new Product("Cthulhu Figurine", "./img/cthulhu.jpeg");
new Product("Dog-Duck", "./img/dog-duck.jpeg");
new Product("Dragon Meat", "./img/dragon.jpeg");
new Product("Utensil Pens", "./img/pen.jpeg");
new Product("Pet Sweeper", "./img/pet-sweep.jpeg");
new Product("Pizza Scissors", "./img/scissors.jpeg");
new Product("Shark Sleeping Bag (adults)", "./img/shark.jpeg");
new Product("Baby Sweeper", "./img/sweep.png");
new Product("Tauntaun Sleeping Bag (kids)", "./img/tauntaun.jpeg");
new Product("Unicorn Meat", "./img/unicorn.jpeg");
new Product("Recursive Watering Can", "./img/water-can.jpeg");
new Product("Wine Glass", "./img/wine-glass.jpeg");


pick3Products();