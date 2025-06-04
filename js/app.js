// importa una clase desde una direccion de archivo
import Contacto from "./classContacto.js";


// el usuario cliquea el boton agregar invocar a una funcion que muestre el modal
function abrirModalContacto() {
    limpiarFormulario()
    //abrir ventana modal, desde js, no con data-bs-target y data-bs-toggle
    modalCrearContacto.show();
    creandoContacto = true;
}

function crearContacto() {
    //1- traer todos los datos del formulario VALIDADOS
    if (validaciones()) {

        //2- crear objeto contacto
        const nuevoContacto = new Contacto(inputNombre.value, inputApellido.value, inputTelefono.value, inputEmail.value, inputImagen.value, inputNotas.value)
        console.log(nuevoContacto)

        //3- almacenar el objeto en la agenda
        agenda.push(nuevoContacto)
        console.log(agenda)

        //4-guardar en local storage
        guardarEnLocalStorage()

        //5- limpiar formulario
        limpiarFormulario()

        //6- dibujar fila en la tabla
        dibujarFila(nuevoContacto, agenda.length)

        //mostrar el mensaje al usuario que se agregó contacto correctamente
        Swal.fire({
            title: "Contacto Creado!",
            text: `El contacto ${nuevoContacto.nombre} ${nuevoContacto.apellido} fue creado correctamente!`,
            icon: "success"
        });
    }
}

function limpiarFormulario() {
    formularioCrearContacto.reset();
    const inputs = formularioCrearContacto.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
    });
}

function guardarEnLocalStorage() {
    // invaco al objeto de js. setItem, puede guarda o actualiza el mismo ID
    localStorage.setItem('agendaKey', JSON.stringify(agenda))
}

function cargaDatosContacto() {
    //LEER DATOS
    //1- verificar en localstorage xa mostrar en la tabla
    if (agenda.length !== 0) {
        //2- dibujar cada fila con sus datos
        agenda.map(((contacto, index) => dibujarFila(contacto, index + 1)))
    } else {
        //mostrar un mensaje que no hay datos para mostrar
    }
}

function dibujarFila(contacto, index) {
    // dibuja una sola fila de la tabla con los datos
    tablaContacto.innerHTML += `
                    <tr>
                        <th scope="row">${index}</th>
                        <td>${contacto.nombre}</td>
                        <td>${contacto.apellido}</td>
                        <td>${contacto.telefono}</td>
                        <td>${contacto.email}</td>
                        <td class="d-flex flex-nowrap gap-1">
                            <button class="btn btn-warning" onclick="prepararContacto('${contacto.id}')">
                                <i class="bi bi-pen"></i>
                            </button>
                            <button class="btn btn-danger" onclick="eliminarContacto('${contacto.id}')">
                                <i class="bi bi-trash"></i>
                            </button>
                            <button class="btn btn-info" onclick="verContacto('${contacto.id}')"><i class="bi bi-eye"></i></button>
                        </td>
                    </tr>`
}

// type "module" del index.hmtl, no permite usar funciones de js en html, por eso usamos window. para onclick()
// WINDOW representa a la ventana del navegador
window.eliminarContacto = (id) => {
    //1- obtener ID de contacto a borrar
    Swal.fire({
        title: "Estas por eliminar un contacto",
        text: "No se podrá revertir este paso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#6cc3d5",
        cancelButtonColor: "#ff7851",
        confirmButtonText: "Borrar",
        cancelButtonText: "Salir",
    }).then((result) => {
        console.log(result)
        if (result.isConfirmed) {
            //2- buscar en la agenda el contacto con ID
            const posicionContacto = agenda.findIndex((contacto) => contacto.id === id)
            console.log(posicionContacto)
            //3- borrar de la agenda
            agenda.splice(posicionContacto, 1)

            //4- actualizar los datos del local storage
            guardarEnLocalStorage()

            //5- actualizar la tabla de contactos. ingreso al tr del tbody para borrarlo de la tabla
            tablaContacto.removeChild(tablaContacto.children[posicionContacto])

            //6- corrige el numero de filas de la tabla
            reasignarIndices();

            //7- cartel de contacto eliminado
            Swal.fire({
                title: "Contacto Borrado!",
                text: "Su contacto ha sido borrado exitosamente.",
                icon: "success"
            });
        }
    });
}

window.prepararContacto = (id) => {
    // buscar la informacion del usuario en el array para agregar al modal
    const contactoBuscado = agenda.find((contacto) => contacto.id === id)

    // modificar titulo de la ventana modal
    const tituloModal = document.querySelector('.modal-title')
    tituloModal.textContent = 'Modificar Contacto'
    // abre formulario 
    abrirModalContacto()
    // cargar datos en el formulario
    inputNombre.value = contactoBuscado.nombre;
    inputApellido.value = contactoBuscado.apellido;
    inputEmail.value = contactoBuscado.email;
    inputTelefono.value = contactoBuscado.telefono;
    inputImagen.value = contactoBuscado.imagen;
    inputNotas.value = contactoBuscado.notas;
    // cambiamos la variable para editar
    creandoContacto = false;
    //guardar el ID del contacto a modificar ( se usara en eliminar)
    idContacto = id
}

window.verContacto = (id) => {
    console.log(id)
    console.log(window.location)
    // propiedad que me lleva a otra pagina
    window.location.href = `./pages/detalleContacto.html?id=${id}`


}


