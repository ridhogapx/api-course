// Express 
import express, { Express } from 'express';

// Validator middleware
import validateLogin from './middlewares/ValidateInput/ValidateLogin';
import validateRegister from './middlewares/ValidateInput/ValidateRegister';

// User Model
import { checkUserModel, syncUserModel} from './models/User/Schema';
import Login from './models/User/Login';
import Register from './models/User/Register';

// Course Model
import { checkCourseModel } from './models/Course/Schema';

// Auth Token
import Auth from './routes/Auth';

// Cors for using resource in cross domain
const cors: any = require('cors');

// Module for parsing payload
const bodyParser: any = require('body-parser');
const multer: any = require('multer');

// Validation result
const { validationResult, syncCourseModel }: any = require('express-validator');

// HTTP Payload Parser
const urlEncodedParser:any = bodyParser.urlencoded({extended: false});
const jsonPayload: any = bodyParser.json();

// Initialize Express
const app: Express = express();

// Port number
const port: number = 3000;

// Defining Model Database
checkUserModel();
syncUserModel();
checkCourseModel();
syncCourseModel();

// Using payload parser in Express
app.use(urlEncodedParser);
app.use(jsonPayload);

// Using Cors middleware
app.use(cors());

// API Route
app.post('/api/register' , validateRegister, Register);
app.post('/api/login', validateLogin, Login);
app.get('/api/auth/:token', Auth)

app.listen(port, ():void => {
	console.log(`Server is running on port ${port}`);
});

