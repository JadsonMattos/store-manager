const { productsService } = require('../services');

const validateProductUpdate = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const updated = await productsService.put(id, name);
  if (!updated) return res.status(404).json({ message: 'Product not found' });
  return next();
};

module.exports = validateProductUpdate;
