const { productsModel } = require('../../models');
const { array } = require('./saleSchema');

const validation = async (itemsSold) => {
  const { error } = await array.validate(itemsSold);
  if (error) return { type: 'INVALID_DATA', message: error.message };

  const products = await Promise.all(itemsSold
    .map(async ({ productId }) => productsModel.getById(productId)));
  const product = products.some((item) => item === undefined);
  if (product) return { type: 'NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  validation,
};