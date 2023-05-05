"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mysql = require('mysql');
exports.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'course_api'
});
