import { connection } from '../config/DBConfig';
import express, { Express, Request, Response } from 'express';

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// Initialize App
const app: Express = express();
// Body Parser
const urlEncodedParser:any = bodyParser.urlencoded({extended: false});
// Salt for hashing password
const salt: number = 10;

connection.connect();

interface ResponseForChange {
	message: string,
	success: boolean
};

export const RegisterUser = (): void => {
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

}