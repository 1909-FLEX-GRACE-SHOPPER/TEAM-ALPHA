const db = require('./database');
const {
  Products,
  Categories,
  Sizes,
  ShoeSizes,
  Genders,
  Colors,
  ProductListings
} = require('./product_models/index');

const { Orders, OrderStatuses, OrderItems } = require('./order_models/index');

const { Users, UserTypes } = require('./user_models/index');

////////////////////////
// ORDER ASSOCIATIONS //
////////////////////////

// an order can only have one status
OrderStatuses.hasMany(Orders);
Orders.belongsTo(OrderStatuses);

//////////////////////////
// PRODUCT ASSOCIATIONS //
//////////////////////////

// each product has only one category
Categories.hasMany(Products);
Products.belongsTo(Categories);
// each product has only one size
Sizes.hasMany(Products);
Products.belongsTo(Sizes);

ShoeSizes.hasMany(Products);

// each product is either F, M, or N;
Genders.hasMany(Products);
Products.belongsTo(Genders);

// each product has a color
Colors.hasMany(Products);
Products.belongsTo(Colors);

// each product has a productListing which is just 1 specific product
ProductListings.hasMany(Products);
Products.belongsTo(ProductListings);

///////////////////////
// USER ASSOCIATIONS //
///////////////////////

// each user has a single type
UserTypes.hasMany(Users, {
  foreignKey: {
    allowNull: false,
    defaultValue: 3 // defaults to guest
  },
  onDelete: 'CASCADE'
});

///////////////////////////////////////////////
// ASSOCIATIONS BETWEEN DIFFERENT CATEGORIES //
///////////////////////////////////////////////

// user and order associations
Users.hasMany(Orders);

// creating orderItems
Products.belongsToMany(Orders, { through: OrderItems });
Orders.belongsToMany(Products, { through: OrderItems });

module.exports = {
  db,
  Products,
  Categories,
  Sizes,
  ShoeSizes,
  Genders,
  Colors,
  Orders,
  OrderStatuses,
  OrderItems,
  Users,
  UserTypes,
  ProductListings
};
