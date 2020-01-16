const db = require('./database');
const {
    Product,
    Category,
    Size,
    Gender,
    Color,
} = require('./product_models/index');

const {
    Order,
    OrderStatus,
} = require('./order_models/index');

const {
    User,
    UserType,
} = require('./user_models/index');

////////////////////////
// ORDER ASSOCIATIONS //
////////////////////////

// an order can only have one status
Order.hasOne(OrderStatus);
OrderStatus.belongsToMany(Order);

//////////////////////////
// PRODUCT ASSOCIATIONS //
//////////////////////////

// each product has only one category
Product.hasOne(Category);
Category.belongsToMany(Product);

// each product has only one size
Product.hasOne(Size);
Size.belongsToMany(Product);

// each product is either F, M, or N;
Product.hasOne(Gender);
Gender.belongsToMany(Product);

// each product has a color
Product.hasOne(Color);
Color.belongsToMany(Product);

///////////////////////
// USER ASSOCIATIONS //
///////////////////////

// each user has a single type
User.hasOne(UserType, {
    foreignKey: {
        allowNull: false,
        defaultValue: 3, // defaults to guest
    },
    onDelete: 'CASCADE'
});
UserType.belongsToMany(User);

///////////////////////////////////////////////
// ASSOCIATIONS BETWEEN DIFFERENT CATEGORIES //
///////////////////////////////////////////////

// user and order associations
User.hasMany(Order);
Order.belongsTo(User);

// creating orderItems
Product.belongsToMany(Order, {through: 'OrderItems'});
Order.belongsToMany(Product, {through: 'OrderItems'});

module.exports = {
    db,
    Product,
    Category,
    Size,
    Gender,
    Color,
    Order,
    OrderStatus,
    User,
    UserType,
};
