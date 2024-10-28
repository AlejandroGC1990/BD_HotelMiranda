"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
//? Definir el esquema de Mongoose basado en roomInterfaz
const roomSchema = new mongoose_1.Schema({
    room_id: { type: Number, required: true, unique: true },
    room_number: { type: Number, required: true },
    room_type: { type: String, required: true },
    room_facilities: { type: [String], required: true },
    room_price: { type: Number, required: true },
    offer_price: { type: Number, default: null },
    room_status: { type: String, required: true },
    room_picture: { type: String, required: true },
    room_bedType: { type: String, required: true },
});
//?Crear el modelo a partir del esquema
const RoomModel = mongoose_1.default.model('Room', roomSchema);
exports.default = RoomModel;
