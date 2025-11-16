/**
 * Middleware de Verificación de Autenticación (auth.js)
 * Este middleware verifica si el usuario está autenticado antes de permitir el acceso a rutas protegidas
 * Sigue el patrón del profesor
 */

/**
 * Middleware de autenticación
 * @param {Object} request - Objeto de solicitud HTTP
 * @param {Object} response - Objeto de respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware
 */
module.exports = (request, response, next) => {
    // Verifica si existe una sesión de usuario
    if (!request.session.usario) {
        // Si no hay sesión, redirige al login
        return response.redirect("/admin/login");
    }

    // Si hay sesión, hace disponible los datos del usuario en las vistas
    response.locals.usuario = request.session.usario;

    // Continúa con la siguiente función en la cadena de middleware
    next();
};