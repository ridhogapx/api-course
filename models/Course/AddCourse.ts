import { Course } from './Schema';
import ResponseAPI from '../../interfaces/ResponseAPI';

const { validationResult }:any = require('express-validator');

const AddCourse = async(req: any, res:any): Promise <any> => {
	const result: any = validationResult(req);

	const successResponse: ResponseAPI = {
		message: 'Berhasil menambahkan materi!',
		success: true,
		status: 201,
		data: []
	}

	if(!result.isEmpty()) {
		return res.json({
			errors: result.array()
		});
	}

	await Course.create({
		title: req.body.title,
		yt_url: req.body.yt_url
	})

	res.json(successResponse);

}

export default AddCourse;
