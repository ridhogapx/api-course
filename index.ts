import express, { Express, Request, Response } from 'express';
import { connection } from './config/DBConfig';

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// Body Parser
const urlEncodedParser:any = bodyParser.urlencoded({extended: false});

// Salt for hashing password
const salt: number = 10;

const app: Express = express();

// Port number
const port: number = 3000;

interface ResponseForChange {
	message: string,
	success: boolean
};

connection.connect();

app.post('/api/user', urlEncodedParser , (req: Request, res: Response):void => {	
	const response: ResponseForChange = {
		message: `Success for adding user`,
		success: true,
	}

	let pass: string = req.body.password;

	bcrypt
		.hash(pass,salt)
		.then((hash: any): void => {
			connection.query(`INSERT INTO sus_users (email, password, name, gender) VALUES ('${req.body.email}', '${hash}' , '${req.body.name}', '${req.body.gender}')`, (err:any, rows: any, fields: any) => {
				if(err) {
					throw err;
					connection.end();
				} else {
					res.end(JSON.stringify(response));
				}
	});
		}).catch((err: any): void => {
			console.log(err);
		})
	
});

app.listen(port, ():void => {
	console.log(`Server is running on port ${port}`);
});



