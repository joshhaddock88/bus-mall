'use strict'
// --------------------------------------------- Global Variables -------------------------------------------------------//
const results = document.getElementById('results')
const allProducts = document.getElementById('allProducts')
const productOneImg = document.getElementById('productOneImg');
const productTwoImg = document.getElementById('productTwoImg');
const productThreeImg = document.getElementById('productThreeImg');
const viewResults = document.getElementById('viewResults')
const numberOfRounds = 25;
Product.allProducts = [];

let totalClicks = 0;

let imageOne = null;
let imageTwo = null;
let imageThree = null;

// --------------------------------------------- Constructor Functions -------------------------------------------------------//
function Product(name, imagePath, clicks, timesShown) {
  this.name = name;
  this.imagePath = imagePath;
  this.clicks = clicks;
  this.timesShown = timesShown;
}

// --------------------------------------------- Prototype Methods -------------------------------------------------------//

// --------------------------------------------- Regular Functions -------------------------------------------------------//
function makeProducts(name, imagePath, clicks, timesShown) {
  const product = new Product(name, imagePath, clicks, timesShown);
  Product.allProducts.push(product);
}

function renderImages() {
    productOneImg.src = imageOne.imagePath;
    productTwoImg.src = imageTwo.imagePath;
    productThreeImg.src = imageThree.imagePath;
} 

function imagePicker() {
  let previousImages = [];
  previousImages.push(imageOne);
  previousImages.push(imageTwo);
  previousImages.push(imageThree);
  while (previousImages.includes(imageOne)) {
    let imageOneIndex = Math.floor(Math.random() * Product.allProducts.length);
    imageOne = Product.allProducts[imageOneIndex];
  }
  previousImages.push(imageOne);
  while (previousImages.includes(imageTwo)) {
    let imageTwoIndex = Math.floor(Math.random() * Product.allProducts.length);
    imageTwo = Product.allProducts[imageTwoIndex];
  }
  previousImages.push(imageTwo);
  while (previousImages.includes(imageThree)) {
    let imageThreeIndex = Math.floor(Math.random() * Product.allProducts.length);
    imageThree = Product.allProducts[imageThreeIndex];
  }
}

function displayVoteCount() {
  results.innerHTML = ' ';
  let h2Elem = document.createElement('h2');
  h2Elem.textContent = 'Product Likes';
  results.appendChild(h2Elem);
  for(let product of Product.allProducts) {
    const liElem = document.createElement('li');
    liElem.textContent = `${product.name}: ${product.clicks}`;
    results.appendChild(liElem);
  }
  viewResults.removeEventListener('click', displayVoteCount);
}

function renderChart() {
  let labelData = [];
  let voteData = [];

  for(let product of Product.allProducts) {
    voteData.push(product.clicks);
    labelData.push(product.name);
  }
  console.log('label data', labelData);
  console.log('vote data', voteData);

  let ctx = document.getElementById('productChart').getContext('2d');
  let productChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labelData,
        datasets: [{
            label: '# of Votes',
            data: voteData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
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
  viewResults.removeEventListener('click', renderChart);
}

function handleClick(event) {
  const clickedTarget = event.target;
  const id = clickedTarget.id;

  if(totalClicks < numberOfRounds) {
    if(id === 'productOneImg' || id === 'productTwoImg' || id === 'productThreeImg') {
      if (id === 'productOneImg') {
        imageOne.clicks++;
      } else if (id === 'productTwoImg') {
        imageTwo.clicks++;
      } else {
        imageThree.clicks++;
      }
      totalClicks++;
      imageOne.timesShown++;
      imageTwo.timesShown++;
      imageThree.timesShown++;
      
      updateStorageData();
      imagePicker();
      renderImages();
    }
  }
  if(totalClicks === numberOfRounds) {
    allProducts.removeEventListener('click', handleClick);
    viewResults.style.display = 'block';
  }
}

function updateStorageData() {
  const stringifiedProducts = JSON.stringify(Product.allProducts);
  localStorage.setItem('previousData', stringifiedProducts);
}

function getDataFromStorage() {
  let dataFromStorage = localStorage.getItem('previousData');
  if(dataFromStorage) {
    let parsedData = JSON.parse(dataFromStorage);
    for(let product of parsedData) {
      makeProducts(product.name, product.imagePath, product.clicks, product.timesShown);
    }
    imagePicker();
    renderImages();
  }
}

function makeAllProducts() {
  makeProducts('bag', './img/bag.jpg', 0, 0);
  makeProducts('banana', './img/banana.jpg', 0, 0);
  makeProducts('bathroom', './img/bathroom.jpg', 0, 0);
  makeProducts('boots', './img/boots.jpg', 0, 0);
  makeProducts('breakfast', './img/breakfast.jpg', 0, 0);
  makeProducts('bubblegum', './img/bubblegum.jpg', 0, 0);
  makeProducts('chair', './img/chair.jpg', 0, 0);
  makeProducts('cthulhu', './img/cthulhu.jpg', 0, 0);
  makeProducts('dog-duck', './img/dog-duck.jpg', 0, 0);
  makeProducts('dragon', './img/dragon.jpg', 0, 0);
  makeProducts('pen', './img/pen.jpg', 0, 0);
  makeProducts('pet-sweep', './img/pet-sweep.jpg', 0, 0);
  makeProducts('scissors', './img/scissors.jpg', 0, 0);
  makeProducts('shark', './img/shark.jpg', 0, 0);
  makeProducts('sweep', './img/sweep.png', 0, 0);
  makeProducts('tauntaun', './img/tauntaun.jpg', 0, 0);
  makeProducts('unicorn', './img/unicorn.jpg', 0, 0);
  makeProducts('usb', './img/usb.gif', 0, 0);
  makeProducts('water-can', './img/water-can.jpg', 0, 0);
  makeProducts('wine-glass', './img/wine-glass.jpg', 0, 0);
}

function createPage() {
  let dataFromStorage = localStorage.getItem('previousData');
  if(dataFromStorage) {
    getDataFromStorage()
  } else {
    makeAllProducts();
    imagePicker();
    renderImages();
  }
}

// --------------------------------------------- Event Listeners -------------------------------------------------------//

allProducts.addEventListener('click', handleClick);
viewResults.addEventListener('click', displayVoteCount);
viewResults.addEventListener('click', renderChart);

// --------------------------------------------- Functions Calls -------------------------------------------------------//

createPage();

console.log(Product.allProducts);
