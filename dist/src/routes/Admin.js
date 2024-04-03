"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Admin_1 = require("../controller/Admin");
let app = (0, express_1.default)();
app.post('/grocery-items', Admin_1.createProduct);
app.get('/grocery-items', Admin_1.getAllProducts);
app.get('/grocery-items/:id', Admin_1.getItemById);
app.put('/grocery-items/:id', Admin_1.updateItem);
app.delete('/grocery-items/:id', Admin_1.deleteItem);
app.post('/manage-inventory', Admin_1.manageInventory);
exports.default = app;
