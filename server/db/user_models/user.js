const Sequelize = require('sequelize');
const db = require('../database');
var bcrypt = require('bcrypt');

const { STRING, INTEGER, ENUM, UUID, UUIDV4 } = Sequelize;

//NOTE: I think fields that are using notEmpty validation should not have a defaultValue otherwise it could be left empty and pass validation. But then again we can enforce this with the frontend forms. Should we keep or remove it?

// add back validation later

const Users = db.define(
  'users',
  {
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
    userType: {
      type: ENUM,
      values: ['admin', 'pending', 'regular', 'guest', 'oAuth'],
      allowNull: false,
      defaultValue: 'regular',
      validate: {
        notEmpty: true
      }
    },
    github_access_token: {
      type: STRING,
      allowNull: true
    }
  },
  {
    hooks: {
      // beforeBulkCreate: async function(records) {
      //   records.forEach((user, index) => {
      //     return bcrypt
      //       .hash(user.password, 10)
      //       .then(hash => {
      //         user.password = hash;
      //         console.log('password hash:', user.password);
      //       })
      //       .catch(err => {
      //         throw new Error();
      //       });
      //   });
      // },
      beforeBulkCreate: (users, options) => {
        for (const user of users) {
          const { password } = user;
          const saltRounds = 10;
          const salt = bcrypt.genSaltSync(saltRounds);
          const hash = bcrypt.hashSync(password, salt);
          user.password = hash;
        }
      },
      beforeCreate: user => {
        const { password } = user;
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        user.password = hash;
      }
    }
  }
);

Users.prototype.isPasswordValid = function(password) {
  console.log('WHAT IS THIS.PASSWORD?', this.password);
  return bcrypt.compareSync(password, this.password);
};

module.exports = Users;
