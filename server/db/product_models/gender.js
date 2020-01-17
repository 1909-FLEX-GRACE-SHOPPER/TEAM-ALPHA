const Sequelize = require('sequelize');
const db = require('../database');

const { ENUM, INTEGER } = Sequelize;

const Genders = db.define('genders', {
    id: {
        type: INTEGER,
        primaryKey: true,
        validate: {
            min: 1,
            max: 3, // f, m, n
        }
    },
    gender: {
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
}, {timestamps: false});

module.exports = Genders;
