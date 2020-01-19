const { green, red } = require('chalk');
const {
  db,
  Products,
  Categories,
  Sizes,
  ShoeSizes,
  Genders,
  Colors,
  Orders,
  OrderStatuses,
  Users,
  UserTypes
} = require('./server/db/index');

/*
NOTE: Decided to do a bulkCreate instead of doing individual creations like...

// const await prodColorTomato = Colors.create({
//   id: 4,
//   color: 'tomato',
// })

because this would result with over 30 individual 'await's which is over the suggested limit for async awaits. (got the warning from the linter)
*/

const statuses = [
  { id: 1, status: 'open' },
  { id: 2, status: 'ordered' },
  { id: 3, status: 'shipped' },
  { id: 4, status: 'delivered' }
];

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

const gendersList = [
  { id: 1, gender: 'F' },
  { id: 2, gender: 'M' },
  { id: 3, gender: 'N' }
];

const sizesList = [
  { id: 1, size: 'XS' },
  { id: 2, size: 'S' },
  { id: 3, size: 'M' },
  { id: 4, size: 'L' },
  { id: 5, size: 'XL' },
  { id: 6, size: 'XXL' }
];

const shoeSizesList = [
  { id: 1, size: '6' },
  { id: 2, size: '6.5' },
  { id: 3, size: '7' },
  { id: 4, size: '7.5' },
  { id: 5, size: '8' },
  { id: 6, size: '8.5' },
  { id: 7, size: '9' },
  { id: 8, size: '9.5' },
  { id: 9, size: '10' },
  { id: 10, size: '10.5' },
  { id: 11, size: '11' },
  { id: 12, size: '11.5' },
  { id: 13, size: '12' }
];

const userTypesList = [
  { id: 1, userTypes: 'admin' },
  { id: 2, userTypes: 'pending' },
  { id: 3, userTypes: 'regular' },
  { id: 4, userTypes: 'guest' },
  { id: 5, userTypes: 'oAuth' }
];

const usersList = [
  {
    firstName: 'Elham',
    lastName: 'Amini',
    billingAddress: '5 Hanover Square, New York, NY 10004',
    shippingAddress: '5 Hanover Square, New York, NY 10004',
    email: 'elhamfarvid@gmail.com',
    password: 'abcde',
    userTypeId: 1
  },
  {
    firstName: 'Johnson',
    lastName: 'Lin',
    billingAddress: '5 Hanover Square, New York, NY 10004',
    shippingAddress: '5 Hanover Square, New York, NY 10004',
    email: 'johnsonlin1993@gmail.com',
    password: 'abcde',
    userTypeId: 1
  },
  {
    firstName: 'Svetlana',
    lastName: 'Rovinsky',
    billingAddress: '5 Hanover Square, New York, NY 10004',
    shippingAddress: '5 Hanover Square, New York, NY 10004',
    email: 'svetlana.rovinsky@gmail.com',
    password: 'abcde',
    userTypeId: 1
  },
  {
    firstName: 'Jake',
    lastName: 'Hertz',
    billingAddress: '5 Hanover Square, New York, NY 10004',
    shippingAddress: '5 Hanover Square, New York, NY 10004',
    email: 'hertzjake@gmail.com',
    password: 'abcde',
    userTypeId: 1
  },
  {
    firstName: 'Mark',
    lastName: 'Bae',
    billingAddress: '5 Hanover Square, New York, NY 10004',
    shippingAddress: '5 Hanover Square, New York, NY 10004',
    email: 'mark@fullstackacademy.com',
    password: 'abcde',
    userTypeId: 2
  },
  {
    firstName: 'Eliot',
    lastName: 'Szwajkowski',
    billingAddress: '5 Hanover Square, New York, NY 10004',
    shippingAddress: '5 Hanover Square, New York, NY 10004',
    email: 'eliot@fullstackacdemy.com',
    password: 'abcde',
    userTypeId: 3
  },
  {
    firstName: 'Russell',
    lastName: 'Moore',
    billingAddress: '5 Hanover Square, New York, NY 10004',
    shippingAddress: '5 Hanover Square, New York, NY 10004',
    email: 'russell@fullstackacdemy.com',
    password: 'abcde',
    userTypeId: 5
  },
  {
    firstName: 'Ryan',
    lastName: 'Jasinski',
    billingAddress: '5 Hanover Square, New York, NY 10004',
    shippingAddress: '5 Hanover Square, New York, NY 10004',
    email: 'ryan@fullstackacdemy.com',
    password: 'abcde',
    userTypeId: 2
  },
  {
    userTypeId: 4
  }
];

