const validateSale = (request, response, next) => {
    const { customerName, products } = request.body;
    
    // Verificar que existe nombre del cliente
    if (!customerName || customerName.trim() === '') {
        return response.status(400).json({ 
            exito: false, 
            mensaje: 'The name of the customer is required' 
        });
    }
    
    // Verificar que existe el array de productos
    if (!products || !Array.isArray(products) || products.length === 0) {
        return response.status(400).json({ 
            exito: false, 
            mensaje: 'At least one product must be included' 
        });
    }
    
    // Verificar que cada producto tenga los datos necesarios
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        
        if (!product.productId || typeof product.productId !== 'number') {
            return response.status(400).json({ 
                exito: false, 
                mensaje: `Product ${i + 1}: Invalid ID` 
            });
        }
        
        if (!product.quantity || product.quantity < 1) {
            return response.status(400).json({ 
                exito: false, 
                mensaje: `Product ${i + 1}: Invalid quantity` 
            });
        }
    }
    
    // Si todo está bien, continuar
    next();
};

// Valida los datos de un producto
const validateProduct = (request, response, next) => {
    const { name, price, category } = request.body;
    
    // Verificar nombre
    if (!name || name.trim() === '') {
        return response.status(400).json({ 
            exito: false, 
            mensaje: 'The product name is required' 
        });
    }
    
    // Verificar precio
    if (!price || isNaN(price) || price < 0) {
        return response.status(400).json({ 
            exito: false, 
            mensaje: 'The price must be a positive number' 
        });
    }
    
    // Verificar categoría
    if (!category || (category !== 'hardware' && category !== 'software')) {
        return response.status(400).json({ 
            exito: false, 
            mensaje: 'The category must be "hardware" or "software"' 
        });
    }
    
    // Si todo está bien, continuar
    next();
};

// Exportar las funciones de validación
module.exports = {
    validateSale,
    validateProduct
};