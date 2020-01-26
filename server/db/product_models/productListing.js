const Sequelize = require('sequelize');
const db = require('../database');

const { STRING, INTEGER, TEXT } = Sequelize;

const ProductListings = db.define('productListings', {
  id: {
    type: INTEGER,
    primaryKey: true
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: TEXT,
    defaultValue: 'to come'
    //NOTE: commented this out temp just to test seed templates. This forces us to insert URLS.
    // validate: {
    //     isUrl: true,
    // },
  }
});

module.exports = ProductListings;
