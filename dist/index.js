"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const dummyData = {
    id: 6969,
    message: 'Data is retrieved',
    success: true
};
app.get('/', (req, res) => {
    res.send(JSON.stringify(dummyData));
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
