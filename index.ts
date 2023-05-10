import express, { Express } from 'express';
import { checkUserModel, syncUserModel, registerUser } from './routes/User';

const bodyParser = require('body-parser');

// Body Parser
const urlEncodedParser:any = bodyParser.urlencoded({extended: false});

const app: Express = express();

// Port number
const port: number = 3000;

checkUserModel();
syncUserModel();

app.post('/api/signup', urlEncodedParser , registerUser);

app.listen(port, ():void => {
	console.log(`Server is running on port ${port}`);
});

