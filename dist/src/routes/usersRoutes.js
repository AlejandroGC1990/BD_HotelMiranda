"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const usersControllers_1 = require("../controllers/usersControllers");
const router = (0, express_1.Router)();
router.get('/', auth_1.verifyToken, usersControllers_1.getAllUsers);
router.get('/:id', auth_1.verifyToken, usersControllers_1.getUsersById);
router.post('/', auth_1.verifyToken, usersControllers_1.createUser);
router.put('/:id', auth_1.verifyToken, usersControllers_1.updateUser);
router.delete('/:id', auth_1.verifyToken, usersControllers_1.removeUser);
exports.default = router;
