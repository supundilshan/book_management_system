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

// Difine function for exicute sql query
// Function take SQL and massage to display after success
const exicuteSQL = (sql, msg) => {
    // Exicute Quary
    DB.query(sql, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(msg);
        }
    });
}

// Define Routes ======================>>>

// Home Page
appRoute.route('/').get((req, res) => {
    res.send("i am index");
});

// Get All Data About Books from db and send to front
appRoute.route('/books').get((req, res) => {
    // Select All Values
    const sql = `SELECT HEX(ID) as ID, Name FROM Book ORDER BY Name ASC;`;
    // Exicute Quary
    DB.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});

// Get All Data About Authors from db and send to front
appRoute.route('/authors').get((req, res) => {
    // Select All Values
    const sql = `SELECT HEX(ID) as ID, First_Name, Last_Name FROM Author ORDER BY First_Name ASC;`;
    // Exicute Quary
    DB.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});

// Get All Data About *only one Book*  from db and send to front
appRoute.route('/book/:id').get((req, res) => {
    // Select All Values
    const sql = `SELECT HEX(ID) as ID, Name, ISBN, Author FROM Book WHERE hex(ID) = '${req.params.id}';`;
    // Exicute Quary
    DB.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});

// Insert Book Data to Database
appRoute.route('/book').post((req, res) => {
    // console.log(req.body);
    // Insert Values
    const sql = `INSERT INTO  Book (ID, Name , ISBN, Author)
                 VALUES (UNHEX(REPLACE(UUID(), "-","")), "${req.body.Name}", "${req.body.ISBN}","${req.body.Author}")`;
    // Exicute Quary
    exicuteSQL(sql, "Value Added to Database");
});

// Update Book Data in Database
appRoute.route('/book/:id').put((req, res) => {
    console.log(req.body);
    // Update Values
    const sql = `UPDATE Book SET Name = "${req.body.Name}", ISBN = "${req.body.ISBN}", Author = "${req.body.Author}" WHERE hex(ID) = '${req.params.id}';`;
    // Exicute Quary
    exicuteSQL(sql, "Value Updated");
});

module.exports = appRoute;

