const Sequelize = require('sequelize');
const db = require('../database');
var bcrypt = require('bcrypt');
const saltRounds = 10;

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
    }
  },
  github_access_token: {
    type: STRING,
    allowNull: true
  }
  // {
  //   instanceMethods: {
  //     generateHash: function(password) {
  //       return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  //     },
  //     validPassword: function(password) {
  //       return bcrypt.compareSync(password, this.password);
  //     }
  //   }
  // }
);

// beforeCreate: async function(user) {
//   const salt = await bcrypt.genSalt(10); //whatever number you want
//   user.password = await bcrypt.hash(user.password, salt);
// }

// User.prototype.validPassword = async function(password) {
//   return await bcrypt.compare(password, this.password);
// }

Users.beforeCreate(function(user, options) {
  return cryptPassword(user.password)
    .then(success => {
      user.password = success;
    })
    .catch(err => {
      if (err) console.log(err);
    });
});

function cryptPassword(password) {
console.log("cryptPassword" + password);
return new Promise(function(resolve, reject) {
  bcrypt.genSalt(10, function(err, salt) {
    // Encrypt password using bycrpt module
    if (err) return reject(err);

    bcrypt.hash(password, salt, null, function(err, hash) {
      if (err) return reject(err);
      return resolve(hash);
    });
  });
});

module.exports = Users;
