"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    booking_id: { type: Number, required: true },
    guest: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Contact', required: true },
    guest_idReview: { type: Number, required: true },
    guest_name: { type: String, required: true },
    guest_orderDate: { type: String, required: true },
    guest_checkIn: { type: String, required: true },
    guest_checkOut: { type: String, required: true },
    booking_specialRequest: { type: String, required: false },
    room: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Room', required: true },
    room_id: { type: Number, required: true },
    room_number: { type: Number, required: true },
    room_type: { type: String, required: true },
    room_status: { type: String, enum: ['Check In', 'Check Out', 'In Progress'], required: true }
});
const BookingModel = mongoose_1.default.model('Booking', bookingSchema);
exports.default = BookingModel;
