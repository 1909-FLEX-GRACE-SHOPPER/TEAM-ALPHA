const Sequelize = require('sequelize');
const db = require('../database');

const { ENUM, INTEGER } = Sequelize;

//Do we want to include shoe size for boots?
const Sizes = db.define('sizes', {
    id: {
        type: INTEGER,
        primaryKey: true,
        validate: {
            min: 1,
            max: 6,
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
}, {timestamps: false});

module.exports = Sizes;