// cuando se elimina un elemento, hay que volver a ordenar los numeros de fila
function reasignarIndices() {
    const filas = tablaContacto.querySelectorAll("tr");
    filas.forEach((fila, index) => {
        fila.querySelector("th").textContent = index + 1;
    });
}


function editarContacto() {
    // verificar que los datos son validos

    if (validaciones()){
    // tomar los datos de los inputs y se guarda en el array

    // buscar el id que estoy editando para actrualizar sus propiedades
    const posicionContactoActualizar = agenda.findIndex((contacto) => contacto.id === idContacto)

    // actualizo el array
    agenda[posicionContactoActualizar].nombre = inputNombre.value;
    agenda[posicionContactoActualizar].apellido = inputApellido.value;
    agenda[posicionContactoActualizar].telefono = inputTelefono.value;
    agenda[posicionContactoActualizar].email = inputEmail.value;
    agenda[posicionContactoActualizar].notas = inputNotas.value;
    agenda[posicionContactoActualizar].imagen = inputImagen.value;

    guardarEnLocalStorage();
    // blanquear formulario
    limpiarFormulario()


    Swal.fire({
        title: "Contacto Modificado!",
        text: `El contacto ${agenda[posicionContactoActualizar].nombre} fue modificado correctamente!`,
        icon: "success"
    });

    // ACTUALIZAR TABLA: traer la fila de la tabla que coincide con posicionContactoActualizar y volver a dibujar la fila de la tabla que sale por pantalla
    const fila = tablaContacto.children[posicionContactoActualizar];

    fila.innerHTML = `
    <th scope="row">${posicionContactoActualizar + 1}</th>
    <td>${agenda[posicionContactoActualizar].nombre}</td>
    <td>${agenda[posicionContactoActualizar].apellido}</td>
    <td>${agenda[posicionContactoActualizar].telefono}</td>
    <td>${agenda[posicionContactoActualizar].email}</td>
    <td class="d-flex flex-nowrap gap-1">
        <button class="btn btn-warning" onclick="prepararContacto('${agenda[posicionContactoActualizar].id}')">
            <i class="bi bi-pen"></i>
        </button>
        <button class="btn btn-danger" onclick="eliminarContacto('${agenda[posicionContactoActualizar].id}')">
            <i class="bi bi-trash"></i>
        </button>
        <button class="btn btn-info" onclick="verContacto('${agenda[posicionContactoActualizar].id}')"><i class="bi bi-eye"></i></button>
    </td>`;

    
    // cerrar modal
    modalCrearContacto.hide()
    }
}


//funciones de VALIDACION
function validarCantidadCaracteres(input, min, max) {
    if (input.value.trim().length >= min && input.value.trim().length <= max) {
        input.classList.add('is-valid')
        input.classList.remove('is-invalid')
        return true;
    } else {
        input.classList.add('is-invalid')
        input.classList.remove('is-valid')
        return false;
    }
}

function validarEmail() {

    const regExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    if (regExp.test(inputEmail.value)) {
        inputEmail.classList.add("is-valid");
        inputEmail.classList.remove("is-invalid");
        return true;
    } else {
        inputEmail.classList.add("is-invalid");
        inputEmail.classList.remove("is-valid");
        return false;
    }
}
// validar URL de imagen

// validar telefono

function validaciones() {
    let datosValidos = true; // se cumplieron las validaciones

    if (!validarCantidadCaracteres(inputNombre, 2, 50)) {
        datosValidos = false;
    }
    if (!validarCantidadCaracteres(inputApellido, 2, 50)) {
        datosValidos = false;
    }
    if (!validarCantidadCaracteres(inputNotas, 0, 250)) {
        datosValidos = false;
    }

    if (!validarEmail()) {
        datosValidos = false;
    }

    return datosValidos
}


//================= EVENTOS DEL DOM =============================================
//el usuario completa el form y debo crear un objeto contacto
//declaro variables
const btnAgregarContacto = document.getElementById('btnAgregarContacto');
//form de la ventana modal xa cargar datos
const formularioCrearContacto = document.querySelector('form');

const modalCrearContacto = new bootstrap.Modal(document.getElementById('crearContacto'));

// trae del localstorage los datos como array de objetos, si esta vacio el local, define como vacio
const agenda = JSON.parse(localStorage.getItem('agendaKey')) || [];
console.log(agenda)

// valores el input xa crear contacto
const inputNombre = document.querySelector('#nombre')
const inputApellido = document.querySelector('#apellido')
const inputEmail = document.querySelector('#email')
const inputTelefono = document.querySelector('#telefono')
const inputImagen = document.querySelector('#imagen')
const inputNotas = document.querySelector('#notas')

const tablaContacto = document.getElementById('tablaContactos')

let creandoContacto = true;  // true=submit crea  false=para editar
let idContacto = null; //vacio

//manejadores de eventos
btnAgregarContacto.addEventListener('click', abrirModalContacto)

// CREAR CONTACTO - boton submit modal
formularioCrearContacto.addEventListener('submit', (e) => {
    e.preventDefault();
    if (creandoContacto) {
        //crear un objeto Contacto
        crearContacto()
    } else {
        editarContacto()
    }
})

cargaDatosContacto()