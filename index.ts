import express, { Express } from 'express';
import { checkUserModel, syncUserModel, registerUser, Login } from './routes/User';

const bodyParser = require('body-parser');

// Body Parser
const urlEncodedParser:any = bodyParser.urlencoded({extended: false});
const app: Express = express();

// Port number
const port: number = 3000;

// Defining Model Database
checkUserModel();
syncUserModel();

// API Route
app.post('/api/register', urlEncodedParser , registerUser);
app.post('/api/login', urlEncodedParser, Login);

app.listen(port, ():void => {
	console.log(`Server is running on port ${port}`);
});
