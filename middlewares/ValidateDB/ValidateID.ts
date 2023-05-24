import { Course } from '../../models/Course/Schema';

const checkID = async(id: number): Promise<boolean> => {
	const Checker = await Course.findAll({
		where: {
			id: id
		}
	});

// Checking if Course is exist then return true. If not then return false
	if(!Checker.length) {
		return true;
	} else {
		return false;
	}
}

export default checkID;