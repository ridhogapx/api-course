import express, { Express } from 'express';
import { connection } from './config/DBConfig';
import { RegisterUser } from './routes/User';

const bodyParser = require('body-parser');

// Body Parser
const urlEncodedParser:any = bodyParser.urlencoded({extended: false});

const app: Express = express();

// Port number
const port: number = 3000;

app.post('/api/signup', urlEncodedParser , RegisterUser);

app.listen(port, ():void => {
	console.log(`Server is running on port ${port}`);
});

