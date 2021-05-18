'use strict'
// --------------------------------------------- Global Variables -------------------------------------------------------//
const results = document.getElementById('results')
const allProducts = document.getElementById('allProducts')
const productOneImg = document.getElementById('productOneImg');
const productTwoImg = document.getElementById('productTwoImg');
const productThreeImg = document.getElementById('productThreeImg');
const productOnePElem = document.getElementById('productOnePElem');
const productTwoPElem = document.getElementById('productTwoPElem');
const productThreePElem = document.getElementById('productThreePElem');
const numberOfRounds = 25;

let totalClicks = 0;

let productOne = null;
let productTwo = null;
let productThree = null;

// --------------------------------------------- Constructor Functions -------------------------------------------------------//

function Product(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.clicks = 0;
  this.timesShown = 0;

  Product.allImages.push(this);
}

Product.allImages = [];

// --------------------------------------------- Prototype Methods -------------------------------------------------------//

// --------------------------------------------- Regular Functions -------------------------------------------------------//
function renderProducts() {
    productOneImg.src = productOne.imagePath;
    productTwoImg.src = productTwo.imagePath;
    productThreeImg.src = productThree.imagePath;
    productOnePElem.textContent = productOne.name;
    productTwoPElem.textContent = productTwo.name;
    productThreePElem.textContent = productThree.name;
} 

function productPicker() {
  let previousProducts = [];
  previousProducts.push(productOne);
  previousProducts.push(productTwo);
  previousProducts.push(productThree);
  while (previousProducts.includes(productOne)) {
    let productOneIndex = Math.floor(Math.random() * Product.allImages.length);
    productOne = Product.allImages[productOneIndex];
  }
  previousProducts.push(productOne);
  while (previousProducts.includes(productTwo)) {
    let productTwoIndex = Math.floor(Math.random() * Product.allImages.length);
    productTwo = Product.allImages[productTwoIndex];
  }
  previousProducts.push(productTwo);
  while (previousProducts.includes(productThree)) {
    let productThreeIndex = Math.floor(Math.random() * Product.allImages.length);
    productThree = Product.allImages[productThreeIndex];
  }
}

function displayVoteCount() {
  results.innerHTML = ' ';
  let h2Elem = document.createElement('h2');
  h2Elem.textContent = 'Product Likes';
  results.appendChild(h2Elem);
  for(let product of Product.allImages) {
    const liElem = document.createElement('li');
    liElem.textContent = `${product.name}: ${product.clicks}`;
    results.appendChild(liElem);
  }
}

function handleClick(event) {
  const clickedTarget = event.target;
  const id = clickedTarget.id;

  if(totalClicks < numberOfRounds) {
    if(id === 'productOneImg' || id === 'productTwoImg' || id === 'productThreeImg') {
      if (id === 'productOneImg') {
        productOne.clicks++;
      } else if (id === 'productTwoImg') {
        productTwo.clicks++;
      } else {
        productThree.clicks++;
      }
      totalClicks++;
      productOne.timesShown++;
      productTwo.timesShown++;
      productThree.timesShown++;
      productPicker();
      renderProducts();
    }
  }
  if(totalClicks === numberOfRounds) {
    allProducts.removeEventListener('click', handleClick);
    displayVoteCount();
  }
}
// --------------------------------------------- Event Listeners -------------------------------------------------------//

allProducts.addEventListener('click', handleClick);

// --------------------------------------------- Functions Calls -------------------------------------------------------//

new Product('bag', './img/bag.jpg');
new Product('banana', './img/banana.jpg');
new Product('bathroom', './img/bathroom.jpg');
new Product('boots', './img/boots.jpg');
new Product('breakfast', './img/breakfast.jpg');
new Product('bubblegum', './img/bubblegum.jpg');
new Product('chair', './img/chair.jpg');
new Product('cthulhu', './img/cthulhu.jpg');
new Product('dog-duck', './img/dog-duck.jpg');
new Product('dragon', './img/dragon.jpg');
new Product('pen', './img/pen.jpg');
new Product('pet-sweep', './img/pet-sweep.jpg');
new Product('scissors', './img/scissors.jpg');
new Product('shark', './img/shark.jpg');
new Product('sweep', './img/sweep.png');
new Product('tauntaun', './img/tauntaun.jpg');
new Product('unicorn', './img/unicorn.jpg');
new Product('usb', './img/usb.gif');
new Product('water-can', './img/water-can.jpg');
new Product('wine-glass', './img/wine-glass.jpg');

productPicker();
console.log('product One', productOne);
console.log('product Two', productTwo);
console.log('product Three', productThree);
renderProducts();