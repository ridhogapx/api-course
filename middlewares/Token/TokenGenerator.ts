// Secret
import SECRET_KEY from './Secret';

// JWT Library
const jwt: any = require('jsonwebtoken');

const generateToken = (email: string, role: number): string => {
	return jwt.sign({email: email, role: role }, SECRET_KEY, {expiresIn: '1 day'});
}

export default generateToken;

