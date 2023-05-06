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
app.post('/api/signup', urlEncodedParser, User_1.RegisterUser);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
