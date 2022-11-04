const express = require('express');
const appRoute = express.Router();
const mysql = require('mysql');

// Define the  connection with MySQL DB
const DB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mydb"
});
// Connect to MySQL
DB.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("MySql Connected");
    }
});

// Define Routes ======================>>>

// Home Page
appRoute.route('/').get((req, res) => {
    res.send("i am index");
});

module.exports = appRoute;

