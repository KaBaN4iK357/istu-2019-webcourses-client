let products =
  [
    {countryId: `country-1`, country: `Россия`, city: `Сочи`, price: 200000, imgSrc: `https://placeimg.com/255/255/nature?1`},
    {countryId: `country-2`, country: `Франция`, city: `Париж`, price: 150000, imgSrc: `https://placeimg.com/255/255/nature?2`},
    {countryId: `country-3`, country: `Тайланд`, city: `Бангкок`, price: 50000, imgSrc: `https://placeimg.com/255/255/nature?3`},
    {countryId: `country-3`, country: `Тайланд`, city: `Пхукет`, price: 60000, imgSrc: `https://placeimg.com/255/255/nature?4`}
  ];
let state = {
  prods: products,
  countryFilter: `country-1`,
  cityFilter: ``
};

let dict = [];
class CityButtonId {
  constructor(city, buttonId) {
    this.city = city;
    this.bID = buttonId;
  }
}
for (let i = 0; i < products.length; i++) {
  dict.push(new CityButtonId(products[i].city, i));
}

let purchases = new Set();
class Purchase {
  constructor(city, price) {
    this.city = city;
    this.price = price;
    if (!purchases.has(city)) {
      this.count = 1;
    } else {
      this.count++;
    }
    this.Total = this.count * price;
  }
}

let countries = new Set();
countries.add(`Все`);
for (let i = 0; i < products.length; i++) {
  countries.add(products[i].country);
}

function getHTMLofNavigation(country, id) {
  let count = products.filter((p) => p.country === country || (id === 0 && country === `Все`)).length;

  return `<div class="form-check">
        <input class="form-check-input" type="radio" name="country" id="country-${id}" value=${id} checked>
        <label class="form-check-label" for="country-${id}">
         ${country} (${count})
        </label>
       </div>`;
}
function pasteNavigationInHTML(country, id) {
  let elementId = document.getElementById(`navigation`);
  elementId.innerHTML += getHTMLofNavigation(country, id);
}
function pasteNavigationsInHTML() {
  let elementId = document.getElementById(`navigation`);
  elementId.innerHTML = ``;
  let id = 0;
  for (let item of countries.values()) {
    pasteNavigationInHTML(item, id);
    id++;
  }
}

function getHTMLofProduct(product) {
  let id = dict.find((obj) => obj.city === product.city).bID;
  return `<div class= "card text-center card-product">
    <div class="card-product__img">
    <img class="card-img" src=${product.imgSrc} alt="">
    </div>
    <div class="card-body">
    <p>${product.country}</p>
    <h4 class="card-product__title">${product.city}</h4>
    <p class="card-product__price">${product.price} руб</p>
  <p><button id="button-${id}" type="button" class="btn btn-primary">Заказать</button></p>
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
  if (countryId === `country-0`) {
    return array;
  } else {
    return array.filter((p) => p.countryId === countryId);
  }
}
function filterProductsByCity(array, cityName) {
  if (cityName === ``) {
    return array;
  } else {
    return array.filter((p) => p.city === cityName);
  }
}
function refreshPage() {
  let c = filterProductsByCountry(state.prods, state.countryFilter);
  let result = filterProductsByCity(c, state.cityFilter);
  pasteProductsInHTML(result);
  setButtonsPurshaseEvent(result);
}
document.getElementById(`button-addon2`).onclick = ()=>{
  let rb = document.querySelector(`input[name=country]:checked`);
  let countryId = rb.id;
  state.countryFilter = countryId;

  let city = document.getElementById(`citySearch`).value;
  state.cityFilter = city;
  refreshPage();
};

function makePurshase(button) {
  let city = dict.find((obj) => obj.bID === Number(button.id.split(`-`)[1])).city;
  let prod = products.find((p) => p.city === city);
  let icart = document.getElementById(`index-cart`);
  purchases.add(new Purchase(prod.city, prod.price));
  icart.innerText = purchases.size;
  /* icart.innerText = `${prod.price}`; */
}
function setButtonsPurshaseEvent(array) {
  for (let i = 0; i < array.length; i++) {
    let ind = dict.find((obj) => obj.city === array[i].city).bID;
    let button = document.getElementById(`button-${ind}`);
    button.onclick = () => makePurshase(button);
  }
}

pasteProductsInHTML(products);
pasteNavigationsInHTML();
setButtonsPurshaseEvent(products);


