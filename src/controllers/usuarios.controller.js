import { db } from "../firebase.js";

// Obtener usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const snapshot = await db.collection("usuarios").get();
    const usuarios = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    console.log("👤 GET usuarios ejecutado");
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

// Obtener usuario por ID
export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await db.collection("usuarios").doc(id).get();

    if (!usuario.exists) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    console.log(`👤 GET usuario ${id} ejecutado`);
    res.status(200).json({ id: usuario.id, ...usuario.data() });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error });
  }
};

// Crear usuario
export const crearUsuario = async (req, res) => {
  try {
    const data = req.body;
    const nuevoUsuario = await db.collection("usuarios").add(data);

    console.log("📝 Usuario creado:", nuevoUsuario.id);
    res.status(201).json({ id: nuevoUsuario.id, ...data });
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error });
  }
};

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("usuarios").doc(id).update(req.body);

    console.log("✏️ Usuario actualizado:", id);
    res.status(200).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("usuarios").doc(id).delete();

    console.log("🗑️ Usuario eliminado:", id);
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }
};

