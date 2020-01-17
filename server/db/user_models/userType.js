const Sequelize = require('sequelize');
const db = require('../database');

const { ENUM, INTEGER } = Sequelize;

const UserType = db.define('UserType', {
    id: {
        type: INTEGER,
        primaryKey: true,
        validate: {
            min: 0,
            max: 4,
        }
    },
    size: {
        type: ENUM,
        values: [
            'admin',
            'pending',
            'regular',
            'guest',
            'oAuth'
        ],
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});

module.exports = UserType;
