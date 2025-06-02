console.log(window.location.search)

//1- buscar parametros dentro de una URL
const parametroURL = new URLSearchParams(window.location.search)
console.log(parametroURL)
const id = parametroURL.get('id')
console.log(id)


//2- Traer la agenda de contactos del local storage, y lo pongo en un array
const agenda = JSON.parse(localStorage.getItem('agendaKey'))
console.log(agenda)

//3- buscar en la agenda, los datos del contacto que tiene el id recibido en la URL
const contactoBuscado = agenda.find((contacto) => (contacto.id === id))
console.log(contactoBuscado)

//4- dibujar el objeto en mi maquetado



//-------- DOM -----------------
const cardContacto = document.querySelector('.card')
console.log(cardContacto)

cardContacto.innerHTML = `<div class="row g-0">
                    <div class="col-md-4">
                        <img src="${contactoBuscado.imagen}" class="img-fluid rounded-start" alt="${contactoBuscado.nombre}">
                        // agregar if si no hay imagen para mostrar
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <form>
                                <div class="mb-3">
                                    <label for="nombre" class="form-label">Nombre</label>
                                    <input type="text" class="form-control bg-body-tertiary text-dark" id="nombre"
                                        aria-describedby="label nombre" minlength="2" maxlength="50" placeholder="Juan"
                                        value = ${contactoBuscado.nombre} disabled />
                                </div>
                                <div class="mb-3">
                                    <label for="apellido" class="form-label">Apellido</label>
                                    <input type="text" class="form-control bg-body-tertiary text-dark" id="apellido"
                                        minlength="2" maxlength="50" placeholder=Perez value = ${contactoBuscado.apellido} disabled />
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control bg-body-tertiary text-dark" id="email"
                                        placeholder="juanperez@email.com" value = ${contactoBuscado.email} disabled />
                                </div>
                                <div class="mb-3">
                                    <label for="telefono" class="form-label">Telefono</label>
                                    <input type="tel" class="form-control bg-body-tertiary text-dark" id="telefono"
                                        placeholder="ej: +5493081225566" value = ${contactoBuscado.telefono} disabled />
                                </div>
                                <div class="mb-3">
                                    <label for="notas" class="form-label">Notas</label>
                                    <textarea class="form-control bg-body-tertiary text-dark" id="notas" maxlength="250"
                                        placeholder="agrega tus notas aqui" disabled>${contactoBuscado.notas}</textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>`

