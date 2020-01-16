const Sequelize = require('sequelize');
const db = require('../database');

const { STRING, UUID, UUIDV4 } = Sequelize; 

const User = db.define('user', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: STRING,
        allowNull: false,
        defaultValue: 'guestFirst',
        validate: {
            notEmpty: true,
        },
    },
    lastName: {
        type: STRING,
        allowNull: false,
        defaultValue: 'guestLast',
        validate: {
            notEmpty: true,
        },
    },
    billingAddress: {
        type: STRING,
        allowNull: false,
        defaultValue: 'guestBillingAddress',
        validate: {
            notEmpty: true,
        }
    },
    shippingAddress: {
        type: STRING,
        allowNull: false,
        defaultValue: 'guestShippingAddress',
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: STRING,
        allowNull: false,
        defaultValue: 'guestEmail',
        validate: {
            notEmpty: true,
            isEmail: true,
        },
    },
    password: {
        type: STRING,
        allowNull: false,
        defaultValue: 'guestPwd',
        validate: {
            notEmpty: true,
        },
    },
});

module.exports = User;