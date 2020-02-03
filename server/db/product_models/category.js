const Sequelize = require('sequelize');
const db = require('../database');

const { ENUM, INTEGER } = Sequelize;

const Categories = db.define(
  'categories',
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      validate: {
        min: 1,
        max: 8 // just guessing how many categories we want
      }
    },
    category: {
      type: ENUM,
      values: [
        'skis',
        'boots',
        'pants',
        'jackets',
        'shirts',
        'poles',
        'gloves',
        'goggles'
      ],
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  { timestamps: false }
);

module.exports = Categories;
