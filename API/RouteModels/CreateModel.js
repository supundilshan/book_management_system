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

const CreateBook = (req, res) => {
    // Insert Values
    const sql = `INSERT INTO  Book (ID, Name , ISBN, Author)
                 VALUES (UNHEX(REPLACE(UUID(), "-","")), 
                        "${req.body.Name}", 
                        "${req.body.ISBN}",
                        "${req.body.Author}")`;
    // Exicute Quary
    exicuteSQL(sql, "Value Added to Database");
}

const CreateAuthor = (req, res) => {
    // Insert Values
    const sql = `INSERT INTO Author(ID, First_Name, Last_Name, Full_Name)
                VALUES(UNHEX(REPLACE(UUID(), "-","")), 
                        '${req.body.First_Name}', 
                        '${req.body.Last_Name}', 
                        concat_ws(' ', '${req.body.First_Name}', '${req.body.Last_Name}'));`;

    // Exicute Quary
    exicuteSQL(sql, "Value Added to Databaser");
}

module.exports = {
    CreateBook,
    CreateAuthor
}