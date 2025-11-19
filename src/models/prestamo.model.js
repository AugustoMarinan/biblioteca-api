export default class Prestamo {
  constructor({ usuarioId, libroId, fechaPrestamo, fechaDevolucion, estado }) {
    this.usuarioId = usuarioId;
    this.libroId = libroId;
    this.fechaPrestamo = fechaPrestamo || new Date().toISOString();
    this.fechaDevolucion = fechaDevolucion || null;
    this.estado = estado || "pendiente"; // pendiente, devuelto
  }
}
