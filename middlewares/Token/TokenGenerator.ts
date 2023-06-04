// Secret
import SECRET_KEY from './Secret';

const dotenv = require('dotenv')

dotenv.config()

// JWT Library
const jwt: any = require('jsonwebtoken');

const generateToken = (email: string, role: number): string => {
	return jwt.sign({email: email, role: role }, process.env.SECRET, {expiresIn: '1 day'});
}

export default generateToken;

