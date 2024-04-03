/** @format */

import { Sequelize } from "sequelize";


const sequelize = new Sequelize("Products", "root", "12345678", {
  host: "localhost",
  dialect: "mysql",
});


export default sequelize;