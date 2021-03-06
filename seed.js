const { green, red } = require('chalk');
const {
  db,
  Products,
  Categories,
  Colors,
  Orders,
  OrderItems,
  Users,
  ProductListings
} = require('./server/db/index');
const faker = require('faker');
/*
NOTE: Decided to do a bulkCreate instead of doing individual creations like...

// const await prodColorTomato = Colors.create({
//   id: 4,
//   color: 'tomato',
// })

because this would result with over 30 individual 'await's which is over the suggested limit for async awaits. (got the warning from the linter)
*/

const categoriesList = [
  { id: 1, category: 'skis' },
  { id: 2, category: 'boots' },
  { id: 3, category: 'pants' },
  { id: 4, category: 'jackets' },
  { id: 5, category: 'shirts' },
  { id: 6, category: 'poles' },
  { id: 7, category: 'gloves' },
  { id: 8, category: 'goggles' }
];

const colorsList = [
  { id: 1, color: 'blue' },
  { id: 2, color: 'green' },
  { id: 3, color: 'yellow' },
  { id: 4, color: 'tomato' },
  { id: 5, color: 'red' },
  { id: 6, color: 'dodgerBlue' },
  { id: 7, color: 'white' },
  { id: 8, color: 'black' },
  { id: 9, color: 'gray' }
];

const productListingsList = [
  {
    id: 1,
    name: 'Ski-500X ',
    description: `${faker.lorem.sentences()}`,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQtc_LQx5SsX3ieNr-gw_JerO081Q_k_h-JGdJXWEDrlO4Q5hUE'
  },
  {
    id: 2,
    name: 'Ski-500X ',
    description: `a great product - ${Math.random()}`,
    imageUrl:
      'https://summitsports.scene7.com/is/image/SummitSports/481165_481165_1?$256$'
  },
  {
    id: 3,
    name: 'Ski-500X ',
    description: `a great product - ${Math.random()}`,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQIPxZsLPtrpOxItTNikfx9A5BmDzrOLg6wA6nCmhwDsBb5efYw'
  },
  {
    id: 4,
    name: 'Ski Boots',
    description: `${faker.lorem.sentences()}`,
    imageUrl:
      'https://summitsports.scene7.com/is/image/SummitSports/519656_519656_1?$256$'
  },

  {
    id: 5,
    name: 'Ski Pants',
    description: `${faker.lorem.sentences()}`,
    imageUrl:
      'https://summitsports.scene7.com/is/image/SummitSports/533935_533941_1?$256$'
  },
  {
    id: 6,
    name: 'Ski Jacket',
    description: `${faker.lorem.sentences()}`,
    imageUrl:
      'https://summitsports.scene7.com/is/image/SummitSports/590537_590542_1?$256$'
  },
  {
    id: 7,
    name: 'Ski Shirt',
    description: `${faker.lorem.sentences()}`,
    imageUrl:
      'https://summitsports.scene7.com/is/image/SummitSports/555576_555576_1?$256$'
  },
  {
    id: 8,
    name: 'Ski Poles',
    description: `${faker.lorem.sentences()}`,
    imageUrl:
      'https://summitsports.scene7.com/is/image/SummitSports/565025_565025_1?$256$'
  },
  {
    id: 9,
    name: 'Ski Gloves',
    description: `${faker.lorem.sentences()}`,
    imageUrl: 'https://s7d2.scene7.com/is/image/SS/250169_ULG_1?$256$'
  },
  {
    id: 10,
    name: 'Ski Goggles',
    description: `${faker.lorem.sentences()}`,
    imageUrl:
      'https://summitsports.scene7.com/is/image/SummitSports/547688_547689_1?$256$'
  }
];

