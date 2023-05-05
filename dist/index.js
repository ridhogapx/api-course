"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DBConfig_1 = require("./config/DBConfig");
const TestRoute_1 = __importDefault(require("./routes/TestRoute"));
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
// Body Parser
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
// Salt for hashing password
const salt = 10;
const app = (0, express_1.default)();
// Port number
const port = 3000;
;
DBConfig_1.connection.connect();
app.post('/api/user', urlEncodedParser, (req, res) => {
    const response = {
        message: `Success for adding user`,
        success: true,
    };
    let pass = req.body.password;
    bcrypt
        .hash(pass, salt)
        .then((hash) => {
        DBConfig_1.connection.query(`INSERT INTO sus_users (email, password, name, gender) VALUES ('${req.body.email}', '${hash}' , '${req.body.name}', '${req.body.gender}')`, (err, rows, fields) => {
            if (err) {
                throw err;
                DBConfig_1.connection.end();
            }
            else {
                res.end(JSON.stringify(response));
            }
        });
    }).catch((err) => {
        console.log(err);
    });
});
(0, TestRoute_1.default)();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
