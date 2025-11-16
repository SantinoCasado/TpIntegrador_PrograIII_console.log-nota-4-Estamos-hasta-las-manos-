// 1. Importo el constructor sequelize
const { Sequelize } =  require("sequelize");

// 2. Crear la conexion a la base de datos-
const db = new Sequelize(
    'gaming', // Nombre CORRECTO de la base de datos
    'root', // Nombre de usuario
    '46184393', // Contraseña
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        dialectOptions: {
            // Deshabilitamos SSL completamente para desarrollo local
            ssl: false,
            connectTimeout: 60000,
        },
        // Configuraciones adicionales de Sequelize
        ssl: false,
        logging: false, // Desactiva los logs de SQL en consola
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        // CONFIGURACIONES PARA PERSISTIR DATOS
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: true, // Crear createdAt y updatedAt
            freezeTableName: true, // No pluralizar nombres de tablas
            underscored: false // Usar camelCase
        },
        // Configurar para que mantenga la conexión
        retry: {
            match: [
                /ETIMEDOUT/,
                /EHOSTUNREACH/,
                /ECONNRESET/,
                /ECONNREFUSED/,
                /ETIMEDOUT/,
                /ESOCKETTIMEDOUT/,
                /EHOSTUNREACH/,
                /EPIPE/,
                /EAI_AGAIN/,
                /SequelizeConnectionError/,
                /SequelizeConnectionRefusedError/,
                /SequelizeHostNotFoundError/,
                /SequelizeHostNotReachableError/,
                /SequelizeInvalidConnectionError/,
                /SequelizeConnectionTimedOutError/
            ],
            max: 3
        }
    }
);


// Función para inicializar la base de datos
const initializeDatabase = async () => {
    try {
        await db.authenticate();
        console.log('✅ Database connection established successfully');
        
        // Sincronizar modelos (crear tablas si no existen)
        await db.sync({ alter: false }); // NO usar force: true para no borrar datos
        console.log('✅ Database synchronized successfully');
        
        return true;
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error.message);
        return false;
    }
};

// Exportar tanto la conexión como la función de inicialización
module.exports = { db, initializeDatabase };