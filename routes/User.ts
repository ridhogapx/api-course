const {Sequelize: ORMUser, DataTypes: TypeUser} = require('sequelize');
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

interface ResponseForChange {
	message: string,
	success: boolean,
	status: number,
};

export const checkUserModel = async(): Promise<void> => {
	try {
		await ormUser.authenticate();
		console.log(`Connection to database is successfull`);
	} catch(err) {
		console.log(`Failed to connect database ${err}`);
	}
}

export const syncUserModel = async(): Promise<void> => {
	try {
		await ormUser.sync();
		console.log(`Table sus_users is created`);
	} catch (err) {
		console.log(`Can't create table sus_users`);
	}
}

export const registerUser = async(req: any, res: any): Promise<void> => {
	try {

	const successResponse: ResponseForChange = {
			message: 'Pendaftaran berhasil!',
			success: true,
			status: 201
			}

	const hash = await bcrypt.hash(req.body.password, salt);

	await User.create({
		email: req.body.email,
		password: hash,
		name: req.body.name,
		gender: req.body.gender,
	});
	res.end(JSON.stringify(successResponse, null, 2));
	} catch(err) {
		const failResponse: ResponseForChange = {
			message: `${err}`,
			success: false,
			status: 403,
		}
		res.end(JSON.stringify(failResponse, null, 2));
	}
} 
