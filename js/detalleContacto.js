console.log(window.location.search)

//1- buscar parametros dentro de una URL
const parametroURL = new URLSearchParams(window.location.search)
console.log(parametroURL)
const id = parametroURL.get('id')
console.log(id)


//2- Traer la agenda de contactos del local storage

//3- buscar en la agenda, los datos del contacto que tiene el id recibido en la URL

//4- dibujar el objeto en mi maquetado