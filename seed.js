const { green, red } = require('chalk')
const {
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
} = require('./server/db/index')

/*
NOTE: Decided to do a bulkCreate instead of doing individual creations like...

// const await prodColorTomato = Colors.create({
//   id: 4,
//   color: 'tomato',
// })

because this would result with over 30 individual 'await's which is over the suggested limit for async awaits. (got the warning from the linter)
*/

const statuses = [{id: 1, status: 'open'}, {id: 2, status: 'ordered'}, {id: 3, status: 'shipped'}, {id: 4, status: 'delivered'}]

const categoriesList = [
  {id: 1, category: 'skis'},
  {id: 2, category: 'boots'},
  {id: 3, category: 'pants'},
  {id: 4, category: 'jackets'},
  {id: 5, category: 'shirts'},
  {id: 6, category: 'poles'},
  {id: 7, category: 'gloves'},
  {id: 8, category: 'goggles'},
]

const colorsList = [
  {id: 1, color: 'blue'},
  {id: 2, color: 'green'},
  {id: 3, color: 'yellow'},
  {id: 4, color: 'tomato'},
  {id: 5, color: 'red'},
  {id: 6, color: 'dodgerBlue'},
  {id: 7, color: 'white'},
  {id: 8, color: 'black'},
  {id: 9, color: 'gray'},
]

const gendersList = [{id: 1, gender: 'F'}, {id: 2, gender: 'M'}, {id: 3, gender: 'N'}]

const sizesList = [
  {id: 1, size: 'XS'},
  {id: 2, size: 'S'},
  {id: 3, size: 'M'},
  {id: 4, size: 'L'},
  {id: 5, size: 'XL'},
  {id: 6, size: 'XXL'},
]

const userTypesList = [
  {id: 1, userTypes: 'admin'},
  {id: 2, userTypes: 'pending'},
  {id: 3, userTypes: 'regular'},
  {id: 4, userTypes: 'guest'},
  {id: 5, userTypes: 'oAuth'},
]

const seed = async () => {
  try {
    await db.sync({ force: true })
    await OrderStatuses.bulkCreate(statuses)
    await Categories.bulkCreate(categoriesList)
    await Colors.bulkCreate(colorsList)
    await Genders.bulkCreate(gendersList)
    await Sizes.bulkCreate(sizesList)
    await UserTypes.bulkCreate(userTypesList)

    const productTemplate = await Products.create({
      name: 'Test',
      quantity: 1,
      price: 1.00,
      description: 'blah blah blah',
      categoryId: 1,
      sizeId: 1,
      genderId: 1,
      colorId: 1,
    })

    const orderTemplate = await Orders.create({
      totalCost: 1.00,
      orderDate: Date(),
      price: 1.00,
      description: 'blah blah blah',
      orderStatusId: 1,
      //userId: This one would be tricky since we need to get the UUID and not a stander integer. This will also apply to any table that needs to seed a FK that is a UUID
    })

    //this will seed with the defaultvalues
    const userTemplate = await Users.create({
      firstName: 'blah',
      lastName: 'blah',
      billingAddress: 'blah',
      shippingAddress: 'blah',
      email: 'blah@gmail.com',
      password: 'blah',
      userTypeId: 1
    })

  }
  catch (err) {
   console.log(red(err))
  }
}


module.exports = seed
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
