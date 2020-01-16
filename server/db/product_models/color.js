const Sequelize = require('sequelize');
const db = require('../database');

const { ENUM, INTEGER } = Sequelize;

const Color = db.define('category', {
    id: {
        type: INTEGER,
        primaryKey: true,
        validate: {
            min: 0,
            max: 8,
        }
    },
    color: {
        type: ENUM,
        values: [
            'blue',
            'green',
            'yellow',
            'tomato',
            'red',
            'dodgerBlue',
            'white',
            'black',
            'gray'
        ],
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});

module.exports = Color;
