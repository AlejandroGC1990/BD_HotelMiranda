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
exports.removeBooking = exports.updateBooking = exports.createBooking = exports.getBookingById = exports.getAllBookings = void 0;
const bookingModels_1 = __importDefault(require("../models/bookingModels"));
const roomModels_1 = __importDefault(require("../models/roomModels"));
const contactModels_1 = __importDefault(require("../models/contactModels"));
//? Obtener todas las reservas
const getAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield bookingModels_1.default.find().populate('guest').populate('room');
        res.status(200).json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener las reservas', error });
    }
});
exports.getAllBookings = getAllBookings;
//? Obtener una reserva por ID
const getBookingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const booking = yield bookingModels_1.default.findById(id).populate('guest').populate('room');
        if (booking) {
            res.status(200).json(booking);
        }
        else {
            res.status(404).json({ message: "Reserva no encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener la reserva', error });
    }
});
exports.getBookingById = getBookingById;
//? Crear una nueva reserva
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { guest, room, specialRequest } = req.body;
        //? Verifica si el contacto y la habitación existen
        const contactExists = yield contactModels_1.default.findById(guest);
        const roomExists = yield roomModels_1.default.findById(room);
        if (!contactExists || !roomExists) {
            res.status(400).json({ message: 'El contacto o la habitación no existen' });
        }
        const newBooking = new bookingModels_1.default({
            // booking_id,
            guest,
            guest_idReview: guest.guest_idReview,
            guest_name: guest.guest_name,
            guest_orderDate: guest.guest_orderDate,
            guest_checkIn: guest.guest_checkIn,
            guest_checkOut: guest.guest_checkOut,
            booking_specialRequest: specialRequest,
            room,
            room_number: room.guest_name,
            room_type: room.room_type,
            room_status: room.room_status
        });
        const createdBooking = yield newBooking.save();
        res.status(201).json({ message: 'Reserva creada', booking: createdBooking });
    }
    catch (error) {
        res.status(400).json({ message: 'Error al crear la reserva', error });
    }
});
exports.createBooking = createBooking;
//? Actualizar una reserva existente
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    try {
        const updatedBooking = yield bookingModels_1.default.findByIdAndUpdate(id, updatedData, { new: true }).populate('guest').populate('room');
        if (updatedBooking) {
            res.status(200).json({ message: 'Reserva actualizada', booking: updatedBooking });
        }
        else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
    }
    catch (error) {
        res.status(400).json({ message: 'Error al actualizar la reserva', error });
    }
});
exports.updateBooking = updateBooking;
//? Eliminar una reserva
const removeBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const removedBooking = yield bookingModels_1.default.findByIdAndDelete(id);
        if (removedBooking) {
            res.status(200).json({ message: 'Reserva eliminada exitosamente' });
        }
        else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
    }
    catch (error) {
        res.status(400).json({ message: 'Error al eliminar la reserva', error });
    }
});
exports.removeBooking = removeBooking;
