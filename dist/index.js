"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express 
const express_1 = __importDefault(require("express"));
// Validator middleware
const ValidateLogin_1 = __importDefault(require("./middlewares/ValidateLogin"));
const ValidateRegister_1 = __importDefault(require("./middlewares/ValidateRegister"));
// User controller
const User_1 = require("./routes/User");
// Module for parsing payload
const bodyParser = require('body-parser');
// Validation result
const { validationResult } = require('express-validator');
// HTTP Payload Parser
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
// Initialize Express
const app = (0, express_1.default)();
// Port number
const port = 3000;
// Defining Model Database
(0, User_1.checkUserModel)();
(0, User_1.syncUserModel)();
// Using payload parser in Express
app.use(urlEncodedParser);
// API Route
app.post('/api/register', ValidateRegister_1.default, User_1.Register);
app.post('/api/login', ValidateLogin_1.default, User_1.Login);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
