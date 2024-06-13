const salesALL = [
  { saleId: 1, date: '2023-11-23T03:32:09.000Z', productId: 1, quantity: 5 },
  { saleId: 1, date: '2023-11-23T03:32:09.000Z', productId: 2, quantity: 10 },
  { saleId: 2, date: '2023-11-23T03:32:09.000Z', productId: 3, quantity: 15 },
];

const saleID = { saleId: 2, date: '2023-11-23T03:32:09.000Z', productId: 3, quantity: 15 };

const salesProducts = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 5 },
];

const salesStatus = {
  status: 'SUCCESSFUL',
  data: salesALL,
};
const saleSuccessful = {
  status: 'SUCCESSFUL',
  data: saleID,
};
const saleNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Sale not found' },
};
const salesProductsCreated = {
  status: 'CREATED',
  data: { id: 3, itemsSold: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }] },
};

module.exports = {
  salesALL,
  saleID,
  salesStatus,
  saleSuccessful,
  saleNotFound,
  salesProducts,
  salesProductsCreated,
};