const Sequelize = require('sequelize');
const db = require('../database');

const { UUID, UUIDV4, INTEGER, DECIMAL } = Sequelize;

const OrderItems = db.define('orderItems', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  //NOTE: Added quantity in this model so we can keep track in the database when pulling up past orders in the UI. Added unitPrice into model so we can keep track of price in case we do a promo code that will change the unitPrice. This may be good if we want to display all the individual items in the order when selecting order history. This would also be how we access the different prices / quantity of items in an order vs the Products info from the 'include' Products model relationship which displayed the product's info rather the carts. http://localhost:3000/api/orders/<insertorderId>
  unitPrice: {
    type: DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0.0
    }
  },
  orderId: {
    type: UUID,
    allowNull: false
  },
  productId: {
    type: UUID,
    allowNull: false
  }
});

module.exports = OrderItems;
