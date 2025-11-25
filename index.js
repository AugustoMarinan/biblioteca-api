import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { verifyToken } from './src/middlewares/auth.middleware.js';

// Inicializar variables de entorno
dotenv.config();

// 🔥 Inicializar Firebase (evita errores de importación en los controladores)
import './src/firebase.js'; 

// Middlewares
import { errorHandler } from './src/middlewares/error.middleware.js';

// Rutas
import authRoutes from './src/routes/auth.routes.js';
import usuariosRoutes from './src/routes/usuarios.routes.js';
import librosRoutes from './src/routes/libros.routes.js';
import autoresRoutes from './src/routes/autores.routes.js';
import categoriasRoutes from './src/routes/categorias.routes.js';
import prestamosRoutes from './src/routes/prestamos.routes.js';
import devolucionesRoutes from './src/routes/devoluciones.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('src/uploads'));

// 🔥 LOG GLOBAL PARA SABER QUÉ PETICIÓN LLEGA
app.use((req, res, next) => {
  console.log("➡️ Llega petición:", req.method, req.originalUrl);
  next();
});

/*  
  ⚠️ IMPORTANTE:
  PRIMERO VAN LAS RUTAS PÚBLICAS (SIN TOKEN)
*/
app.use('/auth', authRoutes);

/*
  ✔️ DESPUÉS VAN LAS RUTAS PROTEGIDAS CON JWT
*/
app.use('/api/usuarios', verifyToken, usuariosRoutes);
app.use('/api/libros', verifyToken, librosRoutes);
app.use('/api/autores', verifyToken, autoresRoutes);
app.use('/api/categorias', verifyToken, categoriasRoutes);
app.use('/api/prestamos', verifyToken, prestamosRoutes);
app.use('/api/devoluciones', verifyToken, devolucionesRoutes);

// 🔥 CATCH-ALL 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware global de errores
app.use(errorHandler);

// Servidor
app.listen(PORT, () => 
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);



