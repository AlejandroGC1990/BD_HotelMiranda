"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
//? Ruta para autenticación (login)
router.post('/', auth_1.authenticate);
//? Ruta para comprobar el estado de autenticación
router.get('/status', auth_1.checkAuthentication, (req, res) => {
    if (req.isAuthenticated) {
        res.json({ message: 'Authenticated' });
    }
    else {
        res.json({ message: 'Not Authenticated' });
    }
});
exports.default = router;
