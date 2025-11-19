import { Router } from "express";
import {
  obtenerPrestamos,
  obtenerPrestamoPorId,
  crearPrestamo,
  actualizarPrestamo,
  eliminarPrestamo,
} from "../controllers/prestamos.controller.js";

const router = Router();

router.get("/", obtenerPrestamos);
router.get("/:id", obtenerPrestamoPorId);
router.post("/", crearPrestamo);
router.put("/:id", actualizarPrestamo);
router.delete("/:id", eliminarPrestamo);

export default router;





