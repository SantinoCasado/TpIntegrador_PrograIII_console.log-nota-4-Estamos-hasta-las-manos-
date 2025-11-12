const { Sale, Product, SaleProduct } = require('../models');

// C - CREATE - crear una nueva venta
const createSale = async (req, res) => {
    try {
        const newSale = await Sale.create(req.body); // Se asume que el cuerpo de la solicitud tiene los campos necesarios
        res.json(newSale);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// R - READ - obtener todas las ventas
const getAllSales = async (req, res) => {
    try {
        const sales = await Sale.findAll({ 
            include: [{
                model: Product,
                as: 'products',
                through: { attributes: ['quantity', 'unitPrice'] } // Excluir atributos de la tabla intermedia
        }]
    });
    res.json(sales);
    } catch (error) {
        res.json({ message: error.message });
    }
}; 

// R - READ - obtener una venta por ID
const getSaleById = async (req, res) => {
    try {
        const sale = await Sale.findByPk(req.params.id, {
            include: [{
                model: Product,
                as: 'products',
                through: { attributes: ['quantity', 'unitPrice'] } // Excluir atributos de la tabla intermedia
        }]
        });
        if(sale){
            res.json(sale);
        }else{
            res.status(404).json({ message: 'Sale not found' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

// U - UPDATE - actualizar una veenta que EXISTE
const updateSale = async (req, res) => {
    try {
        const sale = await Sale.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({ message: 'Sale updated successfully' });
    }catch (error) {
        res.json({ message: error.message });
    }
};

// D - DELETE - eliminar una venta SIN DESACTIVAR
const deleteSale = async (req, res) => {
    try {
        await Sale.destroy({
            where: { id: req.params.id }
        });
        res.json({ message: 'Sale deleted successfully' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Marcar como completada la venta
const completeSale = async (req, res) => {
    try {
        await Sale.update(
            { status: 'completed' },
            { where: { id: req.params.id } }
        );
        res.json({ message: 'Sale completed successfully' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

//Marcar como cancelada la centa
const cancelSale = async (req, res) => {
    try {
        await Sale.update(
            { status: 'canceled' },
            { where: { id: req.params.id } }
        );
        res.json({ message: 'Sale canceled successfully' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

module.exports = {
    createSale,
    getAllSales,
    getSaleById,
    updateSale,
    deleteSale,
    completeSale,
    cancelSale
};