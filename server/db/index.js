const db = require('./database');
const {
  Products,
  Categories,
  Colors,
  ProductListings
} = require('./product_models/index');

const { Orders, OrderItems } = require('./order_models/index');

const { Users } = require('./user_models/index');

//////////////////////////
// PRODUCT ASSOCIATIONS //
//////////////////////////

//THESE ASSOCIATIONS WORK EVEN THOUGH IT SOUNDS STRANGE. WE COULD EVEN COMMENT OUT THE HASMANY ASSOCIATIONS
// each product has only one category
Categories.hasMany(Products);
Products.belongsTo(Categories);

// each product has a color
Colors.hasMany(Products);
Products.belongsTo(Colors);

// each product has a productListing which is just 1 specific product
ProductListings.hasMany(Products);
Products.belongsTo(ProductListings);

///////////////////////
// USER ASSOCIATIONS //
///////////////////////

//LEAVING THIS HERE IN CASE WE NEED TO ADD ASSOCATION

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
  Colors,
  Orders,
  OrderItems,
  Users,
  ProductListings
};
