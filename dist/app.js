"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Admin_1 = __importDefault(require("./src/routes/Admin"));
const User_1 = __importDefault(require("./src/routes/User"));
const Sequelize_1 = __importDefault(require("./src/util/Sequelize"));
// import Product from "./model/Data";
let app = (0, express_1.default)();
// var SequelizeStore = require("connect-session-sequelize")(session.Store);
app.use(body_parser_1.default.json());
app.use(Admin_1.default);
app.use(User_1.default);
Sequelize_1.default
    // .sync()
    .sync()
    .then(() => {
    console.log('Database synchronized successfully.');
})
    .catch(err => {
    console.error('Error synchronizing database:', err);
});
app.listen({ port: 3005 }, () => {
    console.log("server running");
});
