const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');
const { validateProduct } = require('../../middleware/validation');

//GET /api/products => devuelve todos los productos activos con paginacion
router.get('/', productController.getAllProducts);

//GET /api/products/paginated => devuelve productos con paginacion
router.get('/paginated', productController.getPaginatedProducts);

//GET /api/products/admin => devuelve todos los productos (incluyendo inactivos) para admin
router.get('/admin', productController.getAllProductsAdmin);

// POST /api/products => crea un nuevo producto (CON VALIDACIÓN)
router.post('/', validateProduct, productController.createProduct);

//GET /api/products/:id => devuelve un producto por su ID
router.get('/:id', productController.getProductById);

// PUT /api/products/:id => actualiza un producto por su ID (CON VALIDACIÓN)
router.put('/:id', validateProduct, productController.updateProduct);

// DELETE /api/products/:id => elimina un producto por su ID
router.delete('/:id', productController.deleteProduct);

// POST /api/products/:id/activate => activa un producto
router.post('/:id/activate', productController.activateProduct);



module.exports = router;