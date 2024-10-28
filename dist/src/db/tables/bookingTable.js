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
exports.createContactTable = void 0;
const db_1 = require("../db");
const createContactTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.connectDB)();
    yield connection.execute(`

        CREATE TABLE IF NOT EXISTS Booking (
            booking_id INT PRIMARY KEY AUTO_INCREMENT,
            guest_idReview INT NOT NULL,
            guest_name VARCHAR(255) NOT NULL,
            guest_orderDate DATE NOT NULL,
            guest_checkIn DATE NOT NULL,
            guest_checkOut DATE NOT NULL,
            booking_specialRequest TEXT,
            room_id INT NOT NULL,
            room_number INT NOT NULL,
            room_type VARCHAR(255) NOT NULL,
            room_status ENUM('Check In', 'Check Out', 'In Progress') NOT NULL,
            FOREIGN KEY (guest_idReview) REFERENCES Contact(guest_idReview) ON DELETE CASCADE,
            FOREIGN KEY (room_id) REFERENCES Room(room_id) ON DELETE CASCADE
        );
    `);
});
exports.createContactTable = createContactTable;
