import { Request, Response } from 'express'
import { GoogleSchema } from '../models/Google/Schema'
import ResponseAPI from '../interfaces/ResponseAPI'
import generateToken from '../middlewares/Token/TokenGenerator'

const GoogleProtected = async(req: Request | any, res: Response): Promise<Response | undefined> => {
	const finder = await GoogleSchema.findAll({
		where: {
			email: req.user.email
		}
	})

	if(finder.length) {
		const role: number = finder[0].role
		const email: string = finder[0].email
		const token: string = generateToken(email,role)

		const response: ResponseAPI = {
			message: 'Berhasil login',
			success: true,
			status: 201,
			data: []
		}

		return res.json(response)

		// return res.redirect('http://localhost:5173/' + token)
		
	} else {
		await GoogleSchema.create({
			email: req.user.email,
			name: req.user.displayName
		})
	}

}

export default GoogleProtected