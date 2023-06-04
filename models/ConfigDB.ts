const { Sequelize} = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

const Orm = new Sequelize(
	'course_api',
	'root',
	'DBRidho-Tech',
	{
		host: process.env.DB_HOST,
		dialect: 'mysql'
	});

export default Orm