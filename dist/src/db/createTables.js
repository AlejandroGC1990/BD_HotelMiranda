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
const contactTable_1 = require("./tables/contactTable");
const roomTable_1 = require("./tables/roomTable");
//! USAR node dist/src/database/createTables.js UNA VEZ PARA
//! CREAR LAS TABLAS EN LA BASE DE DATOS
const createTables = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, contactTable_1.createContactTable)();
        console.log('Tabla Contact creada correctamente');
        yield (0, roomTable_1.createRoomTable)();
        console.log('Tabla Room creada correctamente');
        // await createUsersTable();
        // console.log('Tabla usuarios creada correctamente');
        // await createBookingTable();
        // console.log('Tabla Booking creada correctamente');
    }
    catch (error) {
        console.error('Error al crear las tablas:', error);
    }
});
createTables();
