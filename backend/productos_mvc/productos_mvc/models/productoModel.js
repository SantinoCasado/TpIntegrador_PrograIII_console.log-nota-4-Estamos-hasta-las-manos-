/**
 * Modelo de Producto (productoModel.js)
 * Define la estructura y configuración de la tabla de productos en la base de datos
 */

// Importamos DataTypes de Sequelize para definir los tipos de datos
const {DataTypes} = require("sequelize");

// Importamos la conexión a la base de datos
const sequelize = require("./db");

/**
 * Definición del modelo Producto usando Sequelize
 * Este modelo representa la tabla 'productos' en la base de datos
 */
const ProductoModel = sequelize.define('Producto', 
    {
        // Definición de campos (columnas) de la tabla
        codigo : {
            type: DataTypes.INTEGER,  // Tipo de dato: Número entero
            primaryKey: true          // Este campo es la clave primaria
        },
        marca : {
            type: DataTypes.STRING,   // Tipo de dato: Texto
            allowNull : false         // No se permite valor nulo
        },
        precio : {
            type: DataTypes.DOUBLE,   // Tipo de dato: Número decimal
            allowNull : false         // No se permite valor nulo
        },
        path : {
            type: DataTypes.STRING,   // Tipo de dato: Texto (para guardar la ruta de la imagen)
            allowNull : false         // No se permite valor nulo
        }
    }, 
    {
        tableName : "productos",      // Nombre de la tabla en la base de datos
        timestamps : false           // No incluir campos de fecha de creación/actualización
    }
);

// Exportamos el modelo para usarlo en otros archivos
module.exports = ProductoModel;