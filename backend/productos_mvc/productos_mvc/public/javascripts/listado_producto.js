window.addEventListener("load", () => {

    document.getElementsByName("btnModificar").forEach((boton)=> {

        boton.addEventListener("click", ()=> { 

            let obj= boton.getAttribute("data-obj");
            let obj_dato = JSON.parse(obj);

            window.location.href = URL_API + "productos/" + obj_dato.codigo;

        });
    });

    document.getElementsByName("btnEliminar").forEach((boton)=>{

        boton.addEventListener("click", ()=>{ 

            let codigo = boton.getAttribute("data-codigo");

            if(confirm(`¿Seguro de eliminar producto con código ${codigo}?`)){
                
                eliminarProductoFoto(codigo);
            }                
        });
    });

    document.getElementById("btnAgregarNuevo").addEventListener("click", 
    () => { window.location.href = URL_API + "productos/nuevo" } );

});

async function eliminarProductoFoto(codigo) {

    let data = `{"codigo": ${codigo}}`;

    const opciones = {
        method: "DELETE",
        body: data,
        headers: {"Accept": "*/*", "Content-Type": "application/json"},
    };

    try {

        let res = await manejadorFetch(URL_API + "productos", opciones);
    
        let resCadena = await res.text(); 

        success();

    } catch (err) {
    
        fail(err);
    }
}