const usersList = [
  {
    firstName: 'Elham',
    lastName: 'Amini',
    billingAddress1: '5 Hanover Square',
    billingAddress2: 'unit 25',
    billingCity: 'New York',
    billingState: 'NY',
    billingZip: '10004',
    shippingAddress1: '5 Hanover Square',
    shippingAddress2: 'unit 25',
    shippingCity: 'New York',
    shippingState: 'NY',
    shippingZip: '10004',
    email: 'elhamfarvid@gmail.com',
    password: 'abcde',
    userType: 'admin'
  },
  {
    firstName: 'Johnson',
    lastName: 'Lin',
    billingAddress1: '5 Hanover Square',
    billingAddress2: 'unit 25',
    billingCity: 'New York',
    billingState: 'NY',
    billingZip: '10004',
    shippingAddress1: '5 Hanover Square',
    shippingAddress2: 'unit 25',
    shippingCity: 'New York',
    shippingState: 'NY',
    shippingZip: '10004',
    email: 'johnsonlin1993@gmail.com',
    password: 'abcde',
    userType: 'admin'
  },
  {
    firstName: 'Svetlana',
    lastName: 'Rovinsky',
    billingAddress1: '5 Hanover Square',
    billingAddress2: 'unit 25',
    billingCity: 'New York',
    billingState: 'NY',
    billingZip: '10004',
    shippingAddress1: '5 Hanover Square',
    shippingAddress2: 'unit 25',
    shippingCity: 'New York',
    shippingState: 'NY',
    shippingZip: '10004',
    email: 'svetlana.rovinsky@gmail.com',
    password: 'abcde',
    userType: 'admin'
  },
  {
    firstName: 'Jake',
    lastName: 'Hertz',
    billingAddress1: '5 Hanover Square',
    billingAddress2: 'unit 25',
    billingCity: 'New York',
    billingState: 'NY',
    billingZip: '10004',
    shippingAddress1: '5 Hanover Square',
    shippingAddress2: 'unit 25',
    shippingCity: 'New York',
    shippingState: 'NY',
    shippingZip: '10004',
    email: 'hertzjake@gmail.com',
    password: 'abcde',
    userType: 'admin'
  },
  {
    firstName: 'Mark',
    lastName: 'Bae',
    billingAddress1: '5 Hanover Square',
    billingAddress2: 'unit 25',
    billingCity: 'New York',
    billingState: 'NY',
    billingZip: '10004',
    shippingAddress1: '5 Hanover Square',
    shippingAddress2: 'unit 25',
    shippingCity: 'New York',
    shippingState: 'NY',
    shippingZip: '10004',
    email: 'mark@fullstackacademy.com',
    password: 'abcde',
    userType: 'pending'
  },
  {
    firstName: 'Eliot',
    lastName: 'Szwajkowski',
    billingAddress1: '5 Hanover Square',
    billingAddress2: 'unit 25',
    billingCity: 'New York',
    billingState: 'NY',
    billingZip: '10004',
    shippingAddress1: '5 Hanover Square',
    shippingAddress2: 'unit 25',
    shippingCity: 'New York',
    shippingState: 'NY',
    shippingZip: '10004',
    email: 'eliot@fullstackacdemy.com',
    password: 'abcde',
    userType: 'regular'
  },
  {
    firstName: 'Russell',
    lastName: 'Moore',
    billingAddress1: '5 Hanover Square',
    billingAddress2: 'unit 25',
    billingCity: 'New York',
    billingState: 'NY',
    billingZip: '10004',
    shippingAddress1: '5 Hanover Square',
    shippingAddress2: 'unit 25',
    shippingCity: 'New York',
    shippingState: 'NY',
    shippingZip: '10004',
    email: 'russell@fullstackacdemy.com',
    password: 'abcde',
    userType: 'oAuth'
  },
  {
    firstName: 'Ryan',
    lastName: 'Jasinski',
    billingAddress1: '5 Hanover Square',
    billingAddress2: 'unit 25',
    billingCity: 'New York',
    billingState: 'NY',
    billingZip: '10004',
    shippingAddress1: '5 Hanover Square',
    shippingAddress2: 'unit 25',
    shippingCity: 'New York',
    shippingState: 'NY',
    shippingZip: '10004',
    email: 'ryan@fullstackacdemy.com',
    password: 'abcde',
    userType: 'pending'
  }
  //Commenting this out as this conflicts with the backend validations. Ideally we should be adding the guest account once the guest checksout.
  // {
  //   userType: 'guest'
  // }
];

