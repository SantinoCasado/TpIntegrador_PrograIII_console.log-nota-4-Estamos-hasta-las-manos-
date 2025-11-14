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
        // El login fue exitoso
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
    // Destruir la sesion (si se usa sesiones)
    res.redirect('/admin/login');
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
        const products = await Product.findAll();
        res.render('admin/products', {
            title: 'Products Management',
            products: products
        });
    } catch (error) {
        res.render('admin/products', {
            title: 'Products Management',
            error: 'An error occurred while loading the products',
            products: []
        });
    }
};

// GET - Muestro nueva forma de producto
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
        await Product.create({
            ...req.body,      // nombre, description, price, category, isActive
            isActive: true
        });
        res.redirect('/admin/dashboard/products');
    } catch (error) {
        res.render('admin/product-form', {
            title: 'Add New Product',
            product: req.body,
            action: 'create',
            error: 'An error occurred while creating the product'
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
        res.redirect('/admin/dashboard/products');
    }
};

// PUT - Actualizo un producto existente
const updateProduct = async (req, res) => {
    try{
        await Product.update(req.body, {
            where: { id: req.params.id }
        });
        res.redirect('/admin/dashboard/products');
    } catch (error) {
        res.render('admin/product-form', {
            title: 'Edit Product',
            // Obtengo el producto original para mostrar en el formulario y llenar los campos
            product: { ...product.dataValues, ...req.body}, //
            action: 'edit',
            error: 'An error occurred while updating the product'
        });
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