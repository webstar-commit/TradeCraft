/* eslint-disable import/unambiguous */
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const path = require('path');
const volleyball = require('volleyball');

const app = express();
const port = process.env.PORT || 3000;

/* Compresses response body */
app.use(compression());

/* Logs HTTP requests & responses */
app.use(volleyball);

/* Parses the body of the HTTP request */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Provides access to the public directory */
app.use(express.static(path.resolve(__dirname, '../public')));

/* Serves the application */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

/* Listens for connections */
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening to http://localhost:${port}`);
});
