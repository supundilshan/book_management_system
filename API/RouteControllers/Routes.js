const express = require('express');
const appRoute = express.Router();

// Define Route Models ======================>>>

const read_data = require('../RouteModels/ReadModel');
const create_data = require('../RouteModels/CreateModel');
const update_data = require('../RouteModels/UpdateModel');
const delete_data = require('../RouteModels/DeleteModel');

// Home Page
appRoute.route('/').get((req, res) => { res.send("i am index"); });

// Routes Used In Handle Book Details======================>>>

appRoute.route('/book').get((req, res) => { read_data.ReadBook(req, res) });
appRoute.route('/book/:id').get((req, res) => { read_data.ReadBookByID(req, res) });

appRoute.route('/book').post((req, res) => { create_data.CreateBook(req, res) });

appRoute.route('/book/:id').put((req, res) => { update_data.UpdateBook(req, res) });

appRoute.route('/book/:id').delete((req, res) => { delete_data.DeleteBook(req, res) });

// Routes for Handle Author Details======================>>>

appRoute.route('/author').get((req, res) => { read_data.ReadAuthor(req, res) });
appRoute.route('/author/:id').get((req, res) => { read_data.ReadAuthorByID(req, res) });

appRoute.route('/author').post((req, res) => { create_data.CreateAuthor(req, res) });

appRoute.route('/author/:id').put((req, res) => { update_data.UpdateAuthor(req, res) });

appRoute.route('/book/:id').delete((req, res) => { delete_data.DeleteAuthor(req, res) });

module.exports = appRoute;

