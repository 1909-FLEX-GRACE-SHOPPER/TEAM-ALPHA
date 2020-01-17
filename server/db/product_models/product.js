const Sequelize = require('sequelize');
const db = require('../database');

const { STRING, INTEGER, TEXT, DECIMAL, UUID, UUIDV4 } = Sequelize;

const Products = db.define('products', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    quantity: {
        type: INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 0,
        },
    },
    price: {
        type: DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 0.00,
        },
    },
    description: {
        type: TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    imageUrl: {
        type: TEXT,
        defaultValue: 'to come',
        //NOTE: commented this out temp just to test seed templates. This forces us to insert URLS.
        // validate: {
        //     isUrl: true,
        // },
    },
});

module.exports = Products;
