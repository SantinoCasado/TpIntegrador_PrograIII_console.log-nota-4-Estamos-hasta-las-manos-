/**
 * Controlador Principal (controlador.js)
 * Maneja todas las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para productos
 */

// Importamos el modelo de productos
const productoModel = require("../models/modelo"); 

/**
 * Obtiene y muestra todos los productos
 * @param {Object} request - Objeto de solicitud HTTP
 * @param {Object} response - Objeto de respuesta HTTP
 */
const getController = async (request, response) => {
    // Obtiene todos los productos de la base de datos
    const productos = await productoModel.obtenerTodos();

    // Scripts necesarios para la vista
    const scripts = [
        {src:"../javascripts/varios.js"}, 
        {src:"../javascripts/listado_producto.js"}
    ];
    const titulo = "Listado de productos";

    // Renderiza la vista con los productos
    response.render("listadoProductos", {
        scripts:scripts, 
        titulo:titulo, 
        prod_obj_array:productos
    });
};

/**
 * Muestra el formulario para crear un nuevo producto
 * @param {Object} request - Objeto de solicitud HTTP
 * @param {Object} response - Objeto de respuesta HTTP
 */
const getNuevoController = async (request, response) => {
    // Scripts necesarios para el formulario de alta
    const scripts = [
        {src:"../javascripts/varios.js"}, 
        {src:"../javascripts/alta_producto.js"}
    ];
    const titulo = "Alta de productos";

    // Renderiza el formulario vacío
    response.render("formularioProducto", {
        scripts:scripts, 
        titulo:titulo, 
        un_producto:null
    });
};

/**
 * Muestra el formulario para editar un producto existente
 * @param {Object} request - Objeto de solicitud HTTP
 * @param {Object} response - Objeto de respuesta HTTP
 */
const getEditarController = async (request, response) => {
    // Obtiene el producto específico por su código
    const un_producto = await productoModel.obtenerUno(request.params.codigo);

    // Scripts necesarios para el formulario de edición
    const scripts = [
        {src:"../javascripts/varios.js"}, 
        {src:"../javascripts/modificar_producto.js"}
    ];
    const titulo = "Modificación de productos";

    // Renderiza el formulario con los datos del producto
    response.render("formularioProducto", {
        scripts:scripts, 
        titulo:titulo, 
        un_producto:un_producto
    });
};

/**
 * Procesa la creación de un nuevo producto
 * @param {Object} request - Objeto de solicitud HTTP con datos del producto
 * @param {Object} response - Objeto de respuesta HTTP
 */
const postController = async (request, response) => {
    let estado = 200;
    const obj_resp = {"exito":false, "mensaje":"No se pudo agregar."};

    try {
        // Obtiene el archivo (imagen) y los datos del producto
        const file = request.file;
        const obj = JSON.parse(request.body.obj_producto);
        
        // Intenta agregar el producto con su imagen
        if(await productoModel.agregar(obj, file)) {
            estado = 201;
            obj_resp.exito = true;
            obj_resp.mensaje = "Producto con foto agregado."
        }
    } catch (err) {
        estado = 500;
        obj_resp.mensaje += err.message;
    }
    finally {
        response.status(estado).json(obj_resp);
    }
}

/**
 * Procesa la actualización de un producto existente
 * @param {Object} request - Objeto de solicitud HTTP con datos actualizados
 * @param {Object} response - Objeto de respuesta HTTP
 */
const putController = async (request, response) => {
    let estado = 200;
    const obj_resp = {"exito":false, "mensaje":"No se pudo modificar."};

    try {
        // Obtiene el archivo (imagen) y los datos actualizados
        const file = request.file;
        const obj = JSON.parse(request.body.obj_producto);

        // Intenta modificar el producto
        if(await productoModel.modificar(obj, file)) {
            estado = 201;
            obj_resp.exito = true;
            obj_resp.mensaje = "Producto con foto modificado."
        }
    } catch (err) {
        estado = 500;
        obj_resp.mensaje += err.message;
    }
    finally {
        response.status(estado).json(obj_resp);
    }
};

/**
 * Procesa la eliminación de un producto
 * @param {Object} request - Objeto de solicitud HTTP con ID del producto
 * @param {Object} response - Objeto de respuesta HTTP
 */
const deleteController = async (request, response) => {
    let estado = 200;
    const obj_resp = {"exito":false, "mensaje":"No se pudo eliminar."};

    try {
        // Obtiene los datos del producto a eliminar
        const obj = { ...request.body };
        
        // Intenta eliminar el producto
        if(await productoModel.eliminar(obj)) {
            estado = 201;
            obj_resp.exito = true;
            obj_resp.mensaje = "Producto con foto eliminado."
        }
    } catch (err) {
        estado = 500;
        obj_resp.mensaje += err.message;
    }
    finally {
        response.status(estado).json(obj_resp);
    }
}

// Exportamos todas las funciones del controlador
module.exports = {
    getController,
    postController, 
    putController, 
    deleteController, 
    getNuevoController, 
    getEditarController
};