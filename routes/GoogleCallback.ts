import { Request, Response } from 'express'
import { User } from '../models/User/Schema'
import ResponseAPI from '../interfaces/ResponseAPI'
import generateToken from '../middlewares/Token/TokenGenerator'

const GoogleCallback = (req: Request, res: Response): Response => {
	

	const responseCallback: ResponseAPI = {
		message: 'Berhasil login...',
		success: true,
		status: 200,
		data: []
	}

	return res.json(responseCallback)
}

export default GoogleCallback