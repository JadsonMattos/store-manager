const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAll = async (_req, res) => {
  const { status, data } = await productsService.getAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.getById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const insert = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await productsService.insert(name);
  return res.status(mapStatusHTTP(status)).json(data);
};

const put = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { status, data } = await productsService.put(id, name);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteId = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.deleteId(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAll,
  getById,
  insert,
  put,
  deleteId,
};