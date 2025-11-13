const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');

//GET /api/products => devuelve todos los productos activos con paginacion
router.get('/', productController.getAllProducts);

//GET /api/products/paginated => devuelve productos con paginacion
router.get('/paginated', productController.getPaginatedProducts);

// POST /api/products => crea un nuevo producto
router.post('/', productController.createProduct);

//GET /api/products/:id => devuelve un producto por su ID
router.get('/:id', productController.getProductById);

// PUT /api/products/:id => actualiza un producto por su ID
router.put('/:id', productController.updateProduct);

// DELETE /api/products/:id => elimina un producto por su ID
router.delete('/:id', productController.deleteProduct);

// POST /api/products/:id/activate => activa un producto
router.post('/:id/activate', productController.activateProduct);



module.exports = router;