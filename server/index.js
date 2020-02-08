const express = require('express');
const path = require('path');
const morgan = require('morgan');
const chalk = require('chalk');
const axios = require('axios');
require('dotenv').config();
// these two are good for cookies
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
// we are going to need the Users for authentication
// though we could modularize that as well
const { Users } = require('./db/index');
app.use(morgan('dev'));

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(chalk.cyan(`${new Date().toString()}: ${req.path}`));
  next();
});

// authentication and cookies
// app.use(cookieParser());
app.use(
  session({
    secret: 'hopethisworks',
    resave: false,
    cookie: {
      maxAge: 7.2 * Math.exp(10, 6) // 2 hours
    }
  })
);

// session logging
app.use((req, res, next) => {
  // console.log('session', req.session);
  next();
});

app.use((req, res, next) => {
  Users.findByPk(req.session.userId)
    .then(userOrNull => {
      if (!userOrNull) req.loggedIn = false;
      else {
        req.loggedIn = true;
        req.user = userOrNull;
        if (userOrNull.userType === 'admin') {
          req.session.admin = true;
        } else {
          req.session.admin = false;
        }
      }
      next();
    })
    .catch(e => {
      console.log('error searching for a user by session.userId');
      console.error(e);
      next();
    });
});
app.get('/api/github/login', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});
app.get('/api/github/callback', (req, res) => {
  const { code } = req.query;

  axios
    .post(
      `https://github.com/login/oauth/access_token?code=${code}&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`,
      {},
      {
        headers: {
          Accept: 'application/json'
        }
      }
    )
    .then(res => {
      console.log('Github Response: ', res.data);
      console.log('sessoin id ', req.session.userId);
      Users.findByPk(req.session.userId).then(userOrNull => {
        return userOrNull.update({
          github_access_token: res.data.access_token
        });
      });
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(e => {
      console.log(chalk.red('Error authenticating with Github.'));
      console.error(e);
      res.redirect('/error');
    });
});
app.get('/api/github/user', (req, res) => {
  axios
    .get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${req.github_access_token}`
      }
    })
    .then(axRes => {
      res.send(axRes.data);
    })
    .catch(e => {
      console.log(
        chalk.red('Error while getting response from github user route.')
      );
      console.error(e);
      res.redirect('/error');
    });
});

app.use('/auth', require('./auth'));

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

// got to use those routes!
app.use('/api', require('./api'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// handling errors
app.use((err, req, res, next) => {
  // this is for testing; so if we don't have tests we can remove it
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
  next();
});

module.exports = app;
