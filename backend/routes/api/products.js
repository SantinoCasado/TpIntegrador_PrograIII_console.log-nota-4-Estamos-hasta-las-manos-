const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');

//GET /api/products => devuelve todos los productos activos con paginacion
router.get('/', productController.getAllProducts);

//GET /api/products/:id => devuelve un producto por su ID
router.get('/:id', productController.getProductById);

//GET /api/products/category/:category => devuelve productos por categoria
router.get('/category/:category', productController.getProductsByCategory);

module.exports = router;