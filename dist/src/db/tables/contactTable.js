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
    CREATE TABLE IF NOT EXISTS Contact (
      guest_idReview INT PRIMARY KEY AUTO_INCREMENT,
      guest_timeDateReview VARCHAR(255) NOT NULL,
      guest_DateReview VARCHAR(255) NOT NULL,
      guest_name VARCHAR(255) NOT NULL,
      guest_email VARCHAR(255) NOT NULL,
      guest_phone VARCHAR(20) NOT NULL,
      guest_rateReview INT NOT NULL,
      guest_commentReview TEXT NOT NULL,
      guest_statusReview VARCHAR(50) NOT NULL,
      guest_checkIn DATE NOT NULL,
      guest_checkInTime TIME NOT NULL,
      guest_checkOut DATE NOT NULL,
      guest_checkOutTime TIME NOT NULL,
      guest_orderDateTime DATETIME NOT NULL,
      guest_orderDate DATE NOT NULL,
      guest_room_state VARCHAR(50) NOT NULL
    );
  `);
});
exports.createContactTable = createContactTable;
