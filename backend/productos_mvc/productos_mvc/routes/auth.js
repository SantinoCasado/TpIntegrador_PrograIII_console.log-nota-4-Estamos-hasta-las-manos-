/**
 * Rutas de Autenticación (auth.js)
 * Define todas las rutas relacionadas con la autenticación de usuarios:
 * login, registro y logout
 */

// Importamos Express para crear el router
const express = require('express');

// Creamos un nuevo router
const rutas = express.Router();

// Importamos el controlador de autenticación
const controlador = require("../controllers/authController");

/**
 * Definición de rutas de autenticación
 * 
 * GET  /login    - Muestra el formulario de inicio de sesión
 * GET  /registro - Muestra el formulario de registro
 * POST /registro - Procesa el registro de un nuevo usuario
 * POST /login    - Procesa el inicio de sesión
 * GET  /logout   - Cierra la sesión del usuario
 */

// Rutas GET para mostrar formularios
rutas.get('/login', controlador.mostrarLogin);      // Muestra página de login
rutas.get('/registro', controlador.mostrarRegistro); // Muestra página de registro

// Rutas POST para procesar formularios
rutas.post('/registro', controlador.registrar);      // Procesa el registro
rutas.post('/login', controlador.login);             // Procesa el login

// Ruta para cerrar sesión
rutas.get('/logout', controlador.logout);            // Cierra la sesión

// Exportamos el router para usarlo en app.js
module.exports = rutas;