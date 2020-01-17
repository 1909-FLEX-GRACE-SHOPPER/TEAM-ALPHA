const db = require('./database');
const {
    Products,
    Categories,
    Sizes,
    Genders,
    Colors,
} = require('./product_models/index');

const {
    Orders,
    OrderStatuses,
} = require('./order_models/index');

const {
    Users,
    UserTypes,
} = require('./user_models/index');

////////////////////////
// ORDER ASSOCIATIONS //
////////////////////////

// an order can only have one status
OrderStatuses.hasMany(Orders);

//////////////////////////
// PRODUCT ASSOCIATIONS //
//////////////////////////

// each product has only one category
Categories.hasMany(Products);

// each product has only one size
Sizes.hasMany(Products);

// each product is either F, M, or N;
Genders.hasMany(Products);

// each product has a color
Colors.hasMany(Products);

///////////////////////
// USER ASSOCIATIONS //
///////////////////////

// each user has a single type
UserTypes.hasMany(Users, {
    foreignKey: {
        allowNull: false,
        defaultValue: 3, // defaults to guest
    },
    onDelete: 'CASCADE',
});

///////////////////////////////////////////////
// ASSOCIATIONS BETWEEN DIFFERENT CATEGORIES //
///////////////////////////////////////////////

// user and order associations
Users.hasMany(Orders);

// creating orderItems
Products.belongsToMany(Orders, {through: 'orderItems'});
Orders.belongsToMany(Products, {through: 'orderItems'});

module.exports = {
    db,
    Products,
    Categories,
    Sizes,
    Genders,
    Colors,
    Orders,
    OrderStatuses,
    Users,
    UserTypes,
};