const productsList = [
  {
    name: 'Skis',
    quantity: Math.floor(10 * Math.random()),
    price: 1.0,
    description: `a great product - ${Math.random()}`,
    imageUrl:
      'https://summitsports.scene7.com/is/image/SummitSports/574445_574445_1?$256$',
    categoryId: 1,
    sizeId: 5,
    genderId: 1,
    colorId: 1
  },
  {
    name: 'Ski Boots',
    quantity: Math.floor(10 * Math.random()),
    price: 1.0,
    description: `a great product - ${Math.random()}`,
    imageUrl:
      'https://summitsports.scene7.com/is/image/SummitSports/519656_519656_1?$256$',
    categoryId: 2,
    sizeId: 3,
    genderId: 2,
    colorId: 2
  },
  {
    name: 'Ski Pants',
    quantity: Math.floor(10 * Math.random()),
    price: 1.0,
    description: `a great product - ${Math.random()}`,
    imageUrl:
      'https://summitsports.scene7.com/is/image/SummitSports/533935_533941_1?$256$',
    categoryId: 3,
    sizeId: 4,
    genderId: 1,
    colorId: 3
  },
  {
    name: 'Ski Jacket',
    quantity: Math.floor(10 * Math.random()),
    price: 1.0,
    description: `a great product - ${Math.random()}`,
    imageUrl:
      'https://summitsports.scene7.com/is/image/SummitSports/590537_590542_1?$256$',
    categoryId: 4,
    sizeId: 1,
    genderId: 3,
    colorId: 4
  },
  {
    name: 'Ski Shirt',
    quantity: Math.floor(10 * Math.random()),
    price: 1.0,
    description: `a great product - ${Math.random()}`,
    imageUrl:
      'https://summitsports.scene7.com/is/image/SummitSports/555576_555576_1?$256$',
    categoryId: 5,
    sizeId: 2,
    genderId: 1,
    colorId: 5
  },
  {
    name: 'Ski Poles',
    quantity: Math.floor(10 * Math.random()),
    price: 1.0,
    description: `a great product - ${Math.random()}`,
    imageUrl: '',
    categoryId: 6,
    sizeId: 6,
    genderId: 3,
    colorId: 7
  },
  {
    name: 'Ski Gloves',
    quantity: Math.floor(10 * Math.random()),
    price: 1.0,
    description: `a great product - ${Math.random()}`,
    imageUrl:
      'https://summitsports.scene7.com/is/image/SummitSports/565025_565025_1?$256$',
    categoryId: 7,
    sizeId: 1,
    genderId: 3,
    colorId: 9
  },
  {
    name: 'Ski Goggles',
    quantity: Math.floor(10 * Math.random()),
    price: 1.0,
    description: `a great product - ${Math.random()}`,
    imageUrl:
      'https://summitsports.scene7.com/is/image/SummitSports/547688_547689_1?$256$',
    categoryId: 8,
    sizeId: 5,
    genderId: 3,
    colorId: 8
  }
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    // reference tables
    await OrderStatuses.bulkCreate(statuses);
    await Categories.bulkCreate(categoriesList);
    await Colors.bulkCreate(colorsList);
    await Genders.bulkCreate(gendersList);
    await Sizes.bulkCreate(sizesList);
    await ShoeSizes.bulkCreate(shoeSizesList);
    await UserTypes.bulkCreate(userTypesList);

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
        orderStatusId: 1,
        userId: userIds[Math.floor(Math.random() * userIds.length)]
      },
      {
        totalCost: 14.27,
        orderDate: Date(),
        orderStatusId: 2,
        userId: userIds[Math.floor(Math.random() * userIds.length)]
      },
      {
        totalCost: 18.91,
        orderDate: Date(),
        orderStatusId: 3,
        userId: userIds[Math.floor(Math.random() * userIds.length)]
      },
      {
        totalCost: 201.0,
        orderDate: Date(),
        orderStatusId: 4,
        userId: userIds[Math.floor(Math.random() * userIds.length)]
      }
    ];

    await Orders.bulkCreate(ordersList);

    // leaving the templates in case
    // const orderTemplate = await Orders.create({
    //   totalCost: 1.00,
    //   orderDate: Date(),
    //   price: 1.00,
    //   description: 'blah blah blah',
    //   orderStatusId: 1,
    //   //userId: This one would be tricky since we need to get the UUID and not a stander integer. This will also apply to any table that needs to seed a FK that is a UUID
    // });

    //this will seed with the defaultvalues
    // const userTemplate = await Users.create({
    //   firstName: 'blah',
    //   lastName: 'blah',
    //   billingAddress: 'blah',
    //   shippingAddress: 'blah',
    //   email: 'blah@gmail.com',
    //   password: 'blah',
    //   userTypeId: 1,
    // });

    // const productTemplate = await Products.create({
    //   name: 'Test',
    //   quantity: 1,
    //   price: 1.00,
    //   description: 'blah blah blah',
    //   categoryId: 1,
    //   sizeId: 1,
    //   genderId: 1,
    //   colorId: 1,
    // });
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
