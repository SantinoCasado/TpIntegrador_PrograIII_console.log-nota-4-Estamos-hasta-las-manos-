/**
 * Rutas de Productos (rutas.js)
 * Define todas las rutas relacionadas con la gestión de productos
 * Incluye protección de rutas y manejo de subida de archivos
 */

// Importamos Express para crear el router
const express = require('express');
const rutas = express.Router();

// Importamos los controladores necesarios
const {
    getController,      // Listar productos
    postController,     // Crear producto
    putController,      // Actualizar producto
    deleteController,   // Eliminar producto
    getNuevoController, // Formulario nuevo producto
    getEditarController // Formulario editar producto
} = require("../controllers/controlador");

// Importamos multer para manejar la subida de archivos (imágenes)
const multer = require('multer');

/**
 * Configuración de almacenamiento para multer
 * Define dónde se guardarán las imágenes subidas
 */
const storage = multer.diskStorage({
    destination: "public/fotos/", // Carpeta donde se guardan las fotos
});

// Creamos el middleware de multer con la configuración
const upload = multer({
    storage: storage
});

// Importamos el middleware de autenticación
const protegerRuta = require("../middlewares/verificar");

/**
 * Definición de rutas para productos
 * Todas las rutas están protegidas y requieren autenticación
 */

// GET / - Lista todos los productos
rutas.get('/', protegerRuta, getController);

// GET /nuevo - Muestra el formulario para crear nuevo producto
rutas.get('/nuevo', protegerRuta, getNuevoController);

// GET /:codigo - Muestra el formulario para editar un producto
rutas.get('/:codigo', protegerRuta, getEditarController);

// POST / - Crea un nuevo producto (incluye subida de imagen)
rutas.post("/", protegerRuta, upload.single("foto"), postController);

// PUT / - Actualiza un producto existente (incluye subida de imagen)
rutas.put("/", protegerRuta, upload.single("foto"), putController);

// DELETE / - Elimina un producto
rutas.delete("/", protegerRuta, deleteController);

// Exportamos el router para usarlo en app.js
module.exports = rutas;