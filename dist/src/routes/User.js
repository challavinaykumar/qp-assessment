"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../controller/User");
let app = (0, express_1.default)();
app.get('/available', User_1.viewAvailableGroceryItems);
app.post('/book', User_1.bookGroceryItems);
exports.default = app;
