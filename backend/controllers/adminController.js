const {User, Product, Sale} = require('../models');
const bcrypt = require('bcryptjs');

// ======================= LOGIN DE ADMINISTRADOR ========================
// Get - Muestro la pagina de login
const showLogin = (req, res) => {
    res.render('admin/login', { 
        title: 'Admin Login' 
    });
};

// POST - proceso de login
const processLogin = async (req, res) => {
    try {
        const {email, password} = req.body; // obtengo los datos del formulario

        // Buscar el usuario por email
        const user = await User.findOne({ 
            where: { email } 
        });

        if(!user){
            return res.render('admin/login', {
                title: 'Admin Login',
                error: 'Invalid credentials'
            });
        }

        // Verifico la contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            return res.render('admin/login', {
                title: 'Admin Login',
                error: 'Invalid credentials'
            });
        }
        // El login fue exitoso - Crear sesión usando patrón del profesor
        req.session.usario = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        res.redirect('/admin/dashboard');

    } catch (error) {
        res.render('admin/login', {
            title: 'Admin Login',
            error: 'An error occurred during login'
        });
    }
};

// GET -  Logout de admin
const logout = (req, res) => {
    // Destruir la sesión
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/admin/login');
    });
};

// ======================= DASHBOARD DE LAS VIEWS ========================
// GET - Muestro el dashboard main
const showDashboard = async (req, res) => {
    try {
        // Obtener datos para el dashboard
        const totalUsers = await User.count();
        const totalProducts = await Product.count();
        const activeProducts = await Product.count({where:{isActive:true}});
        const totalSales = await Sale.count();

        res.render('admin/dashboard', {
            title: 'Admin Dashboard',
            stats: {
                totalUsers,
                totalProducts,
                activeProducts,
                totalSales
            }
        });
    } catch (error) {
        res.render('admin/dashboard', {
            title: 'Admin Dashboard',
            error: 'An error occurred while loading the dashboard'
        });
    }
};

// View de los productos
// GET - Muestro todos los productos
const showProducts = async (req, res) => {
    try {
        // No cargar productos aquí, dejar que el JavaScript los cargue dinámicamente
        res.render('admin/products', {
            title: 'Products Management',
            products: [], // Array vacío para que el JavaScript tome el control
            totalProducts: 0 // Se actualizará via JavaScript
        });
    } catch (error) {
        res.render('admin/products', {
            title: 'Products Management', 
            error: 'An error occurred while loading the products',
            products: [],
            totalProducts: 0
        });
    }
};// GET - Muestro nueva forma de producto
const showNewProduct = (req, res) => {
    res.render('admin/product-form', {
        title: 'Add New Product',
        product: null, // Nuevo producto
        action: 'create'
    });
};

// POST - Creo un nuevo producto
const createProduct = async (req, res) => {
    try {
        // Validar que la URL de imagen no sea demasiado larga
        if (req.body.image && req.body.image.length > 10000) {
            throw new Error('Image URL is too long. Please use a shorter URL or upload to an image hosting service.');
        }
        
        const newProduct = await Product.create({
            ...req.body,      // nombre, description, price, category, isActive
            isActive: true
        });
        
        res.redirect('/admin/dashboard/products');
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.render('admin/product-form', {
            title: 'Add New Product',
            product: req.body,
            action: 'create',
            error: 'Error creating product: ' + error.message
        });
    }
};

// GET - Muestro la nueva forma editada del producto
const showEditProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if(!product){
            return res.redirect('/admin/dashboard/products');
        }

        res.render('admin/product-form', {
            title: 'Edit Product',
            product: product,
            action: 'edit'
        });
    } catch (error) {
        console.error('Error in showEditProduct:', error);
        res.redirect('/admin/dashboard/products');
    }
};

// PUT - Actualizo un producto existente
const updateProduct = async (req, res) => {
    
    try{
        const [updatedRows] = await Product.update(req.body, {
            where: { id: req.params.id }
        });
        
        if (updatedRows === 0) {
            return res.redirect('/admin/dashboard/products');
        }
        
        res.redirect('/admin/dashboard/products');
    } catch (error) {
        console.error('Error updating product:', error);
        
        // Buscar el producto para mostrar en el formulario con error
        try {
            const product = await Product.findByPk(req.params.id);
            res.render('admin/product-form', {
                title: 'Edit Product',
                product: product,
                action: 'edit',
                error: 'An error occurred while updating the product'
            });
        } catch (findError) {
            res.redirect('/admin/dashboard/products');
        }
    }
};

// DELETE - Elimino un producto logicamente
const deleteProduct = async (req, res) => {
    try {
        await Product.update(
            { isActive: false },
            { where: { id: req.params.id } }
        );
        res.redirect('/admin/dashboard/products');
    } catch (error) {
        res.redirect('/admin/dashboard/products');
    }
};

// POST - Activar un producto logicamente
const activateProduct = async (req, res) => {
    try {
        await Product.update(
            { isActive: true },
            { where: { id: req.params.id } }
        );
        res.redirect('/admin/dashboard/products');
    } catch (error) {
        res.redirect('/admin/dashboard/products');
    }
};

module.exports = {
    showLogin,
    processLogin,
    logout,
    showDashboard,
    showProducts,
    showNewProduct,
    createProduct,
    showEditProduct,
    updateProduct,
    deleteProduct,
    activateProduct
};