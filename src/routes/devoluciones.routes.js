import { Router } from "express";
import {
  obtenerDevoluciones,
  obtenerDevolucionPorId,
  crearDevolucion,
  actualizarDevolucion,
  eliminarDevolucion,
} from "../controllers/devoluciones.controller.js";

const router = Router();

// GET todas las devoluciones
router.get("/", obtenerDevoluciones);

// GET devolución por ID
router.get("/:id", obtenerDevolucionPorId);

// POST crear devolución
router.post("/", crearDevolucion);

// PUT actualizar devolución
router.put("/:id", actualizarDevolucion);

// DELETE eliminar devolución
router.delete("/:id", eliminarDevolucion);

export default router;


