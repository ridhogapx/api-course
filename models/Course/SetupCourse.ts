import { Course } from './Schema';
import Setup from './Setup';

const SetupCourse = async(req: any, res: any):Promise <any> => {
	Setup.map((course) => {
		const url:any = course.yt_url;
		const valid:any = url.replaceAll('&#x2F;', '/')

		 Course.create({
		 	title: course.title,
		 	yt_url: valid
		 })

	})

	res.json({
		 	message: 'Berhasil menambahkan data serentak!',
		 	success: true
		 });
}

export default SetupCourse;