const dotenv: any = require('dotenv');
const jwt: any = require('jsonwebtoken');
const { validationResult }: any = require('express-validator');

// For hashing password
const bcrypt: any = require('bcrypt');

// Salt rounds
const salt: number = 10;

interface ResponseAPI {
	message: string,
	success: boolean,
	status: number,
	data: any[]
};

// Initialize config .env
dotenv.config();

/* Rahasia gwehj */
const SECRET_KEY: any = process.env.SECRET || 'AMOGUSECRETSUSSYBAKA@6969#23';

const generateToken = (email: string): string => {
	return jwt.sign({email: email}, SECRET_KEY, {expiresIn: '1 day'})
}






/* 
Todo: 
1. Dynamic error response 
2. Validator
3. Cors?
4. Adding new feature: User study progress
5. Course playlist
 */

