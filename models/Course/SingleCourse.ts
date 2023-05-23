import { Course } from './Schema';
import ResponseAPI from '../../interfaces/ResponseAPI';

const getSingleCourse = async(req: any, res: any): Promise<any> => {
	const id = req.params.id

	try {
		const singleCourse = await Course.findAll({
			where: {
				id: id
			}
		})

		const successResponse: ResponseAPI = {
			message: 'Berhasil mendapatkan data',
			success: true,
			status: 200,
			data: singleCourse
		}

		res.json(successResponse);

	} catch(err) {
		const failResponse: ResponseAPI = {
			message: `Data dengan id: ${id} tidak ditemukan!`,
			success: false,
			status: 404,
			data: []
		}
		res.json(failResponse);
	}
}
export default getSingleCourse;