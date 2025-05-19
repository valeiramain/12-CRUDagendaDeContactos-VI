

function agregarContacto(){
// console.log('desde agregar')
const modalCrearContacto = new bootstrap.Modal(document.getElementById('crearContacto'))

//mostrar modal
modalCrearContacto.show()
}


// declaro variables
// el usuario selecciona con click invocar una funcion que muestre el modal
const btnAgregarContacto = document.getElementById('agregarContacto')
// console.log(btnAgregarContacto)
const formularioCrearContacto = document.querySelector('form')


// manejadores de eventos
btnAgregarContacto.addEventListener('click',agregarContacto)
formularioCrearContacto.addEventListener('submit',(e) => {
    e.preventDefault();
    console.log('deberia crear objeto contacto')

})


