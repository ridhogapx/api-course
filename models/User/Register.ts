import { Request, Response } from "express"
import { User } from './Schema';
import ResponseAPI from '../../interfaces/ResponseAPI'
import generateToken from '../../middlewares/Token/TokenGenerator'
import Model from '../../types/Model'
import Error from '../../interfaces/Error'

const { validationResult }: any = require('express-validator')

// For hashing password
const bcrypt = require('bcrypt')

// Salt rounds
const salt: number = 10
// Route Register
const Register: Model = async(req: Request, res: Response): Promise<Response | undefined > => {
	const email: string = req.body.email

	// Validator input
	const result  = validationResult(req)

	if(!result.isEmpty()) {
		const validationError: Error = result.array()

		return res.json({
			errors: validationError
		})
	}


	/* Validate email. Checking if already use in database...  */
	const validator = await User.findAll({
		where: {
			email: email
		}
	})

	if(!validator.length) {
		const successResponse: ResponseAPI = {
			message: 'Pendaftaran berhasil!',
			success: true,
			status: 201,
			data: []
		}

		const hash = await bcrypt.hash(req.body.password, salt);

		await User.create({
			email: email,
			password: hash,
			name: req.body.name,
		})

		return res.json(successResponse)
	} else {
		const failResponse: ResponseAPI = {
			message: 'Maaf, akun anda sudah terdaftar!',
			success: false,
			status: 403,
			data: []
		}
		return res.json(failResponse)
	}

}

export default Register
