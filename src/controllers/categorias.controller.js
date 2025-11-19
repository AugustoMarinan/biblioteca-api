import { db } from "../firebase.js";

// Obtener todas las categorías
export const obtenerCategorias = async (req, res) => {
  try {
    const snapshot = await db.collection("categorias").get();
    const categorias = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    console.log("📚 GET categorias ejecutado");
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener categorías", error });
  }
};

// Obtener categoría por ID
export const obtenerCategoriaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await db.collection("categorias").doc(id).get();

    if (!categoria.exists) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    console.log(`📚 GET categoria ${id} ejecutado`);
    res.status(200).json({ id: categoria.id, ...categoria.data() });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener categoría", error });
  }
};

// Crear categoría
export const crearCategoria = async (req, res) => {
  try {
    const data = req.body;
    const nuevaCategoria = await db.collection("categorias").add(data);

    console.log("📝 Categoría creada:", nuevaCategoria.id);
    res.status(201).json({ id: nuevaCategoria.id, ...data });
  } catch (error) {
    res.status(500).json({ message: "Error al crear categoría", error });
  }
};

// Actualizar categoría
export const actualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("categorias").doc(id).update(req.body);

    console.log("✏️ Categoría actualizada:", id);
    res.status(200).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar categoría", error });
  }
};

// Eliminar categoría
export const eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("categorias").doc(id).delete();

    console.log("🗑️ Categoría eliminada:", id);
    res.status(200).json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar categoría", error });
  }
};

