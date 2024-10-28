"use strict";
//! Este archivo configura tu servidor Express, define middlewares (como cors y express.json())
//!  y carga las rutas de tu API. El archivo .env contiene configuraciones como el puerto (PORT). 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
//? Importación de rutas
const roomRoutes_1 = __importDefault(require("./routes/roomRoutes"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const publicRoutes_1 = __importDefault(require("./routes/publicRoutes"));
dotenv_1.default.config(); //? Carga variables del archivo .env
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
//? Conexión a MongoDB
mongoose_1.default.connect(MONGO_URI)
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('MongoDB connected');
    //? Para cifrar las contraseñas de los usuarios creados antes de aplicar bcrypt
    // const users = await UserModel.find();
    // users.forEach(async (user) => {
    //     if (!user.user_password.startsWith('$2b$')) { // Si la contraseña no está cifrada
    //         const salt = await bcrypt.genSalt(10);
    //         user.user_password = await bcrypt.hash(user.user_password, salt);
    //         await user.save();
    //         console.log(`Contraseña de ${user.user_name} cifrada correctamente`);
    //     }
    // });
}))
    .catch(err => console.error('MongoDB connection error:', err));
//? Middleware de CORS manual
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,UPDATE',
    credentials: true,
}));
//? Middleware
app.use(express_1.default.json()); //? Permite recibir datos en formato JSON en las solicitudes
//? Rutas de autenticación
app.use('/api/login', authRoutes_1.default);
//? Rutas
app.use('/public', publicRoutes_1.default);
app.use('/api/room', roomRoutes_1.default);
app.use('/api/booking', bookingRoutes_1.default);
app.use('/api/contact', contactRoutes_1.default);
app.use('/api/user', usersRoutes_1.default);
//? Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/public/info`);
});
