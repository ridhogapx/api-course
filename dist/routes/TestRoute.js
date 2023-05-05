"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const test = () => {
    app.get('/test', (req, res) => {
        res.end(JSON.stringify({
            message: 'Ril',
            status: 200
        }));
    });
};
exports.default = test;
