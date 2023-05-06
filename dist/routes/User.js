"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = void 0;
const DBConfig_1 = require("../config/DBConfig");
const express_1 = __importDefault(require("express"));
// For hasing password
const bcrypt = require('bcrypt');
// Initialize App
const app = (0, express_1.default)();
// Salt rounds
const salt = 10;
;
const RegisterUser = (req, res) => {
    DBConfig_1.connection.connect();
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
};
exports.RegisterUser = RegisterUser;
