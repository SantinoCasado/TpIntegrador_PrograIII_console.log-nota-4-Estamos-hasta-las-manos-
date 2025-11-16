const { initializeDatabase } = require('../data/database');
const { User, Product, Sale, SaleProduct } = require('../models');
const bcrypt = require('bcryptjs');

const initializeData = async () => {
    try {
        console.log('Initializing database...');
        
        // Primero inicializar la conexión
        const dbConnected = await initializeDatabase();
        if (!dbConnected) {
            throw new Error('Could not connect to database');
        }

        // Verificar si ya existe el usuario admin
        const existingAdmin = await User.findOne({ 
            where: { email: 'admin@gaming.com' } 
        });

        if (!existingAdmin) {
            console.log('Creating admin user...');
            const hashedPassword = await bcrypt.hash('admin123', 12);
            
            await User.create({
                name: 'Gaming Admin',
                email: 'admin@gaming.com',
                password: hashedPassword,
                isActive: true
            });
            
            console.log('Admin user created successfully');
            console.log('Email: admin@gaming.com');
            console.log('Password: admin123');
        } else {
            console.log('Admin user already exists');
        }

        // Verificar productos de ejemplo
        const productCount = await Product.count();
        if (productCount === 0) {
            console.log('Creating sample products...');
            
            const sampleProducts = [
                {
                    name: 'Gaming Keyboard RGB',
                    description: 'Mechanical gaming keyboard with RGB lighting',
                    price: 89.99,
                    category: 'hardware',
                    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400',
                    isActive: true
                },
                {
                    name: 'Gaming Mouse Pro',
                    description: 'High-precision gaming mouse with 12000 DPI',
                    price: 59.99,
                    category: 'hardware',
                    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
                    isActive: true
                },
                {
                    name: 'Game Development Suite',
                    description: 'Complete game development software package',
                    price: 199.99,
                    category: 'software',
                    image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=400',
                    isActive: true
                }
            ];

            for (const product of sampleProducts) {
                await Product.create(product);
            }
            
            console.log('Sample products created successfully');
        } else {
            console.log('Products already exist');
        }

        console.log('Database initialization completed successfully!');
        
    } catch (error) {
        console.error('Error initializing database:', error.message);
        process.exit(1);
    }
};

// Ejecutar solo si este archivo es llamado directamente
if (require.main === module) {
    initializeData().then(() => {
        console.log('Initialization script completed');
        process.exit(0);
    }).catch((error) => {
        console.error('Initialization script failed:', error.message);
        process.exit(1);
    });
}

module.exports = { initializeData };