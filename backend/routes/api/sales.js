const express = require('express');
const router = express.Router();
const saleController = require('../../controllers/saleController');

// POST /api/sales => crear una nueva venta
router.post('/', saleController.createSale);

//GET /api/sales => obtener todas las ventas
router.get('/', saleController.getAllSales);

// GET /api/sales/:id => obtener una venta por su ID
router.get('/:id', saleController.getSaleById);

module.exports = router;