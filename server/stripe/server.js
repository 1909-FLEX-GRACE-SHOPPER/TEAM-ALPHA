const cors = require('cors');
// const bodyParser = require('body-parser');

// const CORS_WHITELIST = require('../StripeConstants/backend/frontend').default;

const CORS_WHITELIST = require('../../StripeConstants/backend/frontend');

const corsOptions = {
  origin: (origin, callback) => {
    CORS_WHITELIST.indexOf(origin) !== -1
      ? callback(null, true)
      : callback(new Error('not allowed by CORS'));
  }
};

const configureServer = app => {
  app.use(cors(corsOptions));

  // app.use(bodyParser.json());
};

module.exports = configureServer;
