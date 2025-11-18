/**
 * Archivo principal de la aplicación (app.js)
 * Este archivo configura y establece la aplicación Express con todos sus middlewares y rutas
 */

// Importación de módulos necesarios
// http-errors: Para crear errores HTTP personalizados
var createError = require('http-errors');
// express: El framework web que usamos
var express = require('express');
// path: Módulo de Node.js para manejar rutas de archivos
var path = require('path');
// cookie-parser: Middleware para manejar cookies
var cookieParser = require('cookie-parser');
// morgan: Middleware para logging (registro) de solicitudes HTTP
var logger = require('morgan');

// Importación de rutas
// Cada archivo de rutas maneja diferentes endpoints de la aplicación
var indexRouter = require('./routes/index');      // Rutas principales
var usersRouter = require('./routes/users');      // Rutas de usuarios
var productosRouter = require('./routes/rutas');  // Rutas de productos
var usuariosRouter = require('./routes/auth');    // Rutas de autenticación

// Creación de la aplicación Express
var app = express();

// Configuración del motor de vistas
// Establecemos EJS como nuestro motor de plantillas
app.set('views', path.join(__dirname, 'views'));  // Directorio donde están las vistas
app.set('view engine', 'ejs');                    // Usamos EJS como motor de plantillas

// Configuración de middlewares
app.use(logger('dev'));                          // Logging de solicitudes HTTP
app.use(express.json());                         // Parseo de body en formato JSON
app.use(express.urlencoded({ extended: false })); // Parseo de datos de formularios
app.use(cookieParser());                         // Parseo de cookies
// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de sesiones
const session = require("express-session");
// Middleware de sesión para manejar estados entre peticiones
app.use(session({
  secret: "miClaveSecreta123",    // Clave secreta para firmar la cookie de sesión
  resave: false,                  // No guardar la sesión si no hay cambios
  saveUninitialized: false        // No crear sesión hasta que se almacene algo
}));

// Registro de rutas
// Cada ruta se asocia con su respectivo router
app.use('/', indexRouter);           // Rutas principales
app.use('/users', usersRouter);      // Rutas que comienzan con /users
app.use('/productos', productosRouter); // Rutas que comienzan con /productos
app.use('/', usuariosRouter);        // Rutas de autenticación

// Manejador para rutas no encontradas (404)
app.use(function(req, res, next) {
  next(createError(404)); // Crear y pasar error 404
});

// Manejador de errores global
app.use(function(err, req, res, next) {
  // Establecer variables locales para la vista de error
  res.locals.message = err.message;
  // Solo mostrar detalles del error en desarrollo
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderizar la página de error
  res.status(err.status || 500);  // Establecer código de estado HTTP
  res.render('error');            // Mostrar vista de error
});

// Exportar la aplicación para ser usada en otros archivos
module.exports = app;
