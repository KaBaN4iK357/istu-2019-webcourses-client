let products =
  [
    {countryid: `country-1`, country: `Россия`, city: `Сочи`, price: 200000, imgSrc: `https://placeimg.com/255/255/nature`},
    {countryid: `country-2`, country: `Франция`, city: `Париж`, price: 150000, imgSrc: `https://placeimg.com/255/255/nature?2`},
    {countryid: `country-3`, country: `Тайланд`, city: `Бангкок`, price: 50000, imgSrc: `https://placeimg.com/255/255/nature?3`},
    {countryid: `country-3`, country: `Тайланд`, city: `Пхукет`, price: 60000, imgSrc: `https://placeimg.com/255/255/nature?4`}
  ];

let state = {
  prods: products,
  countryFilter: `country-1`,
  cityFilter: ``
}

/*
let countryes = [];
for (let i = 0; i < products.length; i++) {
  if (!countryes.includes(countryes[i].country)) {
    countryes.push(countryes[i].country);
  }
}*/

function getHTMLofProduct(product) {
  return `<div class= "card text-center card-product">
    <div class="card-product__img">
    <img class="card-img" src=${product.imgSrc} alt="">
    </div>
    <div class="card-body">
    <p>${product.country}</p>
    <h4 class="card-product__title">${product.city}</h4>
    <p class="card-product__price">${product.price} руб</p>
  <p><button type="button" class="btn btn-primary">Заказать</button></p>
  </div>
  </div>`;
}

function pasteProductInHTML(array, productId) {
  let elementId = document.getElementById(`productsDiv`);
  elementId.innerHTML += getHTMLofProduct(array[productId]);
}

function pasteProductsInHTML(array) {
  let elementId = document.getElementById(`productsDiv`);
  elementId.innerHTML = ``;
  for (let i = 0; i < array.length; i++) {
    pasteProductInHTML(array, i);
  }
}

function filterProductsByCountry(array, countryId) {
  return array.filter((p)=> p.countryid === countryId);
}

function filterProductsByCity(array, cityName) {
  return array.filter((p) => p.city === cityName);
}

function refreshPage() {
  let countryes = filterProductsByCountry(state.prods, state.countryFilter);
  let result = filterProductsByCity(countryes, state.cityFilter);
  pasteProductsInHTML(result);
}

function setEvent() {
  let rb = document.querySelector(`input[name=country]:checked`);
  let countryId = rb.id;
  state.countryFilter = countryId;

  let city = document.getElementById(`citySearch`).value;
  state.cityFilter = city;
  refreshPage();
}

document.getElementById(`button-addon2`).onclick = setEvent;
pasteProductsInHTML(products);


