const { Sequelize: ORMUser, DataTypes: TypeUser } = require('sequelize');

const ormUser = new ORMUser(
	'course_api',
	'root',
	'',
	{
		host: 'localhost',
		dialect: 'mysql'
	});

export const User: any = ormUser.define('sus_users', {
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
	role: {
		type: TypeUser.INTEGER(2),
		allowNull: false,
		defaultValue: 0
	}
})

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