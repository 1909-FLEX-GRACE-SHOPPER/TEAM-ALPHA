const { expect } = require('chai');
const { db, Products, Users } = require('../server/db/index');

describe('Sequelize model', () => {
  before(() => db.sync({ force: true }));
  afterEach(() => db.sync({ force: true }));

  it('firstName, lastName, email ,password cannot be empty', async () => {
    const user = Users.build({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });
    try {
      await user.validate();
      throw Error(
        'validation should have failed with empty name , email and password'
      );
    } catch (err) {
      expect(err.message).to.contain('Validation notEmpty on firstName');
      expect(err.message).to.contain('Validation notEmpty on lastName');
      expect(err.message).to.contain('Validation notEmpty on email');
      expect(err.message).to.contain('Validation notEmpty on password');
    }
  });
});
