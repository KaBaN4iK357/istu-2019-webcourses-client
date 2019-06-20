module.exports =  function getPurchasesCount(purchases) {
  return purchases.reduce((acc, x) => acc + x.count * x.price, 0);
}
