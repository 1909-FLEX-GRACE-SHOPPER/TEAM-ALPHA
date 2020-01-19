const Sequelize = require('sequelize');
const db = require('../database');

const { ENUM, INTEGER } = Sequelize;

const UserTypes = db.define(
  'userTypes',
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      validate: {
        min: 1,
        max: 5
      }
    },
    userTypes: {
      type: ENUM,
      values: ['admin', 'pending', 'regular', 'guest', 'oAuth'],
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  { timestamps: false }
);

module.exports = UserTypes;
