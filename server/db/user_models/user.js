const Sequelize = require('sequelize');
const db = require('../database');

const { STRING, INTEGER, ENUM, UUID, UUIDV4 } = Sequelize;

//NOTE: I think fields that are using notEmpty validation should not have a defaultValue otherwise it could be left empty and pass validation. But then again we can enforce this with the frontend forms. Should we keep or remove it?

// add back validation later

const Users = db.define('users', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  billingAddress1: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  billingAddress2: {
    type: STRING
  },
  billingCity: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  billingState: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  billingZip: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
      len: 5
    }
  },
  shippingAddress1: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  shippingAddress2: {
    type: STRING
  },
  shippingCity: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  shippingState: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  shippingZip: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
      len: 5
    }
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
  },
  userTypes: {
    type: ENUM,
    values: ['admin', 'pending', 'regular', 'guest', 'oAuth'],
    allowNull: false,
    defaultValue: 'regular',
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Users;
