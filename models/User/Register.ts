import { User } from './Schema';
import ResponseAPI from '../../interfaces/ResponseAPI';
import generateToken from '../../middlewares/Token/TokenGenerator';
const { validationResult }: any = require('express-validator');


// For hashing password
const bcrypt: any = require('bcrypt');

// Salt rounds
const salt: number = 10;
// Route Register
const Register = async(req: any, res: any): Promise<any> => {
	const email: string = req.body.email;

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
			email: email
		}
	});

	const role: number = validator[0].role;

	if(!validator.length) {
		const token: string = generateToken(email,role);

		const successResponse: ResponseAPI = {
			message: 'Pendaftaran berhasil!',
			success: true,
			status: 201,
			data: [
				{
					token: token
				}
			]
		}

		const hash = await bcrypt.hash(req.body.password, salt);

		await User.create({
			email: email,
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
