const Sequelize = require('sequelize');
const db = require('../database');

const { ENUM, INTEGER } = Sequelize;

const ShoeSizes = db.define('shoeSizes', {
    id: {
        type: INTEGER,
        primaryKey: true,
        validate: {
            min: 1,
            max: 13,
        }
    },
    size: {
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
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
}, {timestamps: false});

module.exports = ShoeSizes;
