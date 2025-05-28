// importa una clase desde una direccion de archivo
import Contacto from "./classContacto.js";


// el usuario cliquea el boton agregar invocar a una funcion que muestre el modal
function abrirModalContacto() {
    const modalCrearContacto = new bootstrap.Modal(document.getElementById('crearContacto'));
    //mostrar ventana modal, desde js, no con data-bs-target y data-bs-toggle
    modalCrearContacto.show();
}

function crearContacto() {
    //1- traer todos los datos del formulario validados

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

function limpiarFormulario() {
    formularioCrearContacto.reset()
    // inputApellido.value =""
}

function guardarEnLocalStorage() {
    console.log('en guardar datos en localstorage')
    // invaco al objeto de js. setItem, puede guarda o actualiza el mismo ID
    localStorage.setItem('agendaKey', JSON.stringify(agenda))
}

function cargaDatosContacto() {
    //LEER DATOS
    console.log('en cargar datos desde localstorage')
    //1- verificar en localstorage xa mostrar en la tabla
    if (agenda.length !== 0) {
        //2- dibujar cada fila con sus datos
        agenda.map(((contacto, index) => dibujarFila(contacto, index + 1)))
    } else {
        //mostrar un mensaje que no hay datos para mostrar
    }
}

function dibujarFila(contacto, index) {
    console.log('en dibujar fila')
    // dibuja una sola fila de la tabla con los datos
    console.log(contacto.id)
    tablaContacto.innerHTML += `
                    <tr>
                        <th scope="row">${index}</th>
                        <td>${contacto.nombre}</td>
                        <td>${contacto.apellido}</td>
                        <td>${contacto.telefono}</td>
                        <td>${contacto.email}</td>
                        <td>${contacto.imagen}</td>
                        <td>${contacto.notas}</td>
                        <td class="d-flex flex-nowrap gap-1">
                            <button class="btn btn-warning">
                                <i class="bi bi-pen"></i>
                            </button>
                            <button class="btn btn-danger" onclick="eliminarContacto('${contacto.id}')">
                                <i class="bi bi-trash"></i>
                            </button>
                            <button class="btn btn-info"><i class="bi bi-eye"></i></button>
                        </td>
                    </tr>`
}

// type module no permite usar funciones de js en html
window.eliminarContacto = (id) => {
    //1- obtener ID de contacto a borrar
    Swal.fire({
        title: "Estas por eliminar un contacto",
        text: "No se podrá revertir este paso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Borrar",
        cancelButtonText:"Salir",
    }).then((result) => {
        console.log(result)
        if (result.isConfirmed) {
            // aqui agrego codigo si quiero borrar
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

// cuando se elimina un elemento, hay que volver a ordenar los numeros de fila
function reasignarIndices() {
    console.log('en dibujar fila')
    // Vacía el cuerpo de la tabla
    tablaContacto.innerHTML = '';

    // Recorre la agenda y vuelve a dibujar cada fila con el índice correcto
    agenda.forEach((contacto, index) => {
        //cambiar solo el th, no dibujar la tabla entera
        dibujarFila(contacto, index + 1); // index + 1 para que el número arranque desde 1
    });
}



//================= EVENTOS DEL DOM =============================================
//el usuario completa el form y debo crear un objeto contacto
//declaro variables
const btnAgregarContacto = document.getElementById('btnAgregarContacto');
//form de la ventana modal xa cargar datos
const formularioCrearContacto = document.querySelector('form');

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


//manejadores de eventos
btnAgregarContacto.addEventListener('click', abrirModalContacto)

// CREAR CONTACTO - boton submit modal
formularioCrearContacto.addEventListener('submit', (e) => {
    e.preventDefault();
    //crear un objeto Contacto
    crearContacto()
})

cargaDatosContacto()