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

// Routes Used In Handle Book Details======================>>>

// Get *All Books* from db and send to front
appRoute.route('/book').get((req, res) => {
    // Select All Values
    const sql = `SELECT HEX(ID) as ID, 
                        Name 
                        FROM Book ORDER BY Name ASC;`;
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

// Get *Only One Book*  from db and send to front
appRoute.route('/book/:id').get((req, res) => {
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
});

// Insert book to Database
appRoute.route('/book').post((req, res) => {
    // Insert Values
    const sql = `INSERT INTO  Book (ID, Name , ISBN, Author)
                 VALUES (UNHEX(REPLACE(UUID(), "-","")), 
                        "${req.body.Name}", 
                        "${req.body.ISBN}",
                        "${req.body.Author}")`;
    // Exicute Quary
    exicuteSQL(sql, "Value Added to Database");
});

// Update book in Database
appRoute.route('/book/:id').put((req, res) => {
    console.log(req.body);
    // Update Values
    const sql = `UPDATE Book SET 
                            Name = "${req.body.Name}", 
                            ISBN = "${req.body.ISBN}", 
                            Author = "${req.body.Author}" 
                            WHERE hex(ID) = '${req.params.id}';`;
    // Exicute Quary
    exicuteSQL(sql, "Value Updated");
});


// Routes Used In Handle Author Details======================>>>

// Get *All Authors* from db and send to front
appRoute.route('/author').get((req, res) => {

    const Page_Number = req.query.page
    const Page_Limit = 5;

    const Start_Point = (Page_Number - 1) * Page_Limit;

    // Select All Values
    const sql = `SELECT HEX(ID) as ID, 
                First_Name,
                Last_Name, 
                Full_Name FROM Author
                LIMIT ${Start_Point},${Page_Limit};`;

    // ORDER BY First_Name ASC
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

// Get *Only One Author*  from db and send to front
appRoute.route('/author/:id').get((req, res) => {
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
});

// Insert author to Database
appRoute.route('/author').post((req, res) => {
    // Insert Values
    const sql = `INSERT INTO Author(ID, First_Name, Last_Name, Full_Name)
                VALUES(UNHEX(REPLACE(UUID(), "-","")), 
                        '${req.body.First_Name}', 
                        '${req.body.Last_Name}', 
                        concat_ws(' ', '${req.body.First_Name}', '${req.body.Last_Name}'));`;

    // Exicute Quary
    exicuteSQL(sql, "Value Added to Database");
});

// Update Author in Database
appRoute.route('/author/:id').put((req, res) => {
    console.log(req.body);
    // Update Values
    const sql = `UPDATE Author SET First_Name = '${req.body.First_Name}', 
                                    Last_Name = '${req.body.Last_Name}', 
                                    Full_Name = concat_ws(' ', '${req.body.First_Name}', '${req.body.Last_Name}')
                                    WHERE hex(ID) = '${req.params.id}';`;
    // Exicute Quary
    exicuteSQL(sql, "Value Updated");
});

module.exports = appRoute;

