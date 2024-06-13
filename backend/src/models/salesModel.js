// const snakeize = require('snakeize');
const connection = require('../database/connection');

const getAll = async () => {
  const [sales] = await connection.execute(`SELECT
    sales.id AS saleId,
    sales.date, sales_products.product_id AS productId, sales_products.quantity
    FROM StoreManager.sales
    INNER JOIN StoreManager.sales_products ON sales.id = sales_products.sale_id
    ORDER BY saleId ASC, productId ASC
  `);
  return sales;
};

const getById = async (id) => {
  const [sale] = await connection.execute(`SELECT
    sales.date, sales_products.product_id AS productId, sales_products.quantity
    FROM StoreManager.sales
    INNER JOIN StoreManager.sales_products ON sales.id = sales_products.sale_id
    WHERE sales.id = ?
    ORDER BY productid ASC`, [id]);
  if (!sale) return null;
  return sale;
};

const insert = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (CURRENT_TIMESTAMP)',
  );
  return insertId;
};

const insertProducts = async (salesProducts) => {
  const { saleId, productId, quantity } = salesProducts;
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return { productId, quantity };
};

const deleteId = async (id) => {
  const [remove] = await connection.execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
  return remove;
};

const updateQuantity = async (saleId, productId, quantity) => {
  const [update] = await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, saleId, productId],
  );
  return update;
};

module.exports = {
  getAll,
  getById,
  insert,
  insertProducts,
  deleteId,
  updateQuantity,
};