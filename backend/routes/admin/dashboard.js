const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController');
const protegerRuta = require('../../middleware/auth');

//GET /admin/dashboard => muestra el panel de administracion
router.get('/dashboard', protegerRuta, adminController.showDashboard);

// GET /admin/dashboard/products => muestra la lista de productos en el dashboard
router.get('/dashboard/products', protegerRuta, adminController.showProducts);

// GET /admin/dashboard/products/new =>Mostrar formulario para crear nuevo producto
router.get('/dashboard/products/new', protegerRuta, adminController.showNewProduct);

// RUTAS ESPECÍFICAS PRIMERO - GET admin/dashboard/products/:id/edit => Mostrar formulario para editar un producto
router.get('/dashboard/products/:id/edit', protegerRuta, adminController.showEditProduct);

// POST /admin/dashboard/products/:id/activate => activar/desactivar un producto
router.post('/dashboard/products/:id/activate', protegerRuta, adminController.activateProduct);

// POST /admin/dashboard/products => procesar la creacion de un nuevo producto
router.post('/dashboard/products', protegerRuta, adminController.createProduct);

// PUT /admin/dashboard/products/:id => procesar la edicion de un producto
router.put('/dashboard/products/:id', protegerRuta, adminController.updateProduct);

// DELETE /admin/dashboard/products/:id => procesar la eliminacion de un producto
router.delete('/dashboard/products/:id', protegerRuta, adminController.deleteProduct);

module.exports = router;