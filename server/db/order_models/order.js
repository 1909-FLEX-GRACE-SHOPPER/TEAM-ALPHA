const Sequelize = require('sequelize');
const db = require('../database');

const { DECIMAL, UUID, UUIDV4 } = Sequelize; 

const Order = db.define('order', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    totalCost: {
        type: DECIMAL,
        validate: {
            min: 0.0,
        },
    },
    orderDate: {
        type: DATE,
        validate: {
            isDate: true,
        },
    },
});

module.exports = Order;
