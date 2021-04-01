const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const path = require('path');
const port = 4200;
const app = express();

const logger = require('morgan');
app.use(logger('dev'));


app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));


app.use("/", express.static(path.join(__dirname, '/dist/mixaar-admin')));
app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/dist/mixaar-admin/index.html');
});

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.get('/test', function(req, res) {
    console.log(req);
    res.send({
        a: 'Welcome to Mixaar admin.'
    });
});


app.listen(port, () => {
    console.log(`Server started at  ${port}`);
});