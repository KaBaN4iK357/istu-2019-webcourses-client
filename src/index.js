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

let purchases = [];
class Purchase {
  constructor(city, price) {
    this.city = city;
    this.price = price;
    this.count = 1;
  }

  getTotal() {
    return this.count * this.price;
  }
}
function addPurshase(product) {
  let purchase = purchases.find((p) => p.city === product.city);
  if (purchase !== undefined) {
    purchase.count++;
  } else {
    purchases.push(new Purchase(product.city, product.price));
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
  setButtonsPurchaseEvent(result);
  refreshCartText();
}
function refreshCartText() {
  let icart = document.getElementById(`index-cart`);
  icart.innerText = purchases.reduce((acc, x) => acc + x.count, 0);
}
document.getElementById(`button-addon2`).onclick = ()=>{
  let rb = document.querySelector(`input[name=country]:checked`);
  let countryId = rb.id;
  state.countryFilter = countryId;

  let city = document.getElementById(`citySearch`).value;
  state.cityFilter = city;
  refreshPage();
};

function makePurchase(button) {
  let city = dict.find((obj) => obj.bID === Number(button.id.split(`-`)[1])).city;
  let prod = products.find((p) => p.city === city);
  let icart = document.getElementById(`index-cart`);
  addPurshase(prod);
  icart.innerText = purchases.reduce((acc, x) => acc + x.count, 0);
}
function setButtonsPurchaseEvent(array) {
  for (let i = 0; i < array.length; i++) {
    let ind = dict.find((obj) => obj.city === array[i].city).bID;
    let button = document.getElementById(`button-${ind}`);
    button.onclick = () => makePurchase(button);
  }
}

function deletePurchase(pID) {
  purchases.splice(pID, 1);
}
function setButtonsDeletePurchaseEvent(array, window) {
  for (let i = 0; i < array.length; i++) {
    let button = window.document.getElementById(`del-${i + 1}`);
    button.onclick = () => {
      deletePurchase(i);
      window.close();
      generateDoc();
    };
  }
}

function changeAmount(pID, window) {
  let purchase = purchases[pID];
  let value = window.document.getElementById(`change-${pID + 1}`).value;
  purchase.count = Number(value);
  let subtotal = window.document.getElementById(`subtotal-${pID + 1}`);
  subtotal.innerText = `${purchase.count * purchase.price} руб`;
  let total = window.document.getElementById(`total`);
  total.innerText = `${purchases.reduce((acc, x) => acc + x.getTotal(), 0)} руб`;
}
function setButtonsChangeAmountPurchaseEvent(array, window) {
  for (let i = 0; i < array.length; i++) {
    let button = window.document.getElementById(`change-${i + 1}`);
    button.onclick = () => {
      changeAmount(i, window);
    };
  }
}

function generateTable() {
  let rows = [];
  rows.push(`<table id = "mytable" class="table">
    <thead>
    <tr>
     <th scope="col">№</th>
     <th scope="col">Путевка</th>
     <th scope="col">Стоимость</th>
     <th scope="col">Кол-во</th>
     <th scope="col">Сумма</th>
     <th scope="col"></th>
    </tr>
    </thead>
    <tbody>`);
  for (let i = 0; i < purchases.length; i++) {
    rows.push(generateTableRow(i + 1, purchases[i]));
  }
  rows.push(generateTableBottom(purchases));
  rows.push(`</tbody></table>`);
  return rows.join(``);
}
function generateTableRow(pID, purchase) {
  return `<tr>
     <th scope="row">${pID}</th>
     <td>${purchase.city}</td>
     <td>${purchase.price} руб</td>
     <td><input type="number" id="change-${pID}" class="form-control cart-number" value="${purchase.count}" min="1"></td>
     <td id="subtotal-${pID}">${purchase.getTotal()} руб</td>
     <td><button type="button" id="del-${pID}" class="btn btn-danger">Удалить</button></td>
    </tr>`;
}
function generateTableBottom() {
  return `<tr>
     <th scope="row" colspan="3">&nbsp;</th>
     <td><b>Итого:</b></td>
     <td id="total">${purchases.reduce((acc, x) => acc + x.getTotal(), 0)} руб</td>
     <td>&nbsp;</td>
    </tr>`;
}

let cartButton = document.getElementById(`cart-reference`);
function generateDoc() {
  let win1 = window.open(``, ``);
  win1.document.open(); // Открываем его.
  let purchasesCount = purchases.reduce((acc, x) => acc + x.count, 0);
  win1.document.write(`<!doctype html>
<html>
 <head>
   <title>Путевки онлайн</title>
   <link rel="stylesheet" type="text/css" href="./css/bootstrap.min.css" />
   <link rel="stylesheet" type="text/css" href="./css/main.css" />
 </head>
 <body>
  <header class="site-header">
   <div class="main_menu">
    <nav class="navbar navbar-expand-lg navbar-light">
     <div class="container">
      <a class="navbar-brand site-header-logo" href="/">Путевки онлайн</a>

      <button type="button" class="btn btn-primary">
       Корзина <span class="badge badge-light" id = "cart">${purchasesCount}</span>
      </button>
     </div>
    </nav>
   </div>
  </header>

 <section class="site-main mb-5">
  <div class="container">
  ${generateTable()}
  </div>
 </section>

 <footer>
  <div class="footer-bottom">
   <div class="container">
    <div class="row d-flex">
     <p class="col-lg-12 footer-text text-center">
      Copyright ©2019
    </div>
   </div>
  </div>
 </footer>

 <script src="main.js"></script>
  <script src="cart.js"></script>
 </body>
</html>`
  );
  setButtonsDeletePurchaseEvent(purchases, win1);
  setButtonsChangeAmountPurchaseEvent(purchases, win1);
  window.focus();	// Переводим фокус.
}
cartButton.onclick = generateDoc;

pasteProductsInHTML(products);
pasteNavigationsInHTML();
setButtonsPurchaseEvent(products);
refreshCartText();

