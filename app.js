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


//constructor functions
function Product(name, image) {
  this.name = name;
  this.image = image;
  this.timesShown = 0;
  this.votes = 0;

  Product.possibleProducts.push(this);
}

//prototype methods
Product.prototype.renderSingleProduct = function(imgPosition, H3Position) {
  imgPosition.src = this.image;
  imgPosition.alt = `here is a picture of a ${this.name}`;
  H3Position.textContent = this.name;
  this.timesShown++;
}

//global functions
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

function renderResults() {
  resultsUlElem.innerHTML = "";

  for (let product of Product.possibleProducts) {
    let liElem = document.createElement("li");
    liElem.textContent = `${product.name} has ${product.votes} votes, and was shown ${product.timesShown} times.`;
    resultsUlElem.appendChild(liElem);
  }
}

function ProductClick(event) {
  let id = event.target.id;
  if (votesCount === 25) {
    // renderResults();
    // addProductChart();
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
    alert("Please click on an image.");
  }
}

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
                'rgba(255, 99, 132, 0.5)', //pink


              ],
              borderColor: [
                'rgba(255, 99, 132, 0.9)', //pink
                

              ],
              borderWidth: 2
            }, {
              label: "# of Times Shown",
              data: productShownArray,
              backgroundColor: [
                'rgba(53, 61, 165, 0.5)', //dark blue



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
//Event listener
productSelectorElem.addEventListener("click", ProductClick);

//call functions
new Product("R2-D2 Suitcase", "./img/bag.jpeg");
new Product("Banana Slicer", "./img/banana.jpeg");
new Product("Bathroom Tablet", "./img/bathroom.jpeg");
new Product("Open-toed Rain Boots", "./img/boots.jpeg");
new Product("3-in-1 Toaster Oven", "./img/breakfast.jpeg");
new Product("Meatball Bubblegum", "./img/bubblegum.jpeg");
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
new Product("Spill-sure Wine Glass", "./img/wine-glass.jpeg");

pick3Products();