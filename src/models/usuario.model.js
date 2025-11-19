export default class Usuario {
  constructor({ nombre, apellido, email, password, rol }) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.password = password; // encriptada
    this.rol = rol || "usuario";
  }
}
