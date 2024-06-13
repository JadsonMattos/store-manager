const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { status: 'SUCCESSFUL', data: products };
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESSFUL', data: product };
};

const insert = async (name) => {
  const productId = await productsModel.insert(name);
  if (!productId) return { status: 'NOT_FOUND', data: { message: 'Error' } };
  const newProduct = await productsModel.getById(productId);
  return { status: 'CREATED', data: newProduct };
};

const put = async (id, name) => {
  const product = await productsModel.getById(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  await productsModel.put(id, name);
  const newProduct = await productsModel.getById(id);
  return { status: 'SUCCESSFUL', data: newProduct };
};

const deleteId = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  await productsModel.deleteId(id);
  return { status: 'NO_CONTENT', data: {} };
};

module.exports = {
  getAll,
  getById,
  insert,
  put,
  deleteId,
};