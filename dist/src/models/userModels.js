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
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//? Definir el esquema de Mongoose basado en userInterfaz
const userSchema = new mongoose_1.Schema({
    user_name: { type: String, required: true, unique: true },
    user_password: { type: String, required: true },
    user_picture: { type: String },
    user_joined: { type: Date, default: Date.now },
    user_jobDescription: { type: String },
    user_schedule: { type: [String] },
    user_contact: { type: String },
    user_status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
});
//? Middleware para cifrar la contraseña antes de guardar el usuario
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        //? Verificar si el campo user_password ha sido modificado o es nuevo
        if (!this.isModified('user_password')) {
            return next();
        }
        try {
            //? Generar una sal (salt) para el hash
            const salt = yield bcrypt_1.default.genSalt(10);
            //? Cifrar la contraseña
            this.user_password = yield bcrypt_1.default.hash(this.user_password, salt);
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
//?Crear el modelo a partir del esquema
const UserModel = mongoose_1.default.model('User', userSchema);
exports.default = UserModel;
