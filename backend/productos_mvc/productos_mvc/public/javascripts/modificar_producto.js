window.addEventListener("load", () => {

    document.querySelector("#btnForm").addEventListener("click", modificarProductoFoto);

});

async function modificarProductoFoto() {

    let codigo = parseInt(document.getElementById("codigo").value);
    let marca = document.getElementById("marca").value;
    let precio = parseFloat(document.getElementById("precio").value);
    let foto = document.getElementById("foto");

    let data = {
        "codigo" : codigo,
        "marca" : marca,
        "precio" : precio
    };

    let form = new FormData();
    form.append('foto', foto.files[0]);
    form.append('obj_producto', JSON.stringify(data));

    const opciones = {
        method: "PUT",
        body: form,
    };

    try {

        let res = await manejadorFetch(URL_API + "productos", opciones);
    
        let resCadena = await res.text(); 

        success();

    } catch (err) {
    
        fail(err);
    }
}
