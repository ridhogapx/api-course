import express, { Express, Request, Response } from 'express';
 
const mysql = require('mysql');
const bodyParser = require('body-parser');

const urlEncodedParser:any = bodyParser.urlencoded({extended: false});


const connection: any = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'course_api'
});


const app: Express = express();
const port: number = 3000;

interface APIResponse {
	message: string,
	success: boolean
	data: Data[]
};

interface Data {
	email: string,
	password: string
}

app.post('/api/user', urlEncodedParser , (req: Request, res: Response):void => {	
	const response: APIResponse = {
		message: `Success for adding user`,
		success: true,
		data: [
			{
				email: req.body.email,
				password: req.body.password
			}
		]
	}

	res.end(JSON.stringify(response));
});

app.listen(port, ():void => {
	console.log(`Server is running on port ${port}`);
});

connection.connect();

connection.end();

