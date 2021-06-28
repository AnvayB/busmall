"use strict"

//global variables
const productSelectorElem = document.getElementById("possible-products");
const leftImgElem = document.getElementById("leftProductImg");
const leftH3Elem = document.getElementById("leftProductH3");
const middleImgElem = document.getElementById("middleProductImg");
const middleH3Elem = document.getElementById("middleProductH3");
const rightImgElem = document.getElementById("rightProductImg");
const rightH3Elem = document.getElementById("rightProductH3");
const resultsUlElem = document.getElementById("results");
let votesCount = 0;
let timesShownCount = 0;
Product.possibleProducts = [];
let leftProduct = null;
let middleProduct = null;
let rightProduct = null;


//constructor function for each product
function Product(name, image, timesShown, votes) {
  this.name = name;
  this.image = image;
  this.timesShown = timesShown;
  this.votes = votes;

  Product.possibleProducts.push(this);
}

//prototype method to create an image
Product.prototype.renderSingleProduct = function(imgPosition, H3Position) {
  imgPosition.src = this.image;
  imgPosition.alt = `here is a picture of a ${this.name}`;
  H3Position.textContent = this.name;
  this.timesShown++;
}

//global function to randomly generate 3 product images
function pick3Products() {
  let noProducts = [leftProduct, middleProduct, rightProduct];
  while (noProducts.includes(leftProduct)) {
  let leftProductIndex = Math.floor(Math.random() * Product.possibleProducts.length);
  leftProduct = Product.possibleProducts[leftProductIndex];
  }

  while (middleProduct === leftProduct || middleProduct === rightProduct || noProducts.includes(middleProduct)) {
    let middleProductIndex = Math.floor(Math.random() * Product.possibleProducts.length);
    middleProduct = Product.possibleProducts[middleProductIndex];
  }
  
  while (rightProduct === leftProduct || rightProduct === middleProduct || noProducts.includes(rightProduct)) {
  let rightProductIndex = Math.floor(Math.random() * Product.possibleProducts.length);
  rightProduct = Product.possibleProducts[rightProductIndex];
  }

  leftProduct.renderSingleProduct(leftImgElem, leftH3Elem);
  middleProduct.renderSingleProduct(middleImgElem, middleH3Elem);
  rightProduct.renderSingleProduct(rightImgElem, rightH3Elem);
}

//global function to create bulleted list
function renderResults() {
  resultsUlElem.innerHTML = "";

  for (let product of Product.possibleProducts) {
    let liElem = document.createElement("li");
    liElem.textContent = `${product.name} has ${product.votes} votes, and was shown ${product.timesShown} times.`;
    resultsUlElem.appendChild(liElem);
  }
}

//global function to increase count if an image is clicked
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
    storeProducts();
  } else {
    alert("Please click on an image.");
  }
}

//global function to create bar chart using Chart.js
function addProductChart() {
  const productNamesArray = [];
  const productVotesArray = [];
  const productShownArray = [];

  for (let product of Product.possibleProducts) {
    productNamesArray.push(product.name);
    productVotesArray.push(product.votes);
    productShownArray.push(product.timesShown);
  }

  const ctx = document.getElementById('productChart').getContext('2d');
  
  const productChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: productNamesArray,
          datasets: [{
              label: '# of Votes',
              data: productVotesArray,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)', //pink
              ],
              borderColor: [
                'rgba(255, 99, 132, 0.9)', //pink
              ],
              borderWidth: 2
            }, 

            {
              label: "# of Times Shown",
              data: productShownArray,
              backgroundColor: [
                'rgba(53, 61, 165, 0.6)', //dark blue
              ],
              borderColor: [
                'rgba(53, 61, 165, 0.9)', //dark blue
              ],
              borderWidth: 2
            }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });

}

//global function to store counts in localStorage
function storeProducts() {
  let stringProduct = JSON.stringify(Product.possibleProducts);
  localStorage.setItem("resultingProducts", stringProduct);
}

//global function to present stored count values
function getProduct() {
  let availableProducts = localStorage.getItem("resultingProducts");
  //checks if there are contents in availableProducts
  if (availableProducts) {
    let parseProduct = JSON.parse(availableProducts);
    console.log(parseProduct);
    for (let resultingProducts of parseProduct) {
      console.log(resultingProducts);
      let name = resultingProducts.name;
      let image = resultingProducts.image;
      let timesShown = resultingProducts.timesShown;
      let votes = resultingProducts.votes;
      new Product(name, image, timesShown, votes);
    }

  }
}

//Event listener
productSelectorElem.addEventListener("click", ProductClick);

getProduct();

//call functions for each created Product
if (Product.possibleProducts.length < 1) {
  new Product("R2-D2 Suitcase", "./img/bag.jpeg",0,0);
  new Product("Banana Slicer", "./img/banana.jpeg",0,0);
  new Product("Bathroom Tablet", "./img/bathroom.jpeg",0,0);
  new Product("Open-toed Rain Boots", "./img/boots.jpeg",0,0);
  new Product("3-in-1 Toaster Oven", "./img/breakfast.jpeg",0,0);
  new Product("Meatball Bubblegum", "./img/bubblegum.jpeg",0,0);
  new Product("Uncomfortable Chair", "./img/chair.jpeg",0,0);
  new Product("Cthulhu Figurine", "./img/cthulhu.jpeg",0,0);
  new Product("Dog-Duck", "./img/dog-duck.jpeg",0,0);
  new Product("Dragon Meat", "./img/dragon.jpeg",0,0);
  new Product("Utensil Pens", "./img/pen.jpeg",0,0);
  new Product("Pet Sweeper", "./img/pet-sweep.jpeg",0,0);
  new Product("Pizza Scissors", "./img/scissors.jpeg",0,0);
  new Product("Shark Sleeping Bag (adults)", "./img/shark.jpeg",0,0);
  new Product("Baby Sweeper", "./img/sweep.png",0,0);
  new Product("Tauntaun Sleeping Bag (kids)", "./img/tauntaun.jpeg",0,0);
  new Product("Unicorn Meat", "./img/unicorn.jpeg",0,0);
  new Product("Recursive Watering Can", "./img/water-can.jpeg",0,0);
  new Product("Spill-sure Wine Glass", "./img/wine-glass.jpeg",0,0);
}
pick3Products();