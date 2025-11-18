/**
 * Controlador de Autenticación (authController.js)
 * Maneja todas las operaciones relacionadas con la autenticación de usuarios:
 * login, registro, y cierre de sesión
 */

// Importamos el modelo de Usuario
const Usuario = require("../models/usuarioModel");

// Importamos bcrypt para el hash de contraseñas
const bcrypt = require("bcrypt");

// Scripts del cliente que se cargarán en las vistas
const scripts = [{src:"../javascripts/varios.js"}];

/**
 * Muestra la página de inicio de sesión
 * @param {Object} request - Objeto de solicitud HTTP
 * @param {Object} response - Objeto de respuesta HTTP
 */
exports.mostrarLogin = async (request, response) => {
    const titulo = "LOGIN";
    // Renderiza la vista de login sin errores inicialmente
    response.render("login", {scripts:scripts, titulo:titulo, error:null});
};

/**
 * Muestra la página de registro
 * @param {Object} request - Objeto de solicitud HTTP
 * @param {Object} response - Objeto de respuesta HTTP
 */
exports.mostrarRegistro = async (request, response) => {
    const titulo = "REGISTRO";
    // Renderiza la vista de registro sin errores inicialmente
    response.render("registro", {scripts:scripts, titulo:titulo, error:null});
};

/**
 * Procesa el registro de un nuevo usuario
 * @param {Object} request - Objeto de solicitud HTTP con los datos del usuario
 * @param {Object} response - Objeto de respuesta HTTP
 */
exports.registrar = async (request, response) => {
    try {
        // Extraemos los datos del formulario
        const {legajo, clave, apellido, nombre } = request.body;

        // Verificamos si el legajo ya existe
        const existe = await Usuario.findOne({ where: { legajo } });

        if (existe) {
            return response.render("registro", {
                scripts:scripts, 
                titulo:"REGISTRO", 
                error:"El legajo está repetido."
            });
        }

        // Encriptamos la contraseña antes de guardarla
        const hash = await bcrypt.hash(clave, 10);

        // Creamos el nuevo usuario en la base de datos
        await Usuario.create({ legajo, apellido, nombre, clave: hash });

        // Redirigimos al login después del registro exitoso
        return response.redirect("login");

    } catch (error) {
        console.log(error);
        response.status(500).render("registro", {
            scripts:scripts, 
            titulo:"REGISTRO", 
            error:"El servidor se rompió"
        });
    }
};

/**
 * Procesa el inicio de sesión de un usuario
 * @param {Object} request - Objeto de solicitud HTTP con credenciales
 * @param {Object} response - Objeto de respuesta HTTP
 */
exports.login = async (request, response) => {
    try {
        // Extraemos las credenciales del formulario
        const { legajo, clave } = request.body;

        // Buscamos el usuario por legajo
        const usuario = await Usuario.findOne({ where: { legajo } });

        // Verificamos las credenciales
        if (!usuario || !(await bcrypt.compare(clave, usuario.clave))) {
            return response.render("login", {
                scripts:scripts, 
                titulo:"LOGIN", 
                error:"Las credenciales son inválidas."
            });
        }

        // Guardamos los datos del usuario en la sesión
        request.session.usario = {
            id: usuario.id,
            apellido: usuario.apellido,
            nombre: usuario.nombre,
            legajo: usuario.legajo
        };

        // Redirigimos a la página de productos tras el login exitoso
        return response.redirect("/productos");

    } catch (error) {
        console.log(error);
        response.status(500).render("login", {
            scripts:scripts, 
            titulo:"LOGIN", 
            error:"El servidor se rompió"
        });
    }
};

/**
 * Cierra la sesión del usuario
 * @param {Object} request - Objeto de solicitud HTTP
 * @param {Object} response - Objeto de respuesta HTTP
 */
exports.logout = async (request, response) => {
    // Destruimos la sesión y redirigimos al login
    request.session.destroy(() => response.redirect("/login"));
};