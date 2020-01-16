const Sequelize = require('sequelize');
const db = require('../database');

const { ENUM, INTEGER } = Sequelize;

const Gender = db.define('category', {
    id: {
        type: INTEGER,
        primaryKey: true,
        validate: {
            min: 0,
            max: 2, // f, m, n
        }
    },
    size: {
        type: ENUM,
        values: [
            'F',
            'M',
            'N'
        ],
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});

module.exports = Gender;
