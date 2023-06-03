"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express 
const express_1 = __importDefault(require("express"));
// Validator middleware
const ValidateLogin_1 = __importDefault(require("./middlewares/ValidateInput/ValidateLogin"));
const ValidateRegister_1 = __importDefault(require("./middlewares/ValidateInput/ValidateRegister"));
const ValidateCourse_1 = __importDefault(require("./middlewares/ValidateInput/ValidateCourse"));
// User Model
const Schema_1 = require("./models/User/Schema");
const Login_1 = __importDefault(require("./models/User/Login"));
const Register_1 = __importDefault(require("./models/User/Register"));
// Course Model
const Schema_2 = require("./models/Course/Schema");
const SetupCourse_1 = __importDefault(require("./models/Course/SetupCourse"));
const AddCourse_1 = __importDefault(require("./models/Course/AddCourse"));
const AllCourse_1 = __importDefault(require("./models/Course/AllCourse"));
const SingleCourse_1 = __importDefault(require("./models/Course/SingleCourse"));
const UpdateCourse_1 = __importDefault(require("./models/Course/UpdateCourse"));
const DeleteCourse_1 = __importDefault(require("./models/Course/DeleteCourse"));
// Auth Token
const Auth_1 = __importDefault(require("./routes/Auth"));
// Auth Google
const Google_1 = __importDefault(require("./routes/Google"));
const GoogleCallback_1 = __importDefault(require("./routes/GoogleCallback"));
// Cors for using resource in cross domain
const cors = require('cors');
// Passport for Google auth
const passport = require('passport');
// Module for parsing payload
const bodyParser = require('body-parser');
// Validation result
const { validationResult } = require('express-validator');
// HTTP Payload Parser
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
// Initialize Express
const app = (0, express_1.default)();
// Port number
const port = 3001;
// Defining Model Database
(0, Schema_1.checkUserModel)();
(0, Schema_1.syncUserModel)();
(0, Schema_2.checkCourseModel)();
(0, Schema_2.syncCourseModel)();
// Using payload parser in Express
app.use(urlEncodedParser);
// Using Cors middleware
app.use(cors());
// Route for User
app.post('/api/register', ValidateRegister_1.default, Register_1.default);
app.post('/api/login', ValidateLogin_1.default, Login_1.default);
app.get('/api/auth/:token', Auth_1.default);
// Initialize Google API Config
(0, Google_1.default)(passport);
// Route for Google Auth
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
app.get('/auth/google/callback', passport.authenticate('google', { session: false }), GoogleCallback_1.default);
// Route For starter data 
app.get('/api/course/setup', SetupCourse_1.default);
// Route for Course
app.post('/api/course', ValidateCourse_1.default, AddCourse_1.default);
app.get('/api/course', AllCourse_1.default);
app.get('/api/course/:id', SingleCourse_1.default);
app.put('/api/course/:id', ValidateCourse_1.default, UpdateCourse_1.default);
app.delete('/api/course/:id', DeleteCourse_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
