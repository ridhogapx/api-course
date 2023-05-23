import { Course } from './Schema';
import ResponseAPI from '../../interfaces/ResponseAPI';

const { validationResult } = require('express-validator');

const updateCourse = async(req: any, res:any): Promise <any> => {
	const result = validationResult(req);

	try{
		// Gotta finish this
	} catch(err) {

	}
}