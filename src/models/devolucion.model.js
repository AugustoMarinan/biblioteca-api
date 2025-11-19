export default class Devolucion {
  constructor({ prestamoId, usuarioId, libroId, fecha_devolucion }) {
    this.prestamoId = prestamoId;
    this.usuarioId = usuarioId;
    this.libroId = libroId;
    this.fecha_devolucion = fecha_devolucion || new Date().toISOString();
  }
}
