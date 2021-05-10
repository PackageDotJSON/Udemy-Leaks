const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const path = require('path');
const mysqlConnection = require('./connection');
const routes = require('./routes');

var app = express();

app.disable('x-powered-by');

// app.use(express.static(__dirname + '/dist/udemy-leaks'));
//
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname));
// });

app.use(bodyParser.json());

app.use(cors());

app.use(routes);

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const address = 'localhost';

server.listen(port, 'localhost', () => {
  console.log(`Running on port ${port}`);
});

// app.listen(port, () => {
//
//   console.log(`Running on port ${port}`);
//
// });
