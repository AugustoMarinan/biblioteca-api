export default class Libro {
  constructor({ titulo, autor, categoria, año, descripcion, portadaUrl }) {
    this.titulo = titulo;
    this.autor = autor;
    this.categoria = categoria;
    this.año = año;
    this.descripcion = descripcion;
    this.portadaUrl = portadaUrl || null; // opcional
  }
}
