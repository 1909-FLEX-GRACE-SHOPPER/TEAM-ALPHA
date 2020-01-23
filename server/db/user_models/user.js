const Sequelize = require('sequelize');
const db = require('../database');

const { STRING, INTEGER, UUID, UUIDV4 } = Sequelize;

//NOTE: I think fields that are using notEmpty validation should not have a defaultValue otherwise it could be left empty and pass validation. But then again we can enforce this with the frontend forms. Should we keep or remove it?

// add back validation later

const Users = db.define('users', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: STRING
  },
  lastName: {
    type: STRING
  },
  billingAddress1: {
    type: STRING
  },
  billingAddress2: {
    type: STRING
  },
  billingCity: {
    type: STRING
  },
  billingState: {
    type: STRING
  },
  billingZip: {
    type: INTEGER
  },
  shippingAddress1: {
    type: STRING
  },
  shippingAddress2: {
    type: STRING
  },
  shippingCity: {
    type: STRING
  },
  shippingState: {
    type: STRING
  },
  shippingZip: {
    type: INTEGER
  },
  email: {
    type: STRING,
    allowNull: false,
    defaultValue: 'guestEmail@gmail.com',
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  password: {
    type: STRING,
    allowNull: false,
    defaultValue: 'guestPwd',
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Users;
