export default class Contacto {
    #id;
    #nombre;
    #apellido;
    #telefono;
    #email;
    #imagen;
    #notas;
    constructor(nombre, apellido, telefono, email, imagen, notas) {
        this.#id = crypto.randomUUID();
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#telefono = telefono;
        this.#email = email;
        this.#imagen = imagen;
        this.#notas = notas;
    }

    // Getter
    get getNombre() {
        return this.#nombre;
    }

    // Setter
    set setNombre(nuevoNombre) {
        this.#nombre = nuevoNombre;
    }

}