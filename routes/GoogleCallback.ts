import { Request, Response } from 'express'
import ResponseAPI from '../interfaces/ResponseAPI'

const GoogleCallback = (req: Request, res: Response): void => {
	const responseCallback: ResponseAPI = {
		message: 'Berhasil login...',
		success: true,
		status: 200,
		data: []
	}

	res.json(responseCallback)
}

export default GoogleCallback