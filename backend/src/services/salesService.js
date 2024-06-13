const { salesModel } = require('../models');
const schema = require('./validations/validations');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return { status: 'SUCCESSFUL', data: sales };
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (sale.length > 0) return { status: 'SUCCESSFUL', data: sale };
  return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
};

const insert = async (salesProducts) => {
  const error = await schema.validation(salesProducts);
  if (error) return { status: error.type, data: { message: error.message } };
  const saleId = await salesModel.insert();
  const products = await Promise.all(salesProducts.map(({ productId, quantity }) => (
    salesModel.insertProducts({ saleId, productId, quantity }))));
  if (!products) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'CREATED', data: { id: saleId, itemsSold: products } };
};

const deleteId = async (id) => {
  const sale = await salesModel.getById(id);
  if (sale.length > 0) {
    await salesModel.deleteId(id);
    return { status: 'NO_CONTENT', data: {} };
  }
  return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
};

// const updateQuantity = async (saleId, productId, quantity) => {
//   const sale = await salesModel.getById(saleId);
//   if (!sale) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

//   const updateResult = await salesModel.updateQuantity(saleId, productId, quantity);

//   if (updateResult.affectedRows === 0) {
//     return { status: 'NOT_FOUND', data: { message: 'Product not found in sale' } };
//   }

//   const updatedSale = await salesModel.getById(saleId);
//   return { status: 'SUCCESSFUL', data: updatedSale };
// };

const updateQuantity = async (saleId, productId, quantity) => {
  const sale = await salesModel.getById(saleId);
  if (sale.length > 0) {
    const saleProduct = await salesModel.getById(productId);
    if (saleProduct.length > 0) {
      await salesModel.updateQuantity(saleId, productId, quantity);
      const { date } = sale[0];
      return { status: 'SUCCESSFUL',
        data: { date, productId: +productId, quantity: +quantity, saleId: +saleId } };
    }
    return { status: 'NOT_FOUND', data: { message: 'Product not found in sale' } };
  }
  return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
};

module.exports = {
  getAll,
  getById,
  insert,
  deleteId,
  updateQuantity,
};