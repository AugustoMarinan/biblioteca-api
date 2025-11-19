import { db } from "../firebase.js";

// Obtener todos los autores
export const obtenerAutores = async (req, res) => {
  try {
    const snapshot = await db.collection("autores").get();
    const autores = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    console.log("📚 GET autores ejecutado");
    res.status(200).json(autores);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener autores", error });
  }
};

// Obtener autor por ID
export const obtenerAutorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const autor = await db.collection("autores").doc(id).get();

    if (!autor.exists) {
      return res.status(404).json({ message: "Autor no encontrado" });
    }

    console.log(`📚 GET autor ${id} ejecutado`);
    res.status(200).json({ id: autor.id, ...autor.data() });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener autor", error });
  }
};

// Crear autor
export const crearAutor = async (req, res) => {
  try {
    const data = req.body;
    const nuevoAutor = await db.collection("autores").add(data);

    console.log("📝 Autor creado:", nuevoAutor.id);
    res.status(201).json({ id: nuevoAutor.id, ...data });
  } catch (error) {
    res.status(500).json({ message: "Error al crear autor", error });
  }
};

// Actualizar autor
export const actualizarAutor = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("autores").doc(id).update(req.body);

    console.log("✏️ Autor actualizado:", id);
    res.status(200).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar autor", error });
  }
};

// Eliminar autor
export const eliminarAutor = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("autores").doc(id).delete();

    console.log("🗑️ Autor eliminado:", id);
    res.status(200).json({ message: "Autor eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar autor", error });
  }
};

