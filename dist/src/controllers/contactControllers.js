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
exports.removeContact = exports.updateContact = exports.createContact = exports.getContactById = exports.getAllContacts = void 0;
const db_1 = require("../db/db");
//?? Obtener todos los contactos
const getAllContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, db_1.connectDB)();
        const [rows] = yield connection.execute('SELECT * FROM Contact');
        res.status(200).json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los contactos', error });
    }
});
exports.getAllContacts = getAllContacts;
//? Obtener contacto por ID
const getContactById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const connection = yield (0, db_1.connectDB)();
        const [rows] = yield connection.execute('SELECT * FROM Contact');
        if (rows) {
            res.status(200).json(rows);
        }
        else {
            res.status(404).json({ message: "Contacto no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el contacto', error });
    }
});
exports.getContactById = getContactById;
//? Crear un nuevo contacto
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { guest_name, guest_email, guest_phone, guest_commentReview, guest_rateReview } = req.body;
    try {
        const connection = yield (0, db_1.connectDB)();
        const [result] = yield connection.execute(`
            INSERT INTO Contact (guest_name, guest_email, guest_phone, guest_commentReview, guest_rateReview) 
            VALUES (?, ?, ?, ?, ?)`, [guest_name, guest_email, guest_phone, guest_commentReview, guest_rateReview]);
        const insertId = result.insertId;
        res.status(201).json({ message: 'Usuario creado', contactId: insertId });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
});
exports.createContact = createContact;
//? Actualizar un contacto existente
const updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { guest_name, guest_email, guest_phone, guest_commentReview, guest_rateReview } = req.body;
    try {
        const connection = yield (0, db_1.connectDB)();
        const [result] = yield connection.execute(`
            UPDATE Contact 
            SET guest_name = ?, guest_email = ?, guest_phone = ?, guest_commentReview = ?, guest_rateReview = ?
            WHERE guest_idReview = ?`, [guest_name, guest_email, guest_phone, guest_commentReview, guest_rateReview, id]);
        const okResult = result;
        if (okResult.affectedRows) {
            res.status(200).json({ message: 'Contacto actualizado', contact: exports.updateContact });
        }
        else {
            res.status(404).json({ message: 'Contacto no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
});
exports.updateContact = updateContact;
//? Eliminar un contacto
const removeContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const connection = yield (0, db_1.connectDB)();
        const [result] = yield connection.execute('DELETE FROM Contact WHERE guest_idReview = ?', [id]);
        const okResult = result;
        if (okResult.affectedRows) {
            res.status(200).json({ message: 'Contacto eliminado' });
        }
        else {
            res.status(404).json({ message: 'Contacto no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el contacto', error });
    }
});
exports.removeContact = removeContact;
