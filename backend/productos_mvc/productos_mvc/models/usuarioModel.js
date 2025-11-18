/**
 * Modelo de Usuario (usuarioModel.js)
 * Define la estructura y configuración de la tabla de usuarios en la base de datos
 */

// Importamos DataTypes de Sequelize para definir los tipos de datos
const {DataTypes} = require("sequelize");

// Importamos la conexión a la base de datos
const sequelize = require("./db");

/**
 * Definición del modelo Usuario usando Sequelize
 * Este modelo representa la tabla 'usuarios' en la base de datos
 */
const UsuarioModel = sequelize.define('Usuario', 
    {
        // Definición de campos (columnas) de la tabla
        // Nota: El ID se genera automáticamente por Sequelize
        //id : {type: DataTypes.INTEGER, primaryKey: true},
        
        legajo : {
            type: DataTypes.INTEGER,   // Tipo de dato: Número entero
            allowNull: false,          // No se permite valor nulo
            unique : true              // Debe ser único en la tabla
        },
        apellido : {
            type: DataTypes.STRING,    // Tipo de dato: Texto
            allowNull : false          // No se permite valor nulo
        },
        nombre : {
            type: DataTypes.STRING,    // Tipo de dato: Texto
            allowNull : false          // No se permite valor nulo
        },
        clave : {
            type: DataTypes.STRING,    // Tipo de dato: Texto (para la contraseña)
            allowNull : false          // No se permite valor nulo
        }
    }, 
    {
        tableName : "usuarios",        // Nombre de la tabla en la base de datos
        timestamps : false            // No incluir campos de fecha de creación/actualización
    }
);

// Exportamos el modelo para usarlo en otros archivos
module.exports = UsuarioModel;