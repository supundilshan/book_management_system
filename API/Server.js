const express = require('express');
const cors = require('cors')
const AppRoute = require('./Routes');

const app = express();

app.use(express.json());
app.use(cors());


app.use('/', AppRoute);

// paged items route
app.get('/api/items', (req, res, next) => {
    // example array of 150 items to be paged
    const items = [...Array(150).keys()].map(i => ({ id: (i + 1), name: 'Item ' + (i + 1) }));
    console.log(items)

    // get page from query params or default to first page
    const page = parseInt(req.query.page) || 1;

    // get pager object for specified page
    const pageSize = 5;
    const pager = paginate(items.length, page, pageSize);

    // get page of items from items array
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // return pager object and current page of items
    return res.json({ pager, pageOfItems });
});

app.listen(3001, () => {
    console.log("server running on port 3001");
});