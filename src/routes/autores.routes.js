import { Router } from "express";
import {
  obtenerAutores,
  obtenerAutorPorId,
  crearAutor,
  actualizarAutor,
  eliminarAutor,
} from "../controllers/autores.controller.js";

const router = Router();

router.get("/", obtenerAutores);
router.get("/:id", obtenerAutorPorId);
router.post("/", crearAutor);
router.put("/:id", actualizarAutor);
router.delete("/:id", eliminarAutor);

export default router;


