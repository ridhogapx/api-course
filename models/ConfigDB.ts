const { Sequelize} = require('sequelize')

const Orm:any = new Sequelize(
	'course_api',
	'root',
	'',
	{
		host: 'localhost',
		dialect: 'mysql'
	});

export default Orm