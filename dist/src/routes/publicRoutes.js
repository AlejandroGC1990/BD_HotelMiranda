"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const infoController_1 = require("../controllers/infoController");
const router = (0, express_1.Router)();
//? Ruta pública para mostrar información del hotel y endpoints privados
router.get('/info', infoController_1.getHotelInfo);
exports.default = router;
