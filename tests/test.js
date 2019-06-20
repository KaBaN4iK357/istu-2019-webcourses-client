const assert = require(`assert`);
const cartCount = require(`../src/cartCount`);

let purchases = [{
  city: `Сочи`,
  price: 20000,
  count: 2
}, {
  city: `Ижевск`,
  price: 1000,
  count: 4
}, {
  city: `Анапа`,
  price: 10000,
  count: 1
}, {
  city: `Магадан`,
  price: 10000,
  count: 10
}];

describe(`cartCount`, function () {
  it(`test1`, function () {
    assert.equal(cartCount(purchases), 154000);
  });
  it(`test1`, function () {
    assert.equal(cartCount([]), 0);
  });
})
