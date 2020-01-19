const Sequelize = require('sequelize');
const db = require('../database');

const { UUID, UUIDV4 } = Sequelize;

const OrderItems = db.define('orderItems', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  }
});

module.exports = OrderItems;
