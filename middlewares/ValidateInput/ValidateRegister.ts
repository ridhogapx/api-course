const { body }: any = require('express-validator');

// Todo: Fix validator

const validateRegister: any[] = [
	body('email').trim().escape().notEmpty().withMessage('Email tidak boleh kosong!')
	.isEmail().withMessage('Email tidak valid!'),
	body('name').trim().escape().notEmpty().withMessage('Nama tidak boleh kosong!'),
	body('password').trim().escape().notEmpty().withMessage('Password tidak boleh kosong!')
	.isLength({min: 8}).withMessage('Password harus terdiri dari 8 karakter!')
	.matches('[0-9]').withMessage('Password harus terdiri dari angka!'),
	body('confirmPw').trim().escape().notEmpty().withMessage('Kolom konfirmasi password tidak boleh kosong!')
	.custom((value: any, { req }: any): any => {
		if(value == req.body.password) {
			return true;
		} else {
			return false;
		}
	}).withMessage('Mohon konfirmasikan password anda!')
]

export default validateRegister;

