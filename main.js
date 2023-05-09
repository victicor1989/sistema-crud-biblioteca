let productos = [] // creando el arreglo ( de objetos )
//variable para el indice del producto encontrado
let indexProdSearch;
//referencia a buscar
let referenciaBuscar;
let turnListado = true;
// Referenciar cada uno de los elementos que tienen id en el archivo productos.html
let message = document.getElementById('mensaje');
let reference = document.querySelector("#referencia");
let description = document.getElementById('descripcion');
let genero = document.getElementById('genero');
let estado = document.getElementById("estado");
let btnadd = document.getElementById('btnagregar');
let btnsearch = document.getElementById('btnbuscar');
let btnupdate = document.getElementById("btnactualizar");
let btndelete = document.getElementById("btneliminar");
let btnlist = document.getElementById("btnlistar");
let btnclean = document.querySelector("#btnlimpiar");
let listado = document.getElementById('listado');
//Deshabilitar los botones de actualizar y eliminar
function alternarBotActElim(toggle) {
    if (toggle) {//llega verdadero
        btnupdate.disabled = false;
        btndelete.disabled = false;
    }
    else {//llega falso a la variable por lo cual se habilitan los botones
        btnupdate.disabled = true;
        btndelete.disabled = true;
    }
}

function limpiarDatos() {
    reference.value = "";
    description.value = "";
    genero.value = '';
    estado.value = '';
    // posicionar el punto de insercion en reference
    reference.focus();
}

alternarBotActElim(false);


// Eventos de los botones
btnadd.addEventListener("click", () => {
    // Verificar que todos los datos esten diligenciados
    message.classList.remove("alert-danger");
    message.classList.remove("d-none");
    if (reference.value != "" && description.value != "") {
        // Verificar que la referencia no exista (buscar)
        let searchProd = productos.find(prod => prod.referencia == reference.value);
        if (searchProd == undefined) { // No encuentra la referencia
            // Agregar la clase alert-success al id message
            message.classList.add("alert-success");
            // Agregar el producto, como objeto, al arreglo productos
            productos.push({ referencia: reference.value, descripcion: description.value, genero: genero.value, estado: estado.value })
            message.textContent = "El libro se ha agregado correctamente  ...";
            console.log(productos)
            // Retardo de 3 segundos y que se desaparezca el id message
            setTimeout(() => {
                message.classList.remove("alert-success");
                message.classList.add("d-none");
            }, 2000)
        }
        else { // Encontró la referencia
            message.classList.remove("d-none");
            message.classList.add("alert-danger");
            message.textContent = "La referencia ya Existe... Inténtelo con otra ...";
        }
    }
    else {
        message.classList.remove("d-none");
        message.classList.add("alert-danger");
        message.textContent = "Debe diligenciar todos los datos ...";
    }
})
// Evento del botón buscar
btnsearch.addEventListener('click', () => {
    if (reference.value != "") {
        let searchProd = productos.find(prod => prod.referencia == reference.value);
        if (searchProd != undefined) { // Lo encuentra
            // Recuperar los datos y mostrarlos en el formulario, en cada input que tiene sus referencias respectivas
            description.value = searchProd.descripcion;
            estado.value = searchProd.estado;
            //Habilitar los botones de actualizar y eliminar
            alternarBotActElim(true);
            indexProdSearch = productos.findIndex(prod => prod.referencia == reference.value);
            //cambiar el contenido de la variable referenciaBuscar
            referenciaBuscar = reference.value;
        }
        else {
            message.classList.remove("d-none");
            message.classList.add("alert-danger");
            message.textContent = "Referencia NO existe. Inténtelo con otra ...";
        }
    }
    else {
        message.classList.remove("d-none");
        message.classList.add("alert-danger");
        message.textContent = "Debe ingresar la referencia a buscar ...";

    }
})

btnupdate.addEventListener('click', () => {
    //preguntar si la referencia a buscar es igual a la referencia a modificar
    if (referenciaBuscar == reference.value) {
        //actualizar el producto con todos su datos
        productos.splice(indexProdSearch, 1, { referencia: reference.value, descripcion: description.value, genero: genero.value, estado: estado.value })
        message.classList.remove("alert-danger");
        message.classList.remove("d-none");
        message.classList.add("alert-success");
        message.textContent = "Producto actualizado correctamente";
        setTimeout(() => {
            message.classList.add("d-none");
        }, 2000)
    }
    else {
        //buscar referencia nueva o a actualizadar
        let refProd = productos.find(prod => prod.referencia == reference.value);
        if (refProd != undefined) {
            message.classList.remove("d-none");
            message.classList.add("alert-danger");
            message.textContent = "Referencia asignada a otro producto. Inténtelo con otra ...";
        }
        else {
            //actualizaar el producto con todos sus datos
            productos.splice(indexProdSearch, 1, { referencia: reference.value, descripcion: description.value, genero: genero.value, estado: estado.value })
            message.classList.remove("alert-danger")
            message.classList.remove("d-none");
            message.classList.add("alert-success");
            message.textContent = "Producto actualizado correctamente";
            setTimeout(() => {
                message.classList.add("d-none");
            }, 2000)
        }
    }

})

btndelete.addEventListener('click', () => {
    //Buscar la referencia
    let findProd = productos.find(prod => prod.referencia == reference.value);
    if (findProd != undefined) {
        //Confirmacion del borrado del producto en pantalla
        if (confirm(`Está seguro de eliminar el libro: ${description.value}`)) {
            //Reasignar el arreglo con los productos diferentes al que se desea borrar
            productos = productos.filter(prod => prod.referencia != reference.value);
            console.log(productos);
            limpiarDatos()
        }
    }
})

btnclean.addEventListener('click', () => {
    limpiarDatos();
})

btnlist.addEventListener('click', () => {
    if (turnListado) {
        //Definir una variable que contendra el codigo de generacion de la tabla con sus respectivos productos
        let tablaProductos = `<table class='table table-hover'> 
                            <thead>
                                <th>id</th>
                                <th>Nombre</th>
                                <th>Genero</th>
                                <th>Estado</th>
                            </thead>
                            <tbody>`
        //recorrer el arreglo de objetos para que cada obejto sea una fila (tr)
        productos.map(prod => {
            tablaProductos += `<tr>
                                <td>${prod.referencia}</td>
                                <td>${prod.descripcion}</td>
                                <td>${prod.genero}</td>
                                <td>${prod.estado}</td>
                           <tr>`
        })
        tablaProductos += `</tbody></table>`
        listado.innerHTML = tablaProductos
        turnListado = false
    } else {
        listado.innerHTML = ''
        turnListado = true
    }
})