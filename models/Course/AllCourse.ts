import { Course } from './Schema';
import ResponseAPI from '../../interfaces/ResponseAPI';

const getAllCourse = async(req: any, res:any): Promise<any> => {
	try {
		const allCourse = await Course.findAll();
		const successResponse: ResponseAPI = {
			message: 'Berhasil mendapatkan data materi!',
			success: true,
			status: 200,
			data: allCourse
		}

		return res.json(successResponse);
	} catch(err) {
		const failResponse: ResponseAPI = {
			message: 'Data tidak ditemukan!',
			success: false,
			status: 404,
			data: []
		}
		return res.json(failResponse);
	}
}

export default getAllCourse;