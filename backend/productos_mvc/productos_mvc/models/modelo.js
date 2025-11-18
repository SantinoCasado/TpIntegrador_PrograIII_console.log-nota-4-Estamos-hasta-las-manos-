const fs = require('fs');

const mime = require('mime-types');

const db = require("./db");

const ProductoModel = require("./productoModel");

class Producto {

    static async obtenerTodos() { 

        // let retorno = {};

        // [retorno] = await db.query("SELECT * FROM `productos`");

        // return retorno;

        return await ProductoModel.findAll();
    }

    static async agregar(obj_producto, file) {

        let rta = true;

        try {

            let extension = mime.extension(file.mimetype);
            let path = file.destination + obj_producto.codigo + "." + extension;

            obj_producto.path = path.split("public/")[1];

            fs.renameSync(file.path, path);

            // await db.query("INSERT INTO `productos`(`codigo`, `marca`, `precio`, `path`) VALUES (?, ?, ?, ?)",
            //                     [obj_producto.codigo, obj_producto.marca, obj_producto.precio, obj_producto.path]);

            await ProductoModel.create(obj_producto);

        }
        catch(err){
            rta = false;
        }

        return rta;
    }
   
    static async modificar(obj_producto, file) {

        let rta = true;

        try {

            let extension = mime.extension(file.mimetype);
            let path = file.destination + obj_producto.codigo + "." + extension;

            obj_producto.path = path.split("public/")[1];

            fs.renameSync(file.path, path);

            // await db.query("UPDATE `productos` SET `marca`= ? ,`precio`= ? ,`path`= ? WHERE `codigo`= ?", 
            //                     [obj_producto.marca, obj_producto.precio, obj_producto.path, obj_producto.codigo]);

            const codigo = obj_producto.codigo;

            await ProductoModel.update(obj_producto, { where : {codigo} });
        }
        catch(err){
            rta = false;
        }

        return rta;
    }

    static async eliminar(obj_producto) {

        let rta = true;

        try {

            const obj_delete = await Producto.obtenerUno(obj_producto.codigo);

            let path_foto = "public/" + obj_delete.path;
            
            fs.unlink(path_foto, (err) => {
                if (err) throw err;
            });
            
            // await db.query("DELETE FROM `productos` WHERE codigo = ?", [obj_producto.codigo]);

            const codigo = obj_producto.codigo;

            await ProductoModel.destroy( { where : {codigo} } );        

        }
        catch(err){
            rta = false;
        }

        return rta;
    }
    
    static async obtenerUno(codigo) { 

        // let retorno = {};

        // [retorno] = await db.query("SELECT * FROM `productos` WHERE codigo = ?", [codigo]);

        // return retorno[0];

        return await ProductoModel.findByPk(codigo);
    }

}

module.exports = Producto;