const { Sequelize: ORMUser, DataTypes: TypeUser } = require('sequelize');
const dotenv: any = require('dotenv');
const jwt: any = require('jsonwebtoken');
const { validationResult }: any = require('express-validator');
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

// Initialize config .env
dotenv.config();

/* Rahasia gwehj */
const SECRET_KEY: any = process.env.SECRET || 'AMOGUSECRETSUSSYBAKA@6969#23';

const generateToken = (email: string): string => {
	return jwt.sign({email: email}, SECRET_KEY, {expiresIn: '1 day'})
}

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

export const Register = async(req: any, res: any): Promise<any> => {
	// Validator input
	const result:any  = validationResult(req);

	if(!result.isEmpty()) {
		return res.json({
			errors: result.array()
		})
	}


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

		return res.json(successResponse);
	} else {
		const failResponse: ResponseAPI = {
			message: 'Maaf, akun anda sudah terdaftar!',
			success: false,
			status: 403,
			data: []
		}
		return res.json(failResponse);
	}

}


// Route Login
export const Login = async(req: any, res: any): Promise<any> => {
	const emailInput: string = req.body.email;
	const passInput: string = req.body.password;
	const result: any = validationResult(req);

	// Validating input 
	if(!result.isEmpty()) {
		return res.json({
			errors: result.array()
		});

	}

	// Auth system
	const validator = await User.findAll({
		where: {
			email: emailInput
		}
	});

	if(validator.length) {
		try {
			const validatePass = await bcrypt.compare(passInput, validator[0].password);

			if(validatePass) {
				const token: string = generateToken(emailInput);
				const successResponse: ResponseAPI = {
						message: 'Berhasil masuk.',
						success: true,
						status: 200,
						data: [
							{
								token: token
							}
						]
					}
				return res.json(successResponse)
			} else {
				const wrongPassword: ResponseAPI = {
						message: 'Password salah!',
						success: false,
						status: 404,
						data: [],
					}
				return res.json(wrongPassword);
			}

		} catch (err) {
			console.log(err);
		}

	} else {
		const unregisteredEmail: ResponseAPI = {
			message: 'Maaf, Email tidak terdaftar!',
			success: false,
			status: 404,
			data: []
		};

		return res.json(unregisteredEmail);
	}	
}

/* 
Todo: 
1. Dynamic error response 
2. Validator
3. Cors?
4. Adding new feature: User study progress
5. Course playlist
 */

