window.addEventListener("load", () => {
    mostrarListadoFotos();
});

async function mostrarListadoFotos() {

    try {

        const opciones = {
            method: "GET",
        };

        let res = await manejadorFetch(URL_API + "productos_fotos", opciones);

        let resJSON = await res.json();

        mostrarListadoProductosFotos(resJSON);

    } catch (err) {

        fail(err);
    }          
}

function mostrarListadoProductosFotos(prod_obj_array) {

    console.log("Mostrar: ", prod_obj_array);

    let div = document.getElementById("divListado");

    let tabla = `<table class="table table-hover">
                    <tr>
                        <th>CÓDIGO</th><th>MARCA</th><th>PRECIO</th><th>FOTO</th><th>ACCIONES</th>
                    </tr>`;
                if(prod_obj_array.length < 1){
                    tabla += `<tr><td>---</td><td>---</td><td>---</td><td>---</td>
                        <td>---</td></tr>`;
                }
                else {

                    for (let index = 0; index < prod_obj_array.length; index++) {
                        const dato = prod_obj_array[index];
                        if(dato == null){
                            continue;
                        }
                        tabla += `<tr><td>${dato.codigo}</td><td>${dato.marca}</td><td>${dato.precio}</td>
                                    <td><img src="${URL_API}${dato.path}" width="80px" hight="80px"></td>
                                    <td><button type="button" class="btn btn-info" id="" 
                                            data-obj='${JSON.stringify(dato)}' name="btnModificar">
                                            <span class="bi bi-pencil"></span>
                                        </button>
                                        <button type="button" class="btn btn-danger" id="" 
                                            data-codigo='${dato.codigo}' name="btnEliminar">
                                            <span class="bi bi-x-circle"></span>
                                        </button>
                                    </td></tr>`;
                    }  
                }
    tabla += `</table>`;

    div.innerHTML = tabla;

    document.getElementsByName("btnModificar").forEach((boton)=> {

        boton.addEventListener("click", ()=> { 

            let obj= boton.getAttribute("data-obj");
            let obj_dato = JSON.parse(obj);

            document.getElementById("codigo").value = obj_dato.codigo;
            document.getElementById("marca").value = obj_dato.marca;
            document.getElementById("precio").value = obj_dato.precio;   
            document.getElementById("img_foto").src = URL_API + obj_dato.path;
            document.getElementById("div_foto").style.display = "block";

            document.getElementById("codigo").readOnly = true;

            let btn = document.getElementById("btnForm");
            btn.value = "Modificar";

            btn.onclick = ()=> modificarProductoFoto();
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

}

async function agregarProductoFoto() {
        
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
        method: "POST",
        body: form,
    };

    try {

        let res = await manejadorFetch(URL_API + "productos_fotos", opciones);
    
        let resCadena = await res.text(); 
        
        console.log("Agregar: ", resCadena);
        
        success();

    } catch (err) {
    
        fail(err);
    }
}

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

        let res = await manejadorFetch(URL_API + "productos_fotos", opciones);
    
        let resCadena = await res.text(); 
        
        console.log("Modificar: ", resCadena);

        let btn = document.getElementById("btnForm");
        btn.value = "Agregar";

        btn.onclick = ()=> agregarProductoFoto();

        success();

    } catch (err) {
    
        fail(err);
    }
}

async function eliminarProductoFoto(codigo) {

    let data = `{"codigo": ${codigo}}`;

    const opciones = {
        method: "DELETE",
        body: data,
        headers: {"Accept": "*/*", "Content-Type": "application/json"},
    };

    try {

        let res = await manejadorFetch(URL_API + "productos_fotos", opciones);
    
        let resCadena = await res.text(); 
        
        console.log("Eliminar: ", resCadena);

        success();

    } catch (err) {
    
        fail(err);
    }
}


function fail(retorno) {
    console.error(retorno);
    alert("Ha ocurrido un ERROR!!!");
}

function success() {
    mostrarListadoFotos();
    limpiarForm();
}

function limpiarForm() {
    document.getElementById("img_foto").src = "";
    document.getElementById("div_foto").style.display = "none";
    document.getElementById("codigo").readOnly = false;
    document.getElementById("codigo").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("foto").value = "";
}