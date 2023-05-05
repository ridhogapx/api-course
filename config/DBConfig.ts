const mysql = require('mysql');

export const connection: any = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'course_api'
});