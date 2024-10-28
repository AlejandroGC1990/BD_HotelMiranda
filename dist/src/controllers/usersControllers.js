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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.updateUser = exports.createUser = exports.getUsersById = exports.getAllUsers = void 0;
const db_1 = require("../db/db");
//?? Obtener todos los usuarios
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, db_1.connectDB)();
        const [users] = yield connection.execute('SELECT * FROM User');
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
});
exports.getAllUsers = getAllUsers;
//?? Obtener usuarios por Id
const getUsersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const connection = yield (0, db_1.connectDB)();
        const [user] = yield connection.execute('SELECT * FROM User WHERE user_id = ?', [id]);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
});
exports.getUsersById = getUsersById;
//? Crear un nuevo usuario
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_name, user_password, user_picture, user_jobDescription, user_schedule, user_contact, user_status } = req.body;
    if (!user_name || !user_password) {
        res.status(400).json({ message: 'Nombre y contraseña son requeridos' });
        return;
    }
    try {
        const connection = yield (0, db_1.connectDB)();
        yield connection.execute('INSERT INTO User (user_name, user_password, user_picture, user_jobDescription, user_schedule, user_contact, user_status) VALUES (?, ?, ?, ?, ?, ?, ?)', [user_name, user_password, user_picture, user_jobDescription, JSON.stringify(user_schedule), user_contact, user_status]);
        res.status(201).json({ message: 'Usuario creado' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
});
exports.createUser = createUser;
//? Actualizar un usuario existente
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const connection = yield (0, db_1.connectDB)();
    try {
        const [result] = yield connection.execute('UPDATE User SET user_name = ?, user_password = ?, user_picture = ?, user_jobDescription = ?, user_schedule = ?, user_contact = ?, user_status = ? WHERE user_id = ?', [updatedData.user_name, updatedData.user_password, updatedData.user_picture, updatedData.user_jobDescription, JSON.stringify(updatedData.user_schedule), updatedData.user_contact, updatedData.user_status, id]);
        const okResult = result;
        if (okResult.affectedRows) {
            res.status(200).json({ message: 'Usuario actualizado' });
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
});
exports.updateUser = updateUser;
//? Eliminar un usuario
const removeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const connection = yield (0, db_1.connectDB)();
    try {
        const [result] = yield connection.execute('DELETE FROM User WHERE user_id = ?', [id]);
        const okResult = result;
        if (okResult.affectedRows) {
            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
});
exports.removeUser = removeUser;
