// Import interfaces TS
import ResponseAPI from '../interfaces/ResponseAPI'

// Dotenv for accessing sensitive data
const dotenv = require('dotenv')

dotenv.config()

// JWT Library
const jwt: any = require('jsonwebtoken')

const Auth = (req: any, res: any): void => {
	const token = req.params.token

	try {
		// Verify token user
		const decoded:any = jwt.verify(token, process.env.SECRET);
		const success: ResponseAPI = {
			message: 'Authentikasi berhasil',
			success: true,
			status: 200,
			data: [decoded]
		}

		res.json(success);
	} catch(err) {
		const fail: ResponseAPI = {
			message: 'Token tidak valid',
			success: false,
			status: 403,
			data: []
		}
		res.json(fail)
	}
	
} 

export default Auth