const { Product } = require('../models');

// C - CREATE - crear un nuevo product
const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create({
            ...req.body, // Asumiendo que el cuerpo de la solicitud tiene los campos necesarios
            isActive: true
        });
        res.json(newProduct);
    } catch (error) {
        res.json({ message: error.message });
    }
};

//  R - READ - obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ 
            where: { isActive: true } 
        });
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// R - READ - obtener todos los productos para admin (incluye inactivos)
const getAllProductsAdmin = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const category = req.query.category || '';
        const status = req.query.status || '';

        // Construir condiciones de filtro
        let whereConditions = {};
        
        if (category) {
            whereConditions.category = category;
        }
        
        if (status !== '') {
            whereConditions.isActive = status === 'true';
        }

        const { count, rows } = await Product.findAndCountAll({
            where: whereConditions,
            order: [['createdAt', 'DESC']],
            limit: limit,
            offset: offset
        });

        const totalPages = Math.ceil(count / limit);

        res.json({
            products: rows,
            currentPage: page,
            totalPages: totalPages,
            totalProducts: count,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        });
    } catch (error) {
        console.error('Error in getAllProductsAdmin:', error);
        res.status(500).json({ 
            error: 'Error al obtener los productos',
            message: error.message 
        });
    }
};


// R - READ - obtener un producto por ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if(product){
            res.json(product);
        }else{
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
    res.json({ error: 'Error al obtener el producto' });
    }
};

// R - READ - obtener productos por categoria
const getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.findAll({ 
            where: { 
                category: req.params.category,
                isActive: true
            } 
        });
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// R - READ - obtener productos con paginacion
const getPaginatedProducts = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1; // Pagina por defecto 1
        const limit = parseInt(req.query.limit) || 10; // Limite por defecto 10
        const offset = (page - 1) * limit;  // desde donde empezar a traer los datos
        
        const { count, rows: products } = await Product.findAndCountAll({
            where: { isActive: true },
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']]
        });
        
        res.json({
            products: products,
            totalProducts: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// U - UPADATE - actualizar un producto
const updateProduct = async (req, res) => {
    try {
        const upadtedProduct = await Product.update(req.body, {
            where: { id: req.params.id }
        });
        res.json(upadtedProduct);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// D - DELETE - eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        await Product.update({ isActive: false }, {
            where: { id: req.params.id }
        });
        res.json({ message: 'Product deactivated successfully' });
    }catch (error) {
        res.json({ message: error.message });
    }
};

// Reactivar un producto
const activateProduct = async (req, res) => {
    try {
        await Product.update(
            { isActive: true }, 
            {where: { id: req.params.id }}
        );
        res.json({ message: 'Product activated successfully' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getAllProductsAdmin,
    getProductById,
    getProductsByCategory,
    getPaginatedProducts,
    updateProduct,
    deleteProduct,
    activateProduct
};