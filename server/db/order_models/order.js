const Sequelize = require('sequelize');
const db = require('../database');

const { NOW, ENUM, DECIMAL, DATE, UUID, UUIDV4 } = Sequelize;

const Orders = db.define('orders', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  totalCost: {
    type: DECIMAL(10, 2),
    validate: {
      min: 0.0
    }
  },
  status: {
    type: ENUM,
    values: [
      'open', // 1
      'ordered', // 2
      'shipped', // 3
      'delivered' // 4
    ],
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  orderDate: {
    type: DATE,
    //Added this there to get the current time and date, may not be needed since we do have the createdAtDate?
    defaultValue: NOW,
    validate: {
      isDate: true
    }
  }
});

module.exports = Orders;
