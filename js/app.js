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
}

function limpiarFormulario(){
    formularioCrearContacto.reset()
    // inputApellido.value =""
}

function guardarEnLocalStorage(){
    // invaco al objeto de js
    localStorage.setItem('agendaKey',JSON.stringify(agenda))
}


//==============================================================
//el usuario completa el form y debo crear un objeto contacto
//declaro variables
const btnAgregarContacto = document.getElementById('btnAgregarContacto');
const formularioCrearContacto = document.querySelector('form');

// valores el input xa crear contacto
const agenda = [];
const inputNombre = document.querySelector('#nombre')
const inputApellido = document.querySelector('#apellido')
const inputEmail = document.querySelector('#email')
const inputTelefono = document.querySelector('#telefono')
const inputImagen = document.querySelector('#imagen')
const inputNotas = document.querySelector('#notas')


//manejadores de eventos
btnAgregarContacto.addEventListener('click', abrirModalContacto)

formularioCrearContacto.addEventListener('submit', (e) => {
    e.preventDefault();
    //crear un objeto Contacto
    crearContacto()
})