const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// call routes
var routes = require('./routes')
routes(app)

app.listen(8080, () => {
    console.log(`Server started on "http://localhost:8080"`);
});