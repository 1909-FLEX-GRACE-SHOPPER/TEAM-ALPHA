const Sequelize = require('sequelize');
const db = require('../database');

const { NOW, DECIMAL, DATE, UUID, UUIDV4 } = Sequelize;

const Orders = db.define('orders', {
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
        //Added this there to get the current time and date, may not be needed since we do have the createdAtDate?
        defaultValue: NOW,
        validate: {
            isDate: true,
        },
    },
});

module.exports = Orders;
