const Sequelize = require('sequelize');
const db = require('../database');

const { ENUM, INTEGER } = Sequelize;

const Colors = db.define('colors', {
    id: {
        type: INTEGER,
        primaryKey: true,
        validate: {
            min: 1,
            max: 9,
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
}, {timestamps: false});

module.exports = Colors;
