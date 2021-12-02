const express = require('express');
const PORT = process.env.PORT || 8080


var morgan = require('morgan');
const app = express();


// parse application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// call routes
var routes = require('./routes')
routes(app)

//daftarkan menu routes dari index
app.use('/api/v1', require('./middleware'));

app.listen(PORT, () => {
    console.log(`Server started on "http://localhost:8080"`);
});