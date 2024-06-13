const router = require('express').Router();
const { productsController } = require('../controllers');
const validateProduct = require('../middlewares/validateProduct');
const validateProductUpdate = require('../middlewares/validateProductUpdate');

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.getById);
router.post('/products', validateProduct, productsController.insert);
router.put('/products/:id', validateProduct, validateProductUpdate, productsController.put);
router.delete('/products/:id', productsController.deleteId);

module.exports = router;