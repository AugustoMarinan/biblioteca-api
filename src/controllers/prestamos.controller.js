import { db } from "../firebase.js";

// Obtener préstamos
export const obtenerPrestamos = async (req, res) => {
  try {
    const snapshot = await db.collection("prestamos").get();
    const prestamos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    console.log("📚 GET prestamos ejecutado");
    res.status(200).json(prestamos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener préstamos", error });
  }
};

// Obtener préstamo por ID
export const obtenerPrestamoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const prestamo = await db.collection("prestamos").doc(id).get();

    if (!prestamo.exists) {
      return res.status(404).json({ message: "Préstamo no encontrado" });
    }

    console.log(`📚 GET prestamo ${id} ejecutado`);
    res.status(200).json({ id: prestamo.id, ...prestamo.data() });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener préstamo", error });
  }
};

// Crear préstamo
export const crearPrestamo = async (req, res) => {
  try {
    const data = req.body;
    const nuevo = await db.collection("prestamos").add(data);

    console.log("📝 Préstamo creado:", nuevo.id);
    res.status(201).json({ id: nuevo.id, ...data });
  } catch (error) {
    res.status(500).json({ message: "Error al crear préstamo", error });
  }
};

// Actualizar préstamo
export const actualizarPrestamo = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("prestamos").doc(id).update(req.body);

    console.log("✏️ Préstamo actualizado:", id);
    res.status(200).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar préstamo", error });
  }
};

// Eliminar préstamo
export const eliminarPrestamo = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("prestamos").doc(id).delete();

    console.log("🗑️ Préstamo eliminado:", id);
    res.status(200).json({ message: "Préstamo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar préstamo", error });
  }
};



