/**
 * Configuración de la Base de Datos (db.js)
 * Este archivo establece la conexión con la base de datos MySQL usando Sequelize
 */

// Código comentado: versión anterior usando mysql2 directamente
/*
const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "productos_node"
});

module.exports = db;
*/

// Importamos Sequelize, un ORM (Object-Relational Mapping) para Node.js
const { Sequelize } = require('sequelize');

/**
 * Creación de la instancia de Sequelize
 * @param {string} 'productos_usuarios_node' - Nombre de la base de datos
 * @param {string} 'root' - Usuario de MySQL
 * @param {string} '' - Contraseña (vacía en este caso)
 * @param {Object} options - Opciones de configuración
 */
const sequelize = new Sequelize('productos_usuarios_node', 'root', '', {
  host: 'localhost',      // Servidor de la base de datos
  dialect: 'mysql'       // Tipo de base de datos que estamos usando
});

// Exportamos la conexión para usarla en otros archivos
module.exports = sequelize;