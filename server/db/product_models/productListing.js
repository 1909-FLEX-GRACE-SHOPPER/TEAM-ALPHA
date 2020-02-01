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
    defaultValue:
      'https://ayc.ddl.mybluehost.me/wp-content/uploads/2018/04/coming-soon.png',
    validate: {
      isUrl: true
    }
  }
});

module.exports = ProductListings;
