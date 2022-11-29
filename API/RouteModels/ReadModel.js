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

const ReadBook = (req, res) => {
    const Page_Number = req.query.page
    const Page_Limit = 10;

    const Start_Point = (Page_Number - 1) * Page_Limit;

    // Select All Values
    const sql = `SELECT HEX(ID) as ID, 
                        Name 
                        FROM Book ORDER BY Name ASC
                        LIMIT ${Start_Point},${Page_Limit};;`;
    // Exicute Quary
    DB.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
}

const ReadBookByID = (req, res) => {
    // Select All Values by Filtering ID
    const sql = `SELECT HEX(ID) as ID, 
Name, 
ISBN, 
Author 
FROM Book WHERE hex(ID) = '${req.params.id}';`;
    // Exicute Quary
    DB.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
}

const ReadAuthor = (req, res) => {
    const Page_Number = req.query.page
    const Page_Limit = 10;

    const Start_Point = (Page_Number - 1) * Page_Limit;

    // Select All Values
    const sql = `SELECT HEX(ID) as ID, 
                First_Name,
                Last_Name, 
                Full_Name FROM Author
                ORDER BY First_Name ASC
                LIMIT ${Start_Point},${Page_Limit};`;

    // Exicute Quary
    DB.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
}

const ReadAuthorByID = (req, res) => {
    // Select All Values About Author Fitering By ID
    const sql = `SELECT Book.Name, Book.ISBN  FROM 
Author LEFT JOIN Book
ON Author.Full_Name = Book.Author
where hex(Author.ID) = '${req.params.id}';`

    // Exicute Quary
    DB.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
}

module.exports = {
    ReadBook, ReadBookByID,
    ReadAuthor, ReadAuthorByID
}