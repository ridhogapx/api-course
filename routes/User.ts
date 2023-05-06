import { connection } from '../config/DBConfig';
import express, { Express, Request, Response } from 'express';

// For hasing password
const bcrypt = require('bcrypt');

// Initialize App
const app: Express = express();

// Salt rounds
const salt: number = 10;

interface ResponseForChange {
	message: string,
	success: boolean
};


export const RegisterUser = (req: Request, res: Response): void => {
	connection.connect();
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
}
