const { body }: any = require('express-validator');

// Todo: Fix validator

const validateRegister: any[] = [
	body('email').trim().escape().notEmpty().withMessage('Tidak boleh kosong!')
	.isEmail().withMessage('Email tidak valid!'),
	body('name').trim().escape().notEmpty().withMessage('Tidak boleh kosong!'),
	body('password').trim().escape().notEmpty().withMessage('Tidak boleh kosong!')
	.isLength({min: 8}).withMessage('Password harus terdiri dari 8 karakter!')
	.matches('[0-9]').withMessage('Password harus terdiri dari angka!'),
]

export default validateRegister;

