import { Course } from './Schema';
import ResponseAPI from '../../interfaces/ResponseAPI';

const { validationResult }:any = require('express-validator');

const AddCourse = async(req: any, res:any): Promise <any> => {
	const result: any = validationResult(req);

	const successResponse: ResponseAPI = {
		message: 'Berhasil menambahkan materi!',
		success: true,
		status: 201,
		data: [{
			url: decodeURI(req.body.yt_url)
		}]
	}


	if(!result.isEmpty()) {
		return res.json({
			errors: result.array()
		});
	}

	// Disable dulu gak sih 
	
	// await Course.create({
	// 	title: req.body.title,
	// 	yt_url: req.body.yt_url
	// })
	res.set({'content-type': 'application/json; charset=utf-8'})

	res.json(successResponse);

}

export default AddCourse;
