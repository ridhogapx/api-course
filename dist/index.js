"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql = require('mysql');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'course_api'
});
const app = (0, express_1.default)();
const port = 3000;
;
app.post('/api/user', urlEncodedParser, (req, res) => {
    const response = {
        message: `Success for adding user`,
        success: true,
        data: [
            {
                email: req.body.email,
                password: req.body.password
            }
        ]
    };
    res.end(JSON.stringify(response));
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
connection.connect();
connection.end();
