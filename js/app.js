'use strict'
// --------------------------------------------- Global Variables -------------------------------------------------------//
const results = document.getElementById('productClicks')
const allProducts = document.getElementById('allProducts')
const productOneImg = document.getElementById('productOneImg');
const productTwoImg = document.getElementById('productTwoImg');
const productThreeImg = document.getElementById('productThreeImg');
const productOne_pElem = document.getElementById('img1_p');
const productTwo_pElem = document.getElementById('img2_p');
const productThree_pElem = document.getElementById('img3_p');

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
    productOne_pElem.textContent = productOne.name;
    productTwo_pElem.textContent = productTwo.name;
    productThree_pElem.textContent = productThree.name;
} 

function productPicker() {
  const productOneIndex = Math.floor(Math.random() * Product.allImages.length);
  let productTwoIndex;
  let productThreeIndex;
  while (productTwoIndex === productOneIndex || productTwoIndex === undefined) {
    productTwoIndex = Math.floor(Math.random() * Product.allImages.length);
  }
  while (productThreeIndex === productOneIndex || productThreeIndex === productTwoIndex || productThreeIndex === undefined) {
    productThreeIndex = Math.floor(Math.random() * Product.allImages.length);
  }

  productOne = Product.allImages[productOneIndex];
  productTwo = Product.allImages[productTwoIndex];
  productThree = Product.allImages[productThreeIndex];
}

function displayVoteCount() {
  results.innterHTML = '';
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

  if(totalClicks < 5) {
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
  if(totalClicks === 5) {
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