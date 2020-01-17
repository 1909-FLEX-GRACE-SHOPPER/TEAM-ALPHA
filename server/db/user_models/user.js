const Sequelize = require('sequelize');
const db = require('../database');

const { STRING, UUID, UUIDV4 } = Sequelize;

//NOTE: I think fields that are using notEmpty validation should not have a defaultValue otherwise it could be left empty and pass validation. But then again we can enforce this with the frontend forms. Should we keep or remove it?

const Users = db.define('users', {
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
        defaultValue: 'guestEmail@gmail.com',
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

module.exports = Users;
