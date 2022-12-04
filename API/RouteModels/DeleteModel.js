// const express = require('express');
const mysql = require('mysql');

// Define the  connection with MySQL DB
const DB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "library"
});

// Connect to MySQL-
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

const DeleteBook = (req, res) => {
    // Delete Values
    const sql = `DELETE FROM  Book WHERE hex(ID) = '${req.params.id}';`

    // Exicute Quary
    exicuteSQL(sql, "Deleted");
}

const DeleteAuthor = (req, res) => {
    // Delete Values
    const sql = `DELETE FROM  Book WHERE hex(ID) = '${req.params.id}';`

    // Exicute Quary
    exicuteSQL(sql, "Deleted");
}

module.exports = {
    DeleteBook,
    DeleteAuthor
}