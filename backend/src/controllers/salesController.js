const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAll = async (_req, res) => {
  const { status, data } = await salesService.getAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.getById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const insert = async (req, res) => {
  const sales = req.body;
  const { status, data } = await salesService.insert(sales);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteId = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.deleteId(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updateQuantity = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;
  const { status, data } = await salesService.updateQuantity(saleId, productId, quantity);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAll,
  getById,
  insert,
  deleteId,
  updateQuantity,
};
