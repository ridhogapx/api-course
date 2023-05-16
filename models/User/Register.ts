import { User } from './ConfigUserModel';
import ResponseAPI from '../../interfaces/ResponseAPI';
const { validationResult }: any = require('express-validator');


// For hashing password
const bcrypt: any = require('bcrypt');

// Salt rounds
const salt: number = 10;
// Route Register
const Register = async(req: any, res: any): Promise<any> => {
	// Validator input
	const result:any  = validationResult(req);

	if(!result.isEmpty()) {
		return res.json({
			errors: result.array()
		})
	}


	/* Validate email. Checking if already use in database...  */
	const validator = await User.findAll({
		where: {
			email: req.body.email
		}
	});

	if(!validator.length) {
		const successResponse: ResponseAPI = {
			message: 'Pendaftaran berhasil!',
			success: true,
			status: 201,
			data: []
		}

		const hash = await bcrypt.hash(req.body.password, salt);

		await User.create({
			email: req.body.email,
			password: hash,
			name: req.body.name,
		});

		return res.json(successResponse);
	} else {
		const failResponse: ResponseAPI = {
			message: 'Maaf, akun anda sudah terdaftar!',
			success: false,
			status: 403,
			data: []
		}
		return res.json(failResponse);
	}

}

export default Register;
