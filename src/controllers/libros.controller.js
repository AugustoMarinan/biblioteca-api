import { db } from "../firebase.js";

// Obtener libros
export const obtenerLibros = async (req, res) => {
  try {
    const snapshot = await db.collection("libros").get();
    const libros = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    console.log("📚 GET libros ejecutado");
    res.status(200).json(libros);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener libros", error });
  }
};

// Obtener libro por ID
export const obtenerLibroPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const libro = await db.collection("libros").doc(id).get();

    if (!libro.exists) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    console.log(`📚 GET libro ${id} ejecutado`);
    res.status(200).json({ id: libro.id, ...libro.data() });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener libro", error });
  }
};

// Crear libro
export const crearLibro = async (req, res) => {
  try {
    const data = req.body;
    const nuevoLibro = await db.collection("libros").add(data);

    console.log("📝 Libro creado:", nuevoLibro.id);
    res.status(201).json({ id: nuevoLibro.id, ...data });
  } catch (error) {
    res.status(500).json({ message: "Error al crear libro", error });
  }
};

// Actualizar libro
export const actualizarLibro = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("libros").doc(id).update(req.body);

    console.log("✏️ Libro actualizado:", id);
    res.status(200).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar libro", error });
  }
};

// Eliminar libro
export const eliminarLibro = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("libros").doc(id).delete();

    console.log("🗑️ Libro eliminado:", id);
    res.status(200).json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar libro", error });
  }
};

