const express = require('express');
const appRoute = express.Router();
const mysql = require('mysql');


// Define Routes ======================>>>

// Home Page
appRoute.route('/').get((req, res) => {
    res.send("i am index");
});

module.exports = appRoute;

