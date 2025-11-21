const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { db } = require('../data/database');

async function createAdmin() {
    try {
        await db.authenticate();
        console.log('Conexión a la base de datos establecida');
        
        const admins = [
            {
                name: 'Santino Casado',
                email: 'santinocasado@gaming.com',
                password: 'gameModeCreative'
            },
            {
                name: 'Thiago Fernandez',
                email: 'thiagoFernandezL@gaming.com',
                password: 'gameModeCreative'
            }
        ];

        for (const admin of admins) {
            // Verificar si el usuario ya existe
            const existingUser = await User.findOne({ 
                where: { email: admin.email } 
            });

            if (existingUser) {
                console.log(`El usuario ${admin.email} ya existe`);
                continue;
            }

            // Encriptar contraseña
            const hashedPassword = await bcrypt.hash(admin.password, 10);

            // Crear usuario
            await User.create({
                name: admin.name,
                email: admin.email,
                password: hashedPassword,
                isAdmin: true
            });

            console.log(`Admin creado: ${admin.email}`);
        }

        console.log('\nProceso completado');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

createAdmin();