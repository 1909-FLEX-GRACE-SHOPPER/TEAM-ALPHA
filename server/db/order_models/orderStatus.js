const Sequelize = require('sequelize');
const db = require('../database');

const { INTEGER, ENUM } = Sequelize;

const OrderStatus = db.define('OrderStatus', {
    id: {
        type: INTEGER,
        primaryKey: true,
        validate: {
            min: 0,
            max: 3,
        }
    },
    status: {
        type: ENUM,
        values: [
            'open', // 0
            'ordered', // 1
            'shipped', // 2
            'delivered' // 3
        ],
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});

module.exports = OrderStatus;
