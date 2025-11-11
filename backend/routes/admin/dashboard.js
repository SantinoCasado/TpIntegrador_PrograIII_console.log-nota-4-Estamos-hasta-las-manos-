const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController');

//GET /admin/dashboard => muestra el panel de administracion
router.get('/dashboard', adminController.showDashboard);

// GET /admin/dashboard/products => muestra la lista de productos en el dashboard
router.get('/dashboard/products', adminController.showProducts);

// GET /admin/dashboard/products/new =>Mostrar formulario para crear nuevo producto
router.get('/dashboard/products/new', adminController.showNewProduct);

// POST /admin/dashboard/products => procesar la creacion de un nuevo producto
router.post('/dashboard/products', adminController.createProduct);

// GET admin/dashboard/products/:id/edit => Mostrar formulario para editar un producto
router.get('/dashboard/products/:id/edit', adminController.showEditProduct);

// PUT /admin/dashboard/products/:id => procesar la edicion de un producto
router.put('/dashboard/products/:id', adminController.updateProduct);

// DELETE /admin/dashboard/products/:id => procesar la eliminacion de un producto
router.delete('/dashboard/products/:id', adminController.deleteProduct);

// POST /admin/dashboard/products/:id/activate => activar/desactivar un producto
router.post('/dashboard/products/:id/activate', adminController.activateProduct);

module.exports = router;