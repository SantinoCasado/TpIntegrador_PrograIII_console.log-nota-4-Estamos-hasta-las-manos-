const express = require('express');
const router = express.Router();
const saleController = require('../../controllers/saleController');

//GET /api/sales => obtener todas las ventas
router.get('/', saleController.getAllSales);

// GET /api/sales/:id => obtener una venta por su ID
router.get('/:id', saleController.getSaleById);

// POST /api/sales => crear una nueva venta
router.post('/', saleController.createSale);

// PUT /api/sales/:id => actualizar una venta existente
router.put('/:id', saleController.updateSale);

// DELETE /api/sales/:id => eliminar una venta
router.delete('/:id', saleController.deleteSale);

// POST /api/sales/:id/complete => completar una venta
router.post('/:id/complete', saleController.completeSale);

// POST /api/sales/:id/cancel => cancelar una venta
router.post('/:id/cancel', saleController.cancelSale);

module.exports = router;