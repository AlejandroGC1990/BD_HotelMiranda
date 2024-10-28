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
exports.removeRoom = exports.updateRoom = exports.createRoom = exports.getRoomById = exports.getAllRooms = void 0;
const db_1 = require("../db/db");
//? Obtener todas las habitaciones
const getAllRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, db_1.connectDB)();
        const [rooms] = yield connection.execute('SELECT * FROM Room');
        res.status(200).json(rooms);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener las habitaciones', error });
    }
});
exports.getAllRooms = getAllRooms;
//? Obtener una habitación por ID
const getRoomById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const connection = yield (0, db_1.connectDB)();
        const [room] = yield connection.execute('SELECT * FROM Room WHERE room_id = ?', [id]);
        if (room) {
            res.status(200).json(room);
        }
        else {
            res.status(404).json({ message: "Habitación no encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener la habitación', error });
    }
});
exports.getRoomById = getRoomById;
//? Crear una nueva habitación
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { room_number, room_type, room_facilities, room_price, offer_price, room_status, room_picture, room_bedType } = req.body;
    try {
        const connection = yield (0, db_1.connectDB)();
        const [result] = yield connection.execute(`
            INSERT INTO Room (room_number, room_type, room_facilities, room_price, offer_price, room_status, room_picture, room_bedType)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [room_number, room_type, room_facilities, room_price, offer_price, room_status, room_picture, room_bedType]);
        const insertId = result.insertId;
        res.status(201).json({ message: 'Habitación creada', roomId: result.insertId });
    }
    catch (error) {
        res.status(400).json({ message: 'Error al crear la habitación', error });
    }
});
exports.createRoom = createRoom;
//? Actualizar una habitación existente
const updateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { room_number, room_type, room_facilities, room_price, offer_price, room_status, room_picture, room_bedType } = req.body;
    try {
        const connection = yield (0, db_1.connectDB)();
        const [result] = yield connection.execute(`
            UPDATE Room 
            SET room_number = ?, room_type = ?, room_facilities = ?, room_price = ?, offer_price = ?, room_status = ?, room_picture = ?, room_bedType = ?
            WHERE room_id = ?`, [room_number, room_type, room_facilities, room_price, offer_price, room_status, room_picture, room_bedType, id]);
        const okResult = result;
        if (okResult.affectedRows) {
            res.status(200).json({ message: 'Habitación actualizada', room: exports.updateRoom });
        }
        else {
            res.status(404).json({ message: 'Habitación no encontrada' });
        }
    }
    catch (error) {
        res.status(400).json({ message: 'Error al actualizar la habitación', error });
    }
});
exports.updateRoom = updateRoom;
//? Eliminar una habitación
const removeRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const connection = yield (0, db_1.connectDB)();
        const [result] = yield connection.execute('DELETE FROM Room WHERE room_id = ?', [id]);
        const okResult = result;
        if (okResult.affectedRows) {
            res.status(200).json({ message: 'Habitación eliminada exitosamente' });
        }
        else {
            res.status(404).json({ message: 'Habitación no encontrada' });
        }
    }
    catch (error) {
        res.status(400).json({ message: 'Error al eliminar la habitación', error });
    }
});
exports.removeRoom = removeRoom;