const productsList = [
  {
    quantity: Math.floor(10 * Math.random()),
    price: 999.0,
    categoryId: 1,
    gender: 'N',
    colorId: 1,
    productListingId: 1
  },
  {
    quantity: Math.floor(10 * Math.random()),
    price: 800.0,
    categoryId: 1,
    gender: 'N',
    colorId: 2,
    productListingId: 2
  },
  {
    quantity: Math.floor(10 * Math.random()),
    price: 650.0,
    categoryId: 1,
    gender: 'N',
    colorId: 3,
    productListingId: 3
  },
  {
    quantity: Math.floor(10 * Math.random()),
    price: 899.0,
    categoryId: 2,
    gender: 'M',
    colorId: 2,
    productListingId: 4
  },
  {
    quantity: Math.floor(10 * Math.random()),
    price: 599.0,
    categoryId: 3,
    sizeId: 4,
    gender: 'F',
    colorId: 3,
    productListingId: 5
  },
  {
    quantity: Math.floor(10 * Math.random()),
    price: 799.0,
    categoryId: 4,
    size: 'XS',
    gender: 'F',
    colorId: 4,
    productListingId: 6
  },
  {
    quantity: Math.floor(10 * Math.random()),
    price: 65.0,
    categoryId: 5,
    size: 'S',
    gender: 'F',
    colorId: 5,
    productListingId: 7
  },
  {
    quantity: Math.floor(10 * Math.random()),
    price: 99.0,
    categoryId: 6,
    gender: 'M',
    colorId: 7,
    productListingId: 8
  },
  {
    quantity: Math.floor(10 * Math.random()),
    price: 35.0,
    categoryId: 7,
    size: 'XS',
    gender: 'F',
    colorId: 9,
    productListingId: 9
  },
  {
    quantity: Math.floor(10 * Math.random()),
    price: 155.0,
    categoryId: 8,
    gender: 'M',
    colorId: 8,
    productListingId: 10
  }
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    // reference tables
    await Categories.bulkCreate(categoriesList);
    await Colors.bulkCreate(colorsList);
    await ProductListings.bulkCreate(productListingsList);

    // users and products
    await Users.bulkCreate(usersList);
    await Products.bulkCreate(productsList);

    // the below is just for testing purposes,
    // since in reality every created order will automatically be associated with a user
    // get userIds
    const users = await Users.findAll();
    const userIds = users.map(user => user.id);
    // now create the ordersList

    const ordersList = [
      {
        totalCost: 15.0,
        orderDate: Date(),
        status: 'open',
        userId: userIds[Math.floor(Math.random() * userIds.length)]
      },
      {
        totalCost: 14.27,
        orderDate: Date(),
        status: 'ordered',
        userId: userIds[Math.floor(Math.random() * userIds.length)]
      },
      {
        totalCost: 18.91,
        orderDate: Date(),
        status: 'shipped',
        userId: userIds[Math.floor(Math.random() * userIds.length)]
      },
      {
        totalCost: 201.0,
        orderDate: Date(),
        status: 'delivered',
        userId: userIds[Math.floor(Math.random() * userIds.length)]
      }
    ];

    await Orders.bulkCreate(ordersList);
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// if (require.main === module) {
//   seed()
//     .then(() => {
//       console.log(green('Seeding success!'));
//       db.close();
//     })
//     .catch(err => {
//       console.error(red('Oh noes! Something went wrong!'));
//       console.error(err);
//       db.close();
//     });
// }
