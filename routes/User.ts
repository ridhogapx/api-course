const { Sequelize: ORMUser, DataTypes: TypeUser } = require('sequelize');

// For hashing password
const bcrypt = require('bcrypt');

const ormUser = new ORMUser(
	'course_api',
	'root',
	'',
	{
		host: 'localhost',
		dialect: 'mysql'
	});

// Salt rounds
const salt: number = 10;

const User = ormUser.define('sus_users', {
	email: {
		type: TypeUser.STRING(20),
		allowNull: false,
	},
	password: {
		type: TypeUser.STRING(255),
		allowNull: false,
	},
	name: {
		type: TypeUser.STRING(50),
		allowNull: false,
	},
	gender: {
		type: TypeUser.STRING(10),
		allowNull: false,
	},
	role: {
		type: TypeUser.INTEGER(2),
		allowNull: false,
		defaultValue: 0
	}
})

interface ResponseAPI {
	message: string,
	success: boolean,
	status: number,
	data: any[]
};

export const checkUserModel = async(): Promise<void> => {
	try {
		await ormUser.authenticate();
	} catch(err) {
		console.log(`Failed to connect database ${err}`);
	}
}

export const syncUserModel = async(): Promise<void> => {
	try {
		await ormUser.sync();
	} catch (err) {
		console.log(`Can't create table sus_users`);
	}
}

export const registerUser = async(req: any, res: any): Promise<void> => {

	/* Validate email. Checking if already use in database...  */
	const validator = await User.findAll({
		where: {
			email: req.body.email
		}
	});

	if(!validator.length) {
		const successResponse: ResponseAPI = {
			message: 'Pendaftaran berhasil!',
			success: true,
			status: 201,
			data: []
		}

		const hash = await bcrypt.hash(req.body.password, salt);

		await User.create({
			email: req.body.email,
			password: hash,
			name: req.body.name,
			gender: req.body.gender,
		});

		res.end(JSON.stringify(successResponse, null, 2));
	} else {
		const failResponse: ResponseAPI = {
			message: 'Maaf, email sudah digunakan!',
			success: false,
			status: 403,
			data: []
		}
		res.end(JSON.stringify(failResponse, null, 2));
	}

}

export const Login = async(req: any, res: any): Promise<void> => {
	// Auth system
	const validator = await User.findAll({
		where: {
			email: req.body.email
		}
	});

	if(validator.length) {

		const result: ResponseAPI = {
			message: 'Berhasil',
			success: true,
			status: 200,
			data: [{
				password: validator[0].password
			}]
		};


		res.end(JSON.stringify(result, null, 2));
	} else {
		const unregisteredEmail: ResponseAPI = {
			message: 'Maaf, Email tidak terdaftar!',
			success: false,
			status: 404,
			data: []
		};

		res.end(JSON.stringify(unregisteredEmail, null, 2));
	}
	
}


