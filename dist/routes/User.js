"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.registerUser = exports.syncUserModel = exports.checkUserModel = void 0;
const { Sequelize: ORMUser, DataTypes: TypeUser } = require('sequelize');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
// For hashing password
const bcrypt = require('bcrypt');
const ormUser = new ORMUser('course_api', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
// Salt rounds
const salt = 10;
const User = ormUser.define('sus_users', {
    email: {
        type: TypeUser.STRING(20),
        allowNull: false,
    },
    password: {
        type: TypeUser.STRING(255),
        allowNull: false,
    },
    name: {
        type: TypeUser.STRING(50),
        allowNull: false,
    },
    gender: {
        type: TypeUser.STRING(10),
        allowNull: false,
    },
    role: {
        type: TypeUser.INTEGER(2),
        allowNull: false,
        defaultValue: 0
    }
});
;
// Initialize config .env
dotenv.config();
/* Rahasia gwehj */
const SECRET_KEY = process.env.SECRET;
const generateToken = (email) => {
    return jwt.sign({ email: email }, SECRET_KEY, { expiresIn: '1 day' });
};
const checkUserModel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ormUser.authenticate();
    }
    catch (err) {
        console.log(`Failed to connect database ${err}`);
    }
});
exports.checkUserModel = checkUserModel;
const syncUserModel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ormUser.sync();
    }
    catch (err) {
        console.log(`Can't create table sus_users`);
    }
});
exports.syncUserModel = syncUserModel;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* Validate email. Checking if already use in database...  */
    const validator = yield User.findAll({
        where: {
            email: req.body.email
        }
    });
    if (!validator.length) {
        const successResponse = {
            message: 'Pendaftaran berhasil!',
            success: true,
            status: 201,
            data: []
        };
        const hash = yield bcrypt.hash(req.body.password, salt);
        yield User.create({
            email: req.body.email,
            password: hash,
            name: req.body.name,
            gender: req.body.gender,
        });
        res.json(successResponse);
    }
    else {
        const failResponse = {
            message: 'Maaf, email sudah digunakan!',
            success: false,
            status: 403,
            data: []
        };
        res.json(failResponse);
    }
});
exports.registerUser = registerUser;
// Route Login
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailInput = req.body.email;
    const passInput = req.body.password;
    // Auth system
    const validator = yield User.findAll({
        where: {
            email: emailInput
        }
    });
    if (validator.length) {
        try {
            const validatePass = yield bcrypt.compare(passInput, validator[0].password);
            if (validatePass) {
                const token = generateToken(emailInput);
                const successResponse = {
                    message: 'Berhasil masuk.',
                    success: true,
                    status: 200,
                    data: [
                        {
                            token: token
                        }
                    ]
                };
                res.json(successResponse);
            }
            else {
                const wrongPassword = {
                    message: 'Password salah!',
                    success: false,
                    status: 404,
                    data: [],
                };
                res.json(wrongPassword);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        const unregisteredEmail = {
            message: 'Maaf, Email tidak terdaftar!',
            success: false,
            status: 404,
            data: []
        };
        res.json(unregisteredEmail);
    }
});
exports.Login = Login;
