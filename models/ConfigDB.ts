const { Sequelize} = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

const Orm = new Sequelize(
	'course_api',
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		dialect: 'mysql'
	});

export default Orm