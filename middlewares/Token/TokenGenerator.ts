// Secret
import SECRET_KEY from './Secret';

// JWT Library
const jwt: any = require('jsonwebtoken');

const generateToken = (email: string): string => {
	return jwt.sign({email: email}, SECRET_KEY, {expiresIn: '1 day'});
}

export default generateToken;

