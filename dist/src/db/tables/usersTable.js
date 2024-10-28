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
exports.createUserTable = void 0;
const db_1 = require("../db");
const createUserTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.connectDB)();
    yield connection.execute(`
        CREATE TABLE IF NOT EXISTS User (
            user_id INT PRIMARY KEY AUTO_INCREMENT,
            user_name VARCHAR(255) NOT NULL,
            user_password VARCHAR(255) NOT NULL,
            user_picture VARCHAR(255) NOT NULL,
            user_joined DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            user_jobDescription VARCHAR(255) NOT NULL,
            user_schedule TEXT NOT NULL,
            user_contact VARCHAR(255) NOT NULL,
            user_status VARCHAR(50) NOT NULL
        );
    `);
});
exports.createUserTable = createUserTable;
