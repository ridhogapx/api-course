const { body }: any = require('express-validator')

const validateCourse: any = [
		body('title').trim().escape().notEmpty().withMessage('Kolom judul tidak boleh kosong!'),
		body('yt_url').trim().escape().notEmpty().withMessage('Kolom url tidak boleh kosong!')
];

export default validateCourse;

