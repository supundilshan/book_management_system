const express = require('express');
const cors = require('cors')
const AppRoute = require('./Routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', AppRoute);

app.listen(3001, () => {
    console.log("server running on port 3001");
});