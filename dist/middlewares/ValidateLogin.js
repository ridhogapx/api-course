"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Validator module
const { body } = require('express-validator');
// Validating email
const validateLogin = [
    body('email').trim().notEmpty().withMessage('Tidak boleh kosong!')
        .isEmail().withMessage('Email tidak valid!')
];
exports.default = validateLogin;
