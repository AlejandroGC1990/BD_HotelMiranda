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
exports.seedDB = seedDB;
const mongoose_1 = __importDefault(require("mongoose"));
const userModels_js_1 = __importDefault(require("./models/userModels.js"));
const fakeUsers_1 = require("./data/fake/fakeUsers");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//? URI para conectarse a la base de datos de MongoDB
const uri = "MONGO_URI";
//? Función para guardar datos ficticios de usuarios
const saveFakeUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 10; i++) {
        const fakeUser = (0, fakeUsers_1.fakeUsers)(); // Generar un usuario fake
        const newUser = new userModels_js_1.default(fakeUser); // Crear una nueva instancia del modelo con los datos fake
        yield newUser.save(); // Guardar el usuario en la base de datos
    }
});
//? Función principal para iniciar el seed
function seedDB() {
    return __awaiter(this, void 0, void 0, function* () {
        yield dbConnection(); // Conectamos a la base de datos
        yield saveFakeUsers(); // Guardamos los usuarios ficticios
        mongoose_1.default.connection.close(); // Cerramos la conexión después de completar el proceso
    });
}
//? Función para conectar a MongoDB
function dbConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(uri); // Conectar a MongoDB usando la URI
            console.log("Conexión exitosa a la base de datos");
        }
        catch (err) {
            console.log(err.stack);
            yield mongoose_1.default.disconnect(); // Desconectar en caso de fallo
        }
    });
}
//? Ejecutamos la función para iniciar el proceso de seed
seedDB();
