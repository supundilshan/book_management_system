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

const UpdateBook = (req, res) => {
    // Update Values
    const sql = `UPDATE Book SET 
                            Name = "${req.body.Name}", 
                            ISBN = "${req.body.ISBN}", 
                            Author = "${req.body.Author}" 
                            WHERE hex(ID) = '${req.params.id}';`;
    // Exicute Quary0
    exicuteSQL(sql, "Value Updated");
}

const UpdateAuthor = (req, res) => {
    // Update Values
    const sql = `UPDATE Author SET First_Name = '${req.body.First_Name}', 
                                    Last_Name = '${req.body.Last_Name}', 
                                    Full_Name = concat_ws(' ', '${req.body.First_Name}', '${req.body.Last_Name}')
                                    WHERE hex(ID) = '${req.params.id}';`;
    // Exicute Quary
    exicuteSQL(sql, "Value Updated");
}

module.exports = {
    UpdateBook,
    UpdateAuthor
}