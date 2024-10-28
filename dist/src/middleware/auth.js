"use strict";
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
exports.checkAuthentication = exports.verifyToken = exports.authenticate = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModels_1 = __importDefault(require("../models/userModels"));
dotenv_1.default.config();
//? Clave secreta para firmar el token JWT
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'defaultSecretKey';
//? Middleware de autenticación
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_name, user_password } = req.body; // Obtener las credenciales del cuerpo de la solicitud
    try {
        console.log(`Autenticando usuario: ${user_name}`);
        //?Buscar usuario en la BD
        const user = yield userModels_1.default.findOne({ user_name });
        //? Verificar si el usuario fue encontrado
        if (!user) {
            res.status(401).json({ message: 'Invalid User' });
            return;
        }
        //? Verificar la contraseña utilizando bcrypt
        const isPasswordValid = yield bcrypt_1.default.compare(user_password, user.user_password);
        console.log(`Contraseña válida: ${isPasswordValid}`); // Log de la comparación de contraseña
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid Password' });
            return;
        }
        //? Crear el token JWT si la autenticación es correcta
        const token = jsonwebtoken_1.default.sign({ user_name: user.user_name }, SECRET_KEY, { expiresIn: '24h' });
        //? Enviar el token como respuesta
        res.json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.authenticate = authenticate;
//? Middleware para verificar el token
const verifyToken = (req, res, next) => {
    var _a;
    //? Obtener el token del encabezado de autorización
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.sendStatus(403); //Si no hay token, no party
        return;
    }
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = decoded; // Guardar la información decodificada del token en la solicitud
        next(); // Pasar al siguiente middleware
    });
};
exports.verifyToken = verifyToken;
//? Middleware para comprobar si el usuario está autenticado
const checkAuthentication = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Obtener el token del encabezado de autorización
    console.log('Token recibido:', token);
    if (!token) {
        req.isAuthenticated = false; // Si no hay token, el usuario no está autenticado
        return next();
    }
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err) => {
        if (err) {
            req.isAuthenticated = false;
        }
        else {
            req.isAuthenticated = true;
        }
        next();
    });
};
exports.checkAuthentication = checkAuthentication;
