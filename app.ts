/** @format */

import express from "express";
import bodyParser from 'body-parser';
import admin from './src/routes/Admin';
import user from './src/routes/User';

import db from './src/util/Sequelize'
import Product from "./src/model/Products";

// import Product from "./model/Data";

let app = express();

// var SequelizeStore = require("connect-session-sequelize")(session.Store);


app.use(bodyParser.json())

app.use(admin)
app.use(user)


db
// .sync()
.sync() 
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });

app.listen({ port:3005},()=>{
    console.log("server running")
});
