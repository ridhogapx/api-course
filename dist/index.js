"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("./routes/User");
const bodyParser = require('body-parser');
// Body Parser
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const app = (0, express_1.default)();
// Port number
const port = 3000;
// Defining Model Database
(0, User_1.checkUserModel)();
(0, User_1.syncUserModel)();
// API Route
app.post('/api/register', urlEncodedParser, User_1.registerUser);
app.post('/api/login', urlEncodedParser, User_1.Login);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
