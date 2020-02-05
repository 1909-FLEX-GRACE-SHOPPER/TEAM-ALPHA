const Sequelize = require('sequelize');
const db = require('../database');

const { INTEGER, ENUM, DECIMAL, UUID, UUIDV4 } = Sequelize;

const Products = db.define('products', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  gender: {
    type: ENUM,
    values: ['F', 'M', 'N'],
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  size: {
    type: ENUM,
    values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    allowNull: true
  },
  shoeSize: {
    type: ENUM,
    values: [
      '6',
      '6.5',
      '7',
      '7.5',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12'
    ],
    allowNull: true
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
    validate: {
      sInt: true,
      min: 0
    }
  },
  price: {
    type: DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0.0
    }
  }
});

module.exports = Products;
