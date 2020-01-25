const Sequelize = require('sequelize');
const db = require('../database');

const { STRING, INTEGER, TEXT, DECIMAL, UUID, UUIDV4 } = Sequelize;

const Products = db.define('products', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  },
  price: {
    type: DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0.0
    }
  }
});

module.exports = Products;
