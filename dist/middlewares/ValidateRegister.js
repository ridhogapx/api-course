"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { body } = require('express-validator');
const validateRegister = [
    body('password').trim().notEmpty().withMessage('Tidak boleh kosong!')
        .isLength({ min: 8 }).withMessage('Password harus terdiri dari 8 karakter!')
        .matches('[0-9]').withMessage('Password harus terdiri dari angka!'),
    body('name').trim().notEmpty().withMessage('Tidak boleh kosong!'),
    body('gender').trim().notEmpty().withMessage('Tidak boleh kosong!')
];
exports.default = validateRegister;
