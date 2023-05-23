// Validator module
const { body }: any = require('express-validator');

// Validating email
const validateLogin: any[] = [
								body('email').trim().escape().notEmpty().withMessage('Email tidak boleh kosong!')
								.isEmail().withMessage('Email tidak valid!'),
								body('password').trim().escape().notEmpty().withMessage('Password tidak boleh kosong!')
								]

export default validateLogin;

