import { Request, Response } from "express"
import { User } from './Schema'
import generateToken from '../../middlewares/Token/TokenGenerator'
import ResponseAPI from '../../interfaces/ResponseAPI'

const { validationResult }: any = require('express-validator')

const bcrypt: any = require('bcrypt')

// Route Login
const Login = async(req: Request, res: Response): Promise<any> => {
	const emailInput: string = req.body.email
	const passInput: string = req.body.password
	const result: any = validationResult(req)

	// Validating input 
	if(!result.isEmpty()) {
		return res.json({
			errors: result.array()
		})

	}

	// Auth system
	const validator = await User.findAll({
		where: {
			email: emailInput
		}
	})

	const role: number = validator[0].role

	if(validator.length) {
		try {
			const validatePass = await bcrypt.compare(passInput, validator[0].password)

			if(validatePass) {
				const token: string = generateToken(emailInput, role)
				const successResponse: ResponseAPI = {
						message: 'Berhasil masuk.',
						success: true,
						status: 200,
						data: [
							{
								token: token,
							}
						]
					}

				return res.json(successResponse)
			} else {
				const wrongPassword: ResponseAPI = {
						message: 'Password salah!',
						success: false,
						status: 404,
						data: [],
					}
				return res.json(wrongPassword)
			}

		} catch (err) {
			console.log(err)
		}

	} else {
		const unregisteredEmail: ResponseAPI = {
			message: 'Maaf, Email tidak terdaftar!',
			success: false,
			status: 404,
			data: []
		}

		return res.json(unregisteredEmail)
	}	
}

export default Login