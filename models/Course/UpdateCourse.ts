import { Course } from './Schema'
import ResponseAPI from '../../interfaces/ResponseAPI'
import checkID from '../../middlewares/ValidateDB/ValidateID'

const { validationResult } = require('express-validator')

const updateCourse = async(req: any, res:any): Promise <any> => {
	const result = validationResult(req)
	const id = req.params.id

	if(!result.isEmpty()) {
		return res.json({
			errors: result.array()
		})
	}

	const validateID: boolean = await checkID(id)

	if(!validateID) {
		const notFoundID: ResponseAPI = {
			message: `Course dengan id ${id} tidak ditemukan`,
			success: false,
			status: 404,
			data: []
		};

		return res.json(notFoundID)
	}

	const YT_URL: any = req.body.yt_url
	const valid_url: any = YT_URL.replaceAll('&#x2F;', '/')

	const successResponse: ResponseAPI = {
			message: 'Berhasil merubah data!',
			success: true,
			status: 201,
			data: [],
		}

	const failResponse: ResponseAPI = {
		message: 'Gagal merubah data!',
		success: false,
		status: 403,
		data: [],
	}

	try{
		await Course.update({
			title: req.body.title,
			yt_url: valid_url
		}, {
			where: {
				id: id
			}
		})

		return res.json(successResponse)
	} catch(err) {
		return res.json(failResponse)
	}
}

export default updateCourse