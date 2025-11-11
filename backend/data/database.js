// 1. Importo el constructor sequelize
const { Sequelize } =  require("sequelize");

// 2. Crear la conexion a la base de datos-
const db = new Sequelize(
    'gaming', // Nombre de la base de datos
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
        }
    }
);

module.exports = db; // Exporto la conexion para usarla en otros archivos