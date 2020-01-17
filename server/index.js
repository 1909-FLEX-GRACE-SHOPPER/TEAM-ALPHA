const express = require('express');
const path = require('path');
// these two are good for cookies
const cookieParser = require('cookie-parser');
const moment = require('moment');

const app = express();
const PORT = process.env.PORT || 3000;

// we are going to need the Users for authentication
// though we could modularize that as well
const { db, Users } = require('./db/index');

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// authentication and cookies
app.use(cookieParser());

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

// got to use those routes!
app.use('/api', require('./api'));

// handling errors
app.use((err, req, res, next) => {
  // this is for testing; so if we don't have tests we can remove it
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
