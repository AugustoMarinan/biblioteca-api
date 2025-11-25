import admin from "firebase-admin";
import jwt from "jsonwebtoken";
import { db } from "../firebase.js";
import dotenv from "dotenv";

dotenv.config();

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    const snapshot = await db
      .collection("usuarios")
      .where("email", "==", email)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    if (userData.password !== password) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // 🔥 TOKEN CON ROL INCLUIDO
    const token = jwt.sign(
      {
        uid: userDoc.id,
        email: userData.email,
        rol: userData.rol   // 👈 agregado
      },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: userDoc.id,
        email: userData.email,
        rol: userData.rol
      },
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// REGISTER
export const register = async (req, res) => {
  try {
    const { email, password, nombre, rol } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña obligatorios" });
    }

    const nuevo = await db.collection("usuarios").add({
      email,
      password, 
      nombre: nombre || "",
      rol: rol || "user", // 👈 SI NO ENVÍA ROL, ES USER
      creado: new Date(),
    });

    res.status(201).json({ message: "Usuario creado", id: nuevo.id });
  } catch (error) {
    console.error("❌ Error al registrar:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

