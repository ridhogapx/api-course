// Express 
import express, { Express } from 'express';
// Validator middleware
import validateLogin from './middlewares/ValidateLogin';
import validateRegister from './middlewares/ValidateRegister';

// User Model
import { checkUserModel, syncUserModel} from './models/User/ConfigUserModel';


// Module for parsing payload
const bodyParser: any = require('body-parser');
// Validation result
const { validationResult }: any = require('express-validator');

// HTTP Payload Parser
const urlEncodedParser:any = bodyParser.urlencoded({extended: false});

// Initialize Express
const app: Express = express();

// Port number
const port: number = 3000;

// Defining Model Database
checkUserModel();
syncUserModel();

// Using payload parser in Express
app.use(urlEncodedParser);

// API Route
app.post('/api/register' , validateRegister ,Register);
app.post('/api/login', validateLogin ,Login);

app.listen(port, ():void => {
	console.log(`Server is running on port ${port}`);
});

