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
            res.status(404).json({ error: 'Venta no encontrada' });
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
        res.json({ message: 'Venta actualizada correctamente' });
    }catch (error) {
        res.json({ message: error.message });
    }
};