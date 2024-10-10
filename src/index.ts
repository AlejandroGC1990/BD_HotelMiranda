//! Este archivo configura tu servidor Express, define middlewares (como cors y express.json())
//!  y carga las rutas de tu API. El archivo .env contiene configuraciones como el puerto (PORT). 

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import roomRoutes from './routes/roomRoutes';
// import bookingRoutes from './routes/bookingRoutes';
import contactRoutes from './routes/contactRoutes';
import userRoutes from './routes/usersRoutes';
import authRoutes from './routes/authRoutes';
import publicRoutes from './routes/publicRoutes';

dotenv.config(); //? Carga variables del archivo .env

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

//? Conexión a MongoDB
mongoose.connect(MONGO_URI!)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

//? Middleware
app.use(cors());  // Permite solicitudes desde diferentes dominios
app.use(express.json()); // Parsear cuerpos de las solicitudes en JSON

//? Rutas de autenticación
app.use('/api/login', authRoutes);

//? Rutas
app.use('/public', publicRoutes);
app.use('/api/room', roomRoutes);
// app.use('/api/booking', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/user', userRoutes);


//? Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/public/info`);
});