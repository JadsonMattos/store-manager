const router = require('express').Router();
const { salesController } = require('../controllers');
const validateQuantity = require('../middlewares/validateQuantity');
const validateSale = require('../middlewares/validateSale');

router.get('/sales', salesController.getAll);
router.get('/sales/:id', salesController.getById);
router.post('/sales', validateSale, salesController.insert);
router.delete('/sales/:id', salesController.deleteId);
router
  .put('/sales/:saleId/products/:productId/quantity', validateQuantity, salesController
    .updateQuantity);

module.exports = router;