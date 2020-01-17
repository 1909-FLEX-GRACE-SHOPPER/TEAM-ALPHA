const Sequelize = require('sequelize');
const db = require('../database');

const { ENUM, INTEGER } = Sequelize;

const Categories = db.define('categories', {
    id: {
        type: INTEGER,
        primaryKey: true,
        validate: {
            min: 1,
            max: 8, // just guessing how many categories we want
        }
    },
    category: {
        type: ENUM,
        values: [
            'skis', // 1
            'boots', // 2
            'pants', // 3
            'jackets', // 4
            'shirts', // 5
            'poles', // 6
            'gloves', // 7
            'goggles' // 8
        ],
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
}, {timestamps: false});

module.exports = Categories;
