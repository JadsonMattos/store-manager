const connection = require('../database/connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products ORDER BY id');
  return products;
};

const getById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id',
    [id],
  );
  return product;
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return insertId;
};

const put = async (id, name) => {
  const [update] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return update;
};

const deleteId = async (id) => {
  const [deleted] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return deleted;
};

module.exports = {
  getAll,
  getById,
  insert,
  put,
  deleteId,
};