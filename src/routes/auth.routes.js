import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

console.log("📌 Router AUTH cargado");

const router = Router();

router.get("/test", (req, res) => {
  res.send("AUTH FUNCIONA");
});

router.post("/login", login);
router.post("/register", register);

export default router;


