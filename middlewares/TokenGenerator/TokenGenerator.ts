const jwt: any = require('jsonwebtoken');

/* Rahasia gwehj */
const SECRET_KEY: any =  'AMOGUSECRETSUSSYBAKA@6969#23';

const generateToken = (email: string): string => {
	return jwt.sign({email: email}, SECRET_KEY, {expiresIn: '1 day'})
}

export default generateToken;

