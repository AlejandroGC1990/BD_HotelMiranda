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
// import { createTableUser } from 'interfaces/user';
const db_1 = require("./db");
const contact_1 = require("interfaces/contact");
const room_1 = require("interfaces/room");
const booking_1 = require("interfaces/booking");
const user_1 = require("interfaces/user");
//! USAR node dist/src/database/createTables.js UNA VEZ PARA
//! CREAR LAS TABLAS EN LA BASE DE DATOS
const createTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.connectDB)();
    try {
        yield connection.execute(user_1.createTableUser);
        yield connection.execute(contact_1.createTableContact);
        yield connection.execute(room_1.createTableRoom);
        yield connection.execute(booking_1.createTableBooking);
        console.log('Create Table SuccessFully');
    }
    catch (error) {
        console.log('Error creating tables', error);
    }
    finally {
        connection.end();
    }
});
createTable().catch(err => console.error('error creating tables:', err));
