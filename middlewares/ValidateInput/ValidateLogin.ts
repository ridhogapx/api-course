// Validator module
const { body }: any = require('express-validator');

// Validating email
const validateLogin: any[] = [
								body('email').trim().notEmpty().withMessage('Tidak boleh kosong!')
								.isEmail().withMessage('Email tidak valid!'),
								body('password').trim().notEmpty().withMessage('Tidak boleh kosong!')
								]

export default validateLogin;

