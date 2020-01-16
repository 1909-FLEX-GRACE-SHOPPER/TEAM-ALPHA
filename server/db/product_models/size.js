const Sequelize = require('sequelize');
const db = require('../database');

const { ENUM, INTEGER } = Sequelize;

const Size = db.define('size', {
    id: {
        type: INTEGER,
        primaryKey: true,
        validate: {
            min: 0,
            max: 5,
        }
    },
    size: {
        type: ENUM,
        values: [
            'XS',
            'S',
            'M',
            'L',
            'XL',
            'XXL'
        ],
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});

module.exports = Size;
