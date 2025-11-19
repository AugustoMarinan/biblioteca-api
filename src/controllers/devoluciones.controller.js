import { db } from "../firebase.js";

// Obtener devoluciones
export const obtenerDevoluciones = async (req, res) => {
  try {
    const snapshot = await db.collection("devoluciones").get();
    const devoluciones = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    console.log("📚 GET devoluciones ejecutado");
    res.status(200).json(devoluciones);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener devoluciones", error });
  }
};

// Obtener por ID
export const obtenerDevolucionPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const devolucion = await db.collection("devoluciones").doc(id).get();

    if (!devolucion.exists) {
      return res.status(404).json({ message: "Devolución no encontrada" });
    }

    console.log(`📚 GET devolucion ${id} ejecutado`);
    res.status(200).json({ id: devolucion.id, ...devolucion.data() });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener devolución", error });
  }
};

// Crear
export const crearDevolucion = async (req, res) => {
  try {
    const data = req.body;
    const nueva = await db.collection("devoluciones").add(data);

    console.log("📝 Devolución creada:", nueva.id);
    res.status(201).json({ id: nueva.id, ...data });
  } catch (error) {
    res.status(500).json({ message: "Error al crear devolución", error });
  }
};

// Actualizar
export const actualizarDevolucion = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("devoluciones").doc(id).update(req.body);

    console.log("✏️ Devolución actualizada:", id);
    res.status(200).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar devolución", error });
  }
};

// Eliminar
export const eliminarDevolucion = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("devoluciones").doc(id).delete();

    console.log("🗑️ Devolución eliminada:", id);
    res.status(200).json({ message: "Devolución eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar devolución", error });
  }
};



