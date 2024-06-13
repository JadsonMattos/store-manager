const validateSale = (req, res, next) => {
  const itemsSold = req.body;
  
  const productsId = itemsSold.map((product) => product.productId);
  const productId = productsId.some((id) => id === undefined);
  if (productId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  const quantities = itemsSold.map((product) => product.quantity);
  const quantity = quantities.some((quant) => quant === undefined);
  if (quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

module.exports = validateSale;