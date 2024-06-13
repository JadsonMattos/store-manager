const productsALL = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const productID = { id: 1, name: 'Martelo de Thor' };

const productPostName = { name: 'ProdutoX' };

const productPostId = { id: 4, name: 'ProdutoX' };

const productUpdate = { name: 'Martelo do Batman' };

const productUpdateId = { id: 1, name: 'Martelo do Batman' };

const productDeleted = { id: 10, name: 'ProdutoY' };

const productsStatus = {
  status: 'SUCCESSFUL',
  data: productsALL,
};
const productSuccessful = {
  status: 'SUCCESSFUL',
  data: productID,
};
const productNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};
const productCreated = {
  status: 'CREATED',
  data: productPostId,
};
const productSuccessfulUpdate = {
  status: 'SUCCESSFUL',
  data: productUpdateId,
};
const productsSuccessfulDelete = {
  status: 'NO_CONTENT',
  data: productDeleted,
};

module.exports = {
  productsALL,
  productID,
  productsStatus,
  productSuccessful,
  productNotFound,
  productCreated,
  productPostId,
  productPostName,
  productUpdate,
  productUpdateId,
  productSuccessfulUpdate,
  productDeleted,
  productsSuccessfulDelete,
};