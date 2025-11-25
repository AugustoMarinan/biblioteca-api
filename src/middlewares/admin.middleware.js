export const isAdmin = (req, res, next) => {
  try {
    // El rol viene del token decodificado en verifyToken
    if (req.user.rol !== "admin") {
      return res.status(403).json({ message: "Acceso denegado: requiere rol admin" });
    }

    next();
  } catch (error) {
    console.error("❌ Error en isAdmin:", error);
    res.status(500).json({ message: "Error al validar rol" });
  }
};
