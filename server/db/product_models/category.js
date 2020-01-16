const Sequelize = require('sequelize');
const db = require('../database');

const { ENUM, INTEGER } = Sequelize;

const Category = db.define('category', {
    id: {
        type: INTEGER,
        primaryKey: true,
        validate: {
            min: 0,
            max: 7, // just guessing how many categories we want
        }
    },
    category: {
        type: ENUM,
        values: [
            'skis', // 0
            'boots', // 1
            'pants', // 2
            'jackets', // 3
            'shirts', // 4
            'poles', // 5
            'gloves', // 6
            'socks' // 7
        ],
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});

module.exports = Category;
