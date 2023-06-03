import { Course } from './Schema'
import ResponseAPI from '../../interfaces/ResponseAPI'
import checkID from '../../middlewares/ValidateDB/ValidateID'

const deleteCourse = async(req: any, res: any): Promise<any> => {
	const id = req.params.id
	const validate = await checkID(id)

	if(!validate) {
		const notFound: ResponseAPI = {
			message: `Data tidak ditemukan!`,
			success: false,
			status: 404,
			data: []
		}

		return res.json(notFound)
	}

	await Course.destroy({
		where: {
			id: id
		}
	})

	const successResponse: ResponseAPI = {
		message: 'Berhasil menghapus data!',
		success: true,
		status: 201,
		data: []
	}

	return res.json(successResponse)
}

export default deleteCourse