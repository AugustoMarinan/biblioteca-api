export default class Autor {
  constructor({ nombre, nacionalidad, fecha_nacimiento, biografia }) {
    this.nombre = nombre;
    this.nacionalidad = nacionalidad || null;
    this.fecha_nacimiento = fecha_nacimiento || null; 
    this.biografia = biografia || null;
  }
}
