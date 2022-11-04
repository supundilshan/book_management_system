const express = require('express');
const appRoute = express.Router();
const mysql = require('mysql');

// Define the  connection with MySQL DB
const DB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "library"
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

// View Book Table 
appRoute.route('/author').get((req, res) => {
    // Select All Values
    const sql = `SELECT HEX(ID) as ID, First_Name, Last_Name FROM Author;`;
    // Exicute Quary
    DB.query(sql, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});

module.exports = appRoute;

